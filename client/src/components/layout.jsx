// src/components/Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-purple-950 via-black to-purple-900 p-6">
      {/* Navigation */}
      <nav className="bg-purple-900 text-white px-6 py-4 flex flex-wrap justify-center gap-6 items-center shadow-lg rounded-b-2xl mb-6">
        <Link to="/" className="hover:text-purple-300 transition">Home</Link>
        <Link to="/about" className="hover:text-purple-300 transition">About</Link>
        <Link to="/my-cards" className="hover:text-purple-300 transition">My Cards</Link>
        <Link to="/favorites" className="hover:text-purple-300 transition">Favorites</Link>
        <Link to="/profile" className="hover:text-purple-300 transition">Profile</Link>
        <Link to="/settings" className="hover:text-purple-300 transition">Settings</Link>
        <Link to="/login" className="hover:text-purple-300 transition">Login</Link>
        <Link to="/register" className="hover:text-purple-300 transition">Register</Link>
      </nav>

      <Outlet />

      <footer className="text-center py-6 border-t border-purple-700 text-gray-400 mt-10">
        <p>
          © 2025 Jared Mindock • Contact:{' '}
          <a href="mailto:jjmin94@gmail.com" className="text-purple-300 hover:text-purple-400">
            jjmin94@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
