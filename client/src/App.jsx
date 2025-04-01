// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import MyCards from './pages/mycards';

const App = () => {
  const [myCards, setMyCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('myCards');
    if (saved) setMyCards(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('myCards', JSON.stringify(myCards));
  }, [myCards]);

  const addToMyCards = (card) => {
    if (!myCards.some(c => c.id === card.id)) {
      setMyCards(prev => [...prev, card]);
    }
  };

  return (
    <BrowserRouter>
      <nav className="bg-purple-900 text-white px-6 py-4 flex justify-center gap-6 shadow-lg mb-6 rounded-b-2xl">
        <Link to="/" className="hover:text-purple-300 transition">Home</Link>
        <Link to="/my-cards" className="hover:text-purple-300 transition">My Cards</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home addToMyCards={addToMyCards} />} />
        <Route path="/my-cards" element={<MyCards />} />
      </Routes>
    </BrowserRouter>
  );
};
export default function Footer() {
  return (
    <footer className="text-center py-6 border-t border-purple-700 text-gray-400 mt-10">
      <p>© 2024 Jared Mindock • Contact: <a href="mailto:jjmin94@gmail.com" className="text-purple-300 hover:text-purple-400">jjmin94@gmail.com</a></p>
    </footer>
  );
}

export default App;
