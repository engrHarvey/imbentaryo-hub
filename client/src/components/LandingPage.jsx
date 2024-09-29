import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 text-white">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">Welcome to the <span className="text-stone-700">Imbentaryo</span>Hub</h1>
          <p className="text-lg mb-12 animate-fade-in-delay">
            Manage your business inventory efficiently with our user-friendly tools. Track items, monitor sales, and optimize your business performance.
          </p>
          <div className="space-x-4 animate-bounce">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg shadow-lg font-semibold hover:bg-gray-200 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg shadow-lg font-semibold hover:bg-blue-500 transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-blue-800 text-center text-white">
        <p className="text-sm">&copy; {new Date().getFullYear()} Harvey Abantao. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
