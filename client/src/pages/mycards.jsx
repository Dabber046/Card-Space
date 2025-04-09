import React, { useEffect, useState } from 'react';

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const pokeballs = Array.from({ length: 5 });

  useEffect(() => {
    const stored = localStorage.getItem('myCards');
    if (stored) {
      setCards(JSON.parse(stored));
    }
  }, []);

  const removeCard = (id) => {
    const updated = cards.filter(card => card.id !== id);
    setCards(updated);
    localStorage.setItem('myCards', JSON.stringify(updated));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white p-6">
      {/* 🎨 Pokéballs Left Side */}
      <div className="hidden lg:flex flex-col gap-6 fixed left-4 top-28 z-10">
        {pokeballs.map((_, index) => (
          <img
            key={`poke-left-${index}`}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokéball"
            className="w-10 h-10 animate-spin-slow hover:scale-110 transition duration-300"
          />
        ))}
      </div>

      {/* 🎨 Pokéballs Right Side */}
      <div className="hidden lg:flex flex-col gap-6 fixed right-4 top-28 z-10">
        {pokeballs.map((_, index) => (
          <img
            key={`poke-right-${index}`}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokéball"
            className="w-10 h-10 animate-pulse hover:scale-110 transition duration-300"
          />
        ))}
      </div>

      {/* 🔖 Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Your Saved Pokémon Cards</h1>

      {cards.length === 0 ? (
        <p className="text-center text-purple-300">
          No cards saved yet. Head to Home and add some!
        </p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center gap-4 bg-purple-800 border border-purple-700 rounded-xl p-4 shadow-md hover:shadow-lg transition"
            >
              <img
                src={
                  card.images?.small ||
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
                }
                alt={card.name}
                className="w-20 h-24 rounded border"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">{card.name}</p>
                <p className="text-sm text-purple-300">ID: {card.id}</p>
              </div>
              <button
                onClick={() => removeCard(card.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCards;
