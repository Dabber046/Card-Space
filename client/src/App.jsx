import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MyCards from './pages/MyCards';
import Footer from './components/Footer';

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
      <div className="min-h-screen flex flex-col">
        <nav className="bg-purple-900 text-white px-6 py-4 flex justify-center gap-6 shadow-lg mb-6 rounded-b-2xl">
          <Link to="/" className="hover:text-purple-300 transition">Home</Link>
          <Link to="/my-cards" className="hover:text-purple-300 transition">My Cards</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home addToMyCards={addToMyCards} />} />
          <Route path="/my-cards" element={<MyCards />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
