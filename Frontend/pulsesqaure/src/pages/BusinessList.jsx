import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function BusinessList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/businesses?search=${query}`)
      .then(res => setBusinesses(res.data))
      .catch(err => console.error(err));
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Results for "{query}"</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map(biz => (
          <div key={biz._id} className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transform hover:-translate-y-1 transition">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">Img</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{biz.name}</h3>
                <p className="text-sm text-slate-500 uppercase">{biz.category}</p>
                <p className="text-sm text-slate-600 mt-2">📍 {biz.location}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-yellow-500 font-bold">★ {biz.avgRating || '—'}</span>
              <span className="text-slate-600 font-medium">{biz.priceRange || ''}</span>
            </div>
            <Link to={`/business/${biz._id}`} className="block mt-4 text-center bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}