import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function BusinessList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError('');

    axios.get(`https://pulsesquare-brk7.onrender.com/api/businesses?search=${query}`)
      .then(res => setBusinesses(res.data))
      .catch(err => {
        console.error(err);
        setError('Could not load businesses. Please try again.');
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {query ? `Results for “${query}”` : 'Browse businesses'}
        </h2>
        <p className="text-slate-600">
          {query ? 'Explore matches and open a listing for details.' : 'Search from the home page to filter results.'}
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-600">
          Loading businesses…
        </div>
      )}

      {!isLoading && !error && businesses.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-slate-600">
          No businesses found.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map(biz => (
          <div key={biz._id} className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-sm font-medium">
                Img
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-900 truncate">{biz.name}</h3>
                <p className="text-xs text-indigo-700 font-semibold uppercase tracking-wide">{biz.category}</p>
                <p className="text-sm text-slate-600 mt-2">📍 {biz.location}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-yellow-600 font-semibold">★ {biz.avgRating || '—'}</span>
              <span className="text-emerald-700 font-semibold">{biz.priceRange || ''}</span>
            </div>
            <Link
              to={`/business/${biz._id}`}
              className="block mt-4 text-center bg-indigo-50 text-indigo-700 py-2 rounded-xl hover:bg-indigo-100 transition font-semibold"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}