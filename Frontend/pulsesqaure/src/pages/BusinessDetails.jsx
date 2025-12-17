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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const bizRes = await axios.get(`https://pulsesquare-1.onrender.com/api/businesses/${id}`);
      const revRes = await axios.get(`https://pulsesquare-1.onrender.com/api/businesses/${id}/reviews`);
      setBusiness(bizRes.data);
      setReviews(revRes.data);
    } catch (e) {
      console.error(e);
      setError('Could not load this business. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-600">
        Loading business…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
        {error}
      </div>
    );
  }

  if (!business) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <section className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{business.name}</h1>
          <p className="text-slate-600">{business.category} • {business.location}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Contact Info</h3>
              <p className="text-slate-600 mt-1">Everything you need before visiting.</p>
            </div>
            <div className="text-right">
              <div className="text-yellow-600 font-extrabold text-2xl">★ {business.avgRating ?? '—'}</div>
              <div className="text-slate-500 text-sm">Average rating</div>
            </div>
          </div>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 border border-slate-200/70 px-4 py-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone / Website</div>
              <div className="text-slate-900 mt-1">📞 {business.contact}</div>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200/70 px-4 py-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Price range</div>
              <div className="text-emerald-700 font-semibold mt-1">💰 {business.priceRange}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-extrabold text-slate-900">Reviews</h3>

        {user ? (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900">Leave a Review</h4>
                <p className="text-sm text-slate-600">Share what went well and what could improve.</p>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700">Rating</label>
                <select
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                >
                  {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Comment</label>
                <textarea
                  className="mt-1 w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 min-h-28"
                  placeholder="Describe your experience..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </div>
            </div>

            <button className="mt-4 bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2.5 rounded-xl font-semibold transition">
              Submit
            </button>
          </form>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-600">
            Please sign in to leave a review.
          </div>
        )}

        <div className="space-y-3">
          {reviews.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-slate-600">
              No reviews yet.
            </div>
          )}

          {reviews.map(rev => (
            <div key={rev._id} className="bg-white rounded-2xl border border-slate-200/70 px-5 py-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 truncate">{rev.username}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{new Date(rev.date).toLocaleDateString()}</div>
                </div>
                <div className="text-yellow-600 font-semibold">{'★'.repeat(rev.rating)}</div>
              </div>
              <p className="text-slate-700 mt-3 whitespace-pre-wrap">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}