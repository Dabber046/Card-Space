import React from 'react';

const Profile = ({ cards = [], removeCard }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
      <p className="text-center text-purple-300 mb-8">View your saved Pokémon cards here.</p>

      {cards.length === 0 ? (
        <p className="text-center text-purple-400">You haven't saved any cards yet.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border border-purple-700 p-4 rounded-xl w-40 bg-purple-800 text-white shadow-md"
            >
              <img
                src={card.images?.small || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'}
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

export default Profile;
