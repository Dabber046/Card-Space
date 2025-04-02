import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-900 text-white px-4 py-3 flex gap-6 shadow-md">
    <Link to="/">Home</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/about">About</Link>
  </nav>
);

export default Navbar;
