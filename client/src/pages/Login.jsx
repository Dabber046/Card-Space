import React, { useState, useEffect } from 'react';

const Login = () => {
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [leftPokemon, setLeftPokemon] = useState([]);
  const [rightPokemon, setRightPokemon] = useState([]);

  const getRandomPokemonIds = () => {
    const ids = new Set();
    while (ids.size < 5) {
      ids.add(Math.floor(Math.random() * 151) + 1);
    }
    return Array.from(ids);
  };

  useEffect(() => {
    setLeftPokemon(getRandomPokemonIds());
    setRightPokemon(getRandomPokemonIds());
  }, []);

  const handleLoginClick = () => setShowLoginBox(true);
  const handleClose = () => {
    setShowLoginBox(false);
    setMessage('');
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      setMessage('Login successful!');
      setTimeout(() => handleClose(), 1000);
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="relative text-center mt-8 min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900">
      {/* 🎮 Left Pokémon */}
      <div className="hidden lg:flex flex-col gap-6 fixed left-4 top-28 z-10">
        {leftPokemon.map((id, i) => (
          <img
            key={`left-${i}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={`Pokémon ${id}`}
            className="w-12 h-12 animate-bounce hover:scale-110 transition"
          />
        ))}
      </div>

      {/* 🎮 Right Pokémon */}
      <div className="hidden lg:flex flex-col gap-6 fixed right-4 top-28 z-10">
        {rightPokemon.map((id, i) => (
          <img
            key={`right-${i}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={`Pokémon ${id}`}
            className="w-12 h-12 animate-pulse hover:scale-110 transition"
          />
        ))}
      </div>

      {/* 🖱️ Login Button */}
      <button
        onClick={handleLoginClick}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition text-lg font-semibold mt-20 shadow-md"
      >
        Log In
      </button>

      {/* 🪪 Login Modal */}
      {showLoginBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-sm relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block mb-2 text-left font-medium text-gray-800 dark:text-white">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-left font-medium text-gray-800 dark:text-white">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-500 transition text-white py-2 px-4 rounded font-semibold"
              >
                Submit
              </button>
            </form>

            {message && (
              <p className="mt-4 text-sm text-center text-red-500 dark:text-red-400">
                {message}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 📸 Big Pokémon Image on Bottom */}
      <img
        src="https://assets.pokemon.com/assets/cms2/img/misc/countries/gb/country_detail_pokemon.png"
        alt="Pokémon Group"
        className="mt-20 mx-auto w-full max-w-4xl opacity-80 drop-shadow-2xl"
      />
    </div>
  );
};

export default Login;
