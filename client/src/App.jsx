import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MyCards from './pages/MyCards';
import Profile from './pages/profile';
import Footer from './components/Footer';

const App = () => {
  const [myCards, setMyCards] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('myCards');
    if (saved) setMyCards(JSON.parse(saved));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('myCards', JSON.stringify(myCards));
  }, [myCards]);

  // Add a new card if it doesn't exist
  const addToMyCards = (card) => {
    if (!myCards.some((c) => c.id === card.id)) {
      setMyCards((prev) => [...prev, card]);
    }
  };

  // Remove a card by ID
  const removeCard = (id) => {
    setMyCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="bg-purple-900 text-white px-6 py-4 flex justify-center gap-6 shadow-lg mb-6 rounded-b-2xl">
          <Link to="/" className="hover:text-purple-300 transition">Home</Link>
          <Link to="/my-cards" className="hover:text-purple-300 transition">My Cards</Link>
          <Link to="/profile" className="hover:text-purple-300 transition">Profile</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home addToMyCards={addToMyCards} />} />
          <Route path="/my-cards" element={<MyCards cards={myCards} removeCard={removeCard} />} />
          <Route path="/profile" element={<Profile cards={myCards} removeCard={removeCard} />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
