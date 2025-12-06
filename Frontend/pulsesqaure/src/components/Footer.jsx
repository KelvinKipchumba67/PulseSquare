import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-md">
              <span className="font-bold">PS</span>
            </div>
            <div>
              <div className="text-white font-semibold">Pulse Square</div>
              <div className="text-sm text-slate-300">Discover local businesses and reviews</div>
            </div>
          </div>

          <div className="text-sm text-slate-400">© {new Date().getFullYear()} Pulse Square — All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
