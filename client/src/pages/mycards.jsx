import React from 'react';

const MyCards = ({ cards = [], removeCard }) => {
  const pokeballs = Array.from({ length: 5 });

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
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border border-purple-700 p-4 rounded-xl w-40 bg-purple-800 text-white shadow-md hover:shadow-lg transition"
            >
              <img
                src={
                  card.images?.small ||
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
                }
                alt={card.name}
                className="w-full rounded-lg"
              />
              <p className="mt-2 text-center">{card.name}</p>
              {removeCard && (
                <button
                  onClick={() => removeCard(card.id)}
                  className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm w-full"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCards;
