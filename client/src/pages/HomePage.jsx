import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customCardName, setCustomCardName] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [cards, setCards] = useState([]);
  const [myCards, setMyCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('myCards');
    if (saved) setMyCards(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('myCards', JSON.stringify(myCards));
  }, [myCards]);

  const searchCards = async () => {
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${searchQuery}`);
    const data = await res.json();
    setCards(data.data);
  };

  const addToMyCards = (card) => {
    if (!myCards.some(c => c.id === card.id)) {
      setMyCards([...myCards, card]);
    }
  };

  const addCustomCard = () => {
    const name = customCardName.trim();
    const image = customImageUrl.trim() || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
    if (!name) return;

    const customCard = {
      id: `manual-${Date.now()}`,
      name,
      images: { small: image }
    };

    addToMyCards(customCard);
    setCustomCardName('');
    setCustomImageUrl('');
    alert(`Added "${name}" to your cards!`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon Card Tracker</h1>

      {/* 🔍 Search Cards */}
      <div className="flex justify-center mb-10">
        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          <input
            className="w-full p-3 rounded-lg border border-purple-700 shadow bg-white text-black placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cards from API..."
          />
          <button
            onClick={searchCards}
            className="w-full px-6 py-2 rounded-lg text-white bg-purple-700 hover:bg-purple-600 transition-all shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* ➕ Manually Add Cards */}
      <div className="flex justify-center mb-12">
        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          <input
            className="w-full p-3 rounded-lg border border-purple-700 shadow bg-white text-black placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={customCardName}
            onChange={(e) => setCustomCardName(e.target.value)}
            placeholder="Card name (e.g. Charizard)"
          />
          <input
            className="w-full p-3 rounded-lg border border-purple-700 shadow bg-white text-black placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={customImageUrl}
            onChange={(e) => setCustomImageUrl(e.target.value)}
            placeholder="Image URL (optional)"
          />
          <button
            onClick={addCustomCard}
            className="w-full px-6 py-2 rounded-lg text-white bg-green-600 hover:bg-green-500 transition-all shadow-md"
          >
            Add Manually
          </button>
        </div>
      </div>

      {/* 📋 Search Results */}
      <div className="cards flex flex-wrap justify-center gap-4">
        {cards.map(card => (
          <div key={card.id} className="card border border-purple-700 p-4 rounded-xl w-40 bg-purple-800 text-white shadow-md hover:shadow-xl transition">
            <img src={card.images.small} alt={card.name} className="w-full rounded-lg" />
            <p className="mt-2">{card.name}</p>
            <button
              onClick={() => addToMyCards(card)}
              className="mt-2 px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-sm"
            >
              Add to My Cards
            </button>
          </div>
        ))}
      </div>

      {/* 🧾 My Cards */}
      <h2 id="mycards" className="text-2xl font-semibold text-center mt-12 mb-4">My Cards</h2>
      <div className="cards flex flex-wrap justify-center gap-4">
        {myCards.map(card => (
          <div key={card.id} className="card border border-purple-700 p-4 rounded-xl w-40 bg-purple-800 text-white shadow-md">
            <img src={card.images.small} alt={card.name} className="w-full rounded-lg" />
            <p className="mt-2">{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
