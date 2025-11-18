import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';

export default function BusinessDetail() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const fetchData = async () => {
    const bizRes = await axios.get(`https://pulsesquare-1.onrender.com/api/businesses/${id}`);
    const revRes = await axios.get(`https://pulsesquare-1.onrender.com/api/businesses/${id}/reviews`);
    setBusiness(bizRes.data);
    setReviews(revRes.data);
  };

  useEffect(() => { fetchData(); }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://pulsesquare-1.onrender.com/api/businesses/${id}/reviews`, newReview, {
        headers: { 'x-auth-token': token }
      });
      setNewReview({ rating: 5, comment: '' });
      fetchData(); // Refresh data
    } catch (err) { alert('Error posting review'); }
  };

  if (!business) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">{business.name}</h1>
        <p className="text-gray-600 mb-4">{business.category} • {business.location}</p>
        <div className="bg-white p-6 rounded shadow mb-4">
          <h3 className="font-bold text-lg border-b pb-2 mb-2">Contact Info</h3>
          <p>📞 {business.contact}</p>
          <p>💰 Price Range: {business.priceRange}</p>
          <p className="mt-2 text-yellow-500 font-bold text-2xl">★ {business.avgRating}</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {user ? (
          <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
            <h4 className="font-bold mb-2">Leave a Review</h4>
            <select 
              className="w-full mb-2 p-2 rounded"
              value={newReview.rating}
              onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
            >
              {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
            </select>
            <textarea 
              className="w-full p-2 rounded mb-2" 
              placeholder="Describe your experience..."
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
          </form>
        ) : (
          <p className="mb-4 text-red-500">Please login to leave a review.</p>
        )}

        <div className="space-y-4">
          {reviews.map(rev => (
            <div key={rev._id} className="border-b pb-2">
              <div className="flex justify-between">
                <span className="font-bold">{rev.username}</span>
                <span className="text-yellow-500">{'★'.repeat(rev.rating)}</span>
              </div>
              <p className="text-gray-700">{rev.comment}</p>
              <p className="text-xs text-gray-400">{new Date(rev.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}