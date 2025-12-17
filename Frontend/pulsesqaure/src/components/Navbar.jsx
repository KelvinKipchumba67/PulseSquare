import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-white/10 text-white' : 'text-white/85 hover:text-white hover:bg-white/10'
    }`;

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
            <NavLink to="/search" className={navLinkClass}>Browse</NavLink>
            {user ? (
              <>
                <NavLink to="/add" className={navLinkClass}>Add Business</NavLink>
                <button
                  onClick={logout}
                  className="rounded-md bg-white/10 hover:bg-white/20 px-3 py-2 text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-semibold transition ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`
                }
              >
                Login
              </NavLink>
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
        <div id="mobile-menu" className="md:hidden bg-slate-900/95 border-t border-white/10">
          <div className="px-4 pt-4 pb-4 space-y-2 text-white">
            <NavLink to="/search" onClick={() => setOpen(false)} className={navLinkClass}>Browse</NavLink>
            {user ? (
              <>
                <NavLink to="/add" onClick={() => setOpen(false)} className={navLinkClass}>Add Business</NavLink>
                <button
                  onClick={() => { logout(); setOpen(false); }}
                  className="w-full text-left rounded-md px-3 py-2 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" onClick={() => setOpen(false)} className={navLinkClass}>Login</NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}