import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-md">
              <span className="font-bold text-lg tracking-wider">PS</span>
            </div>
            <span className="text-xl font-extrabold">Pulse Square</span>
          </Link>

          {/* Desktop links */}
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center p-2 rounded-md bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div id="mobile-menu" className="md:hidden bg-indigo-600/95 border-t border-indigo-700/50">
          <div className="px-4 pt-4 pb-4 space-y-2 text-white">
            <Link to="/search" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-white/10">Browse</Link>
            {user ? (
              <>
                <Link to="/add" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-white/10">Add Business</Link>
                <button onClick={() => { logout(); setOpen(false); }} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-white/10">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}