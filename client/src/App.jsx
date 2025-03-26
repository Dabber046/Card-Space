import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './index.css';
import Footer from './Footer';
import About from './About';

function Navbar({ darkMode, setDarkMode, token, logout }) {
  return (
    <nav>
      <div className="text-2xl font-bold text-purple-300">🔥 Pokémon Tracker</div>
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-purple-300 transition">Home</Link>
        {token && <Link to="/dashboard" className="hover:text-purple-300 transition">Dashboard</Link>}
        <Link to="/about" className="hover:text-purple-300 transition">About</Link>
        {!token && <Link to="/login" className="hover:text-purple-300 transition">Login</Link>}
        <button onClick={() => setDarkMode(!darkMode)} className="bg-purple-500 px-3 py-1 rounded-lg shadow">
          {darkMode ? '☀️' : '🌙'}
        </button>
        {token && (
          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded-lg">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-purple-300">Welcome to the Pokémon Card Tracker</h1>
      <p className="text-lg text-purple-400 mt-4">Log in or register to start tracking your collection!</p>
    </div>
  );
}

function LoginRegister({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await axios.post('/api/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const register = async () => {
    await axios.post('/api/register', { email, password });
    login();
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-xl bg-purple-950 shadow space-y-4">
      <h2 className="text-2xl font-bold text-purple-300">Login or Register</h2>
      <input className="w-full p-2 rounded border" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="w-full p-2 rounded border" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={login} className="flex-1 bg-blue-500 text-white p-2 rounded">Login</button>
        <button onClick={register} className="flex-1 bg-green-500 text-white p-2 rounded">Register</button>
      </div>
    </div>
  );
}

function Dashboard({ token }) {
  const [cards, setCards] = useState([]);
  const [cardName, setCardName] = useState('');
  const [priceMap, setPriceMap] = useState({});
  const [favorites, setFavorites] = useState([]);

  const api = axios.create({
    baseURL: '/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchCards = async () => {
    const res = await api.get('/cards');
    setCards(res.data);
    res.data.forEach(card => fetchPrice(card.name));
  };

  const fetchPrice = async (name) => {
    const res = await api.get(`/price/${name}`);
    setPriceMap(prev => ({ ...prev, [name]: res.data.price }));
  };

  const addCard = async () => {
    if (!cardName) return;
    await api.post('/cards', { name: cardName });
    setCardName('');
    fetchCards();
  };

  const toggleFavorite = (name) => {
    setFavorites(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  useEffect(() => {
    if (token) fetchCards();
  }, [token]);

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6 px-4">
      <input
        placeholder="Search or add a Pokémon card..."
        value={cardName}
        onChange={e => setCardName(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addCard()}
      />
      <ul className="space-y-3">
        {cards.sort((a, b) => favorites.includes(b.name) - favorites.includes(a.name)).map(card => (
          <li key={card.id} className={`p-4 rounded-xl shadow flex justify-between items-center ${card.name.toLowerCase().includes('charizard') ? 'charizard' : ''}`}>
            <div>
              <span className="block text-lg">{card.name}</span>
              <span className="text-sm text-purple-300">${priceMap[card.name] || '...'}</span>
            </div>
            <button onClick={() => toggleFavorite(card.name)} className="text-2xl">
              {favorites.includes(card.name) ? '⭐' : '☆'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [darkMode, setDarkMode] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} token={token} logout={logout} />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginRegister setToken={setToken} />} />
              <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;