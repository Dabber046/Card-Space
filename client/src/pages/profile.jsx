import React from 'react';
import { XCircle } from 'lucide-react';

const Profile = ({ cards = [], removeCard }) => {
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

      {/* 🔖 Page Header */}
      <h1 className="text-4xl font-extrabold text-center mb-4 animate-fade-in drop-shadow-xl">
        Your Pokémon Profile
      </h1>
      <p className="text-center text-purple-300 text-lg mb-10 animate-fade-in">
        Here are all the cards you've saved to your collection!
      </p>

      {cards.length === 0 ? (
        <p className="text-center text-purple-400 text-lg mt-10 animate-fade-in">
          You haven't saved any cards yet. Start collecting now!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`relative group bg-purple-800 border border-purple-700 rounded-xl shadow-lg p-4 w-44 transform transition-transform hover:scale-105 hover:shadow-2xl ${
                card.name?.toLowerCase().includes('charizard') ? 'charizard' : ''
              }`}
            >
              <img
                src={
                  card.images?.small ||
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
                }
                alt={card.name}
                className="w-full h-auto rounded-md transition-transform group-hover:scale-110"
              />
              <p className="mt-2 text-center font-semibold text-sm">{card.name}</p>

              {removeCard && (
                <button
                  onClick={() => removeCard(card.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-400 transition"
                  title="Remove from collection"
                >
                  <XCircle size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
