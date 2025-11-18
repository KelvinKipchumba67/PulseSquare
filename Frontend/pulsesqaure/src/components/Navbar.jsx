import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-md">
              <span className="font-bold text-lg tracking-wider">PS</span>
            </div>
            <span className="text-xl font-extrabold">Pulse Square</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/search" className="hover:text-white/90 transition">Browse</Link>
            {user ? (
              <>
                <Link to="/add" className="hover:text-white/90 transition">Add Business</Link>
                <button onClick={logout} className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md">Login</Link>
            )}
          </div>

          <div className="md:hidden">
            <Link to="/search" className="text-sm bg-white/10 px-2 py-1 rounded">Browse</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}