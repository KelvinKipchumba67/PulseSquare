require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Business = require('./models/Business');
const Review = require('./models/Reviewmodel');
const User = require('./models/user');

const app = express();
app.use(cors());
app.use(express.json());
const allowedOrigins = ['http://localhost:5173'];
// Database Connection
// Add this temporarily to debug
console.log("--- DEBUGGING CONNECTION ---");
console.log("Looking for MONGO_URI...");
if (!process.env.MONGO_URI) {
    console.log("ERROR: MONGO_URI is undefined or null!");
} else {
    console.log("Success: Found MONGO_URI");
    console.log("Length:", process.env.MONGO_URI.length);
    console.log("First 5 chars:", process.env.MONGO_URI.substring(0, 5));
}
console.log("----------------------------");

// Your existing connection code...
mongoose.connect(process.env.MONGO_URI, ...)



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Middleware for Auth
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

// --- ROUTES ---

// 1. Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username, email } });
  } catch (err) { res.status(500).send('Server Error'); }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) { res.status(500).send('Server Error'); }
});

// 2. Business Routes
// GET /api/businesses/featured (Fetches top 3 businesses)
app.get('/api/businesses/featured', async (req, res) => {
  try {
    // Sort by avgRating (descending) and limit to 3
    const featuredBusinesses = await Business.find({})
      .sort({ avgRating: -1, reviewCount: -1 }) // Sort by rating, then review count
      .limit(3);
      
    res.json(featuredBusinesses);
  } catch (err) { 
    console.error("Error fetching featured businesses:", err);
    res.status(500).send('Server Error fetching featured data'); 
  }
});




// GET /api/businesses?search=barber
app.get('/api/businesses', async (req, res) => {
  const { search } = req.query;
  let query = {};
  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ]
    };
  }
  try {
    const businesses = await Business.find(query);
    res.json(businesses);
  } catch (err) { res.status(500).send('Server Error'); }
});

// GET single business
app.get('/api/businesses/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    res.json(business);
  } catch (err) { res.status(404).send('Business not found'); }
});

// POST create business (Protected)
app.post('/api/businesses', auth, async (req, res) => {
  try {
    const newBusiness = new Business(req.body);
    const business = await newBusiness.save();
    res.json(business);
  } catch (err) { res.status(500).send('Server Error'); }
});





// 3. Review Routes
// GET reviews for a business
app.get('/api/businesses/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ businessId: req.params.id }).sort({ date: -1 });
    res.json(reviews);
  } catch (err) { res.status(500).send('Server Error'); }
});

// POST review (Protected & Updates Average)
app.post('/api/businesses/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const newReview = new Review({
      businessId: req.params.id,
      userId: req.user.id,
      username: req.user.username,
      rating,
      comment
    });
    
    await newReview.save();

    // Recalculate Average
    const reviews = await Review.find({ businessId: req.params.id });
    const avg = reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;
    
    await Business.findByIdAndUpdate(req.params.id, {
      avgRating: avg.toFixed(1),
      reviewCount: reviews.length
    });

    res.json(newReview);
  } catch (err) { res.status(500).send('Server Error'); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));