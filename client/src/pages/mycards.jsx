import React, { useEffect, useState } from 'react';

const MyCards = () => {
  const [myCards, setMyCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('myCards');
    if (saved) setMyCards(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Saved Cards</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {myCards.length === 0 ? (
          <p className="text-purple-300">No cards yet! Add some from the home page.</p>
        ) : (
          myCards.map(card => (
            <div key={card.id} className="border border-purple-700 p-4 rounded-xl w-40 bg-purple-800 text-white shadow-md">
              <img src={card.images.small} alt={card.name} className="w-full rounded-lg" />
              <p className="mt-2 text-center">{card.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCards;
