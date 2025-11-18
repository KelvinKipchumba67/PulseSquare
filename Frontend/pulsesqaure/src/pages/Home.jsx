import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Star } from 'lucide-react'; 
import axios from 'axios';

const API_BASE_URL = 'https://pulsesquare-1.onrender.com/api/businesses/featured';

// Helper component for displaying a single featured business card
const BusinessCard = ({ biz }) => (
  <Link 
    to={`/business/${biz._id}`} 
    className="block p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100"
  >
    <h3 className="text-xl font-bold text-gray-800 truncate">{biz.name}</h3>
    <p className="text-sm text-blue-600 font-medium mb-2 uppercase">{biz.category}</p>
    
    <div className="flex items-center space-x-2 mb-2">
      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
      <span className="text-lg font-semibold text-gray-900">
        {biz.avgRating || 'N/A'} 
      </span>
      <span className="text-sm text-gray-500">
        ({biz.reviewCount || 0} reviews)
      </span>
    </div>
    
    <p className="text-gray-600 text-sm">{biz.location}</p>
    <p className="text-green-600 font-bold mt-1">{biz.priceRange}</p>
  </Link>
);


export default function Home() {
  const [query, setQuery] = useState('');
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  // Fetch Featured Businesses
  useEffect(() => {
    axios.get(API_BASE_URL)
      .then(res => setFeatured(res.data))
      .catch(err => console.error("Could not fetch featured data:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) { 
      navigate(`/search?q=${query.trim()}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-6rem)] text-center p-6 pt-12">
      
      {/* 🌟 Hero Section */}
      <div className="max-w-3xl mb-10">
        <h1 className="text-6xl font-extrabold mb-4 text-gray-900 leading-tight">
          Discover the <span className="text-blue-600">Best Local Services</span>
        </h1>
        <p className="text-xl text-gray-600">
          Trusted reviews and verified listings in your neighborhood.
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-2xl flex shadow-xl rounded-full bg-white transition duration-300 hover:shadow-2xl mb-16">
        <input 
          type="text" 
          placeholder="e.g. 'best barber near me', 'Italian restaurant', 'yoga studio'" 
          className="flex-1 p-5 text-lg border-2 border-r-0 border-gray-200 rounded-l-full focus:outline-none focus:ring-4 focus:ring-blue-100"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-8 py-5 rounded-r-full flex items-center justify-center text-lg font-semibold hover:bg-blue-700 transition duration-150"
          aria-label="Search"
        >
          <Search className="w-6 h-6 mr-2" /> 
          Search
        </button>
      </form>
      
      {/* 🏆 Featured Listings Section */}
      {featured.length > 0 && (
        <div className="w-full max-w-5xl text-left mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
            Top Rated Local Gems
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map(biz => (
              <BusinessCard key={biz._id} biz={biz} />
            ))}
          </div>
        </div>
      )}

      {featured.length === 0 && (
        <p className="text-gray-500 mt-12">
          Add some businesses and reviews to see the top-rated featured listings here!
        </p>
      )}

    </div>
  );
}