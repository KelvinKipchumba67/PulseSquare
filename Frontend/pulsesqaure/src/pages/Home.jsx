import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Star } from 'lucide-react'; 
import axios from 'axios';

const API_BASE_URL = 'https://pulsesquare-1.onrender.com/api/businesses/featured';

// Helper component for displaying a single featured business card
const BusinessCard = ({ biz }) => (
  <Link 
    to={`/business/${biz._id}`} 
    className="block p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-200 border border-slate-200/70"
  >
    <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{biz.name}</h3>
    <p className="text-xs sm:text-sm text-indigo-700 font-semibold mb-2 uppercase tracking-wide">{biz.category}</p>
    
    <div className="flex items-center gap-2 mb-2">
      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
      <span className="text-lg font-semibold text-gray-900">
        {biz.avgRating || 'N/A'} 
      </span>
      <span className="text-sm text-gray-500">
        ({biz.reviewCount || 0} reviews)
      </span>
    </div>
    
    <p className="text-slate-600 text-sm">{biz.location}</p>
    <p className="text-emerald-700 font-semibold mt-1">{biz.priceRange}</p>
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
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-6rem)] text-center py-10 sm:py-14">
      
      {/* 🌟 Hero Section */}
      <div className="w-full max-w-4xl mb-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-slate-900 leading-tight">
          Discover the <span className="text-indigo-700">Best Local Services</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Trusted reviews and verified listings in your neighborhood.
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-3xl flex flex-col sm:flex-row shadow-sm hover:shadow-md transition rounded-2xl sm:rounded-full bg-white border border-slate-200/70 mb-14 overflow-hidden"
      >
        <input 
          type="text" 
          placeholder="e.g. 'best barber near me', 'Italian restaurant', 'yoga studio'" 
          className="flex-1 px-5 py-4 text-base sm:text-lg border-0 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-indigo-700 text-white px-6 py-4 flex items-center justify-center text-base sm:text-lg font-semibold hover:bg-indigo-800 transition"
          aria-label="Search"
        >
          <Search className="w-6 h-6 mr-2" /> 
          Search
        </button>
      </form>
      
      {/* 🏆 Featured Listings Section */}
      {featured.length > 0 && (
        <div className="w-full max-w-5xl text-left mt-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
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
        <p className="text-slate-500 mt-12">
          Add some businesses and reviews to see the top-rated featured listings here
        </p>
      )}

    </div>
  );
}