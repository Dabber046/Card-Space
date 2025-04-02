import React, { useState } from 'react';
import CardStoreSidebar from '../components/CardStoreSidebar';

const Home = ({ addToMyCards }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customCardName, setCustomCardName] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [cards, setCards] = useState([]);

  const searchCards = async () => {
    try {
      const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${searchQuery}`);
      const data = await res.json();
      setCards(data.data || []);
    } catch (err) {
      console.error('Failed to fetch cards:', err);
    }
  };

  const addCustomCard = () => {
    const name = customCardName.trim();
    const image =
      customImageUrl.trim() ||
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
    if (!name) return;

    const customCard = {
      id: `manual-${Date.now()}`,
      name,
      images: { small: image },
    };

    addToMyCards(customCard);
    setCustomCardName('');
    setCustomImageUrl('');
    alert(`Added "${name}" to your cards!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 text-white p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <CardStoreSidebar />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-center mb-6">Pokémon Card Tracker</h1>

          {/* Search */}
          <div className="flex justify-center mb-10">
            <div className="flex flex-col items-center space-y-4 w-full max-w-md">
              <input
                className="w-full p-3 rounded-lg border border-purple-700 shadow bg-white text-black placeholder-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cards from API..."
              />
              <button
                onClick={searchCards}
                className="w-full px-6 py-2 rounded-lg text-white bg-purple-700 hover:bg-purple-600 shadow-md"
              >
                Search
              </button>
            </div>
          </div>

          {/* Add Custom Card */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-col items-center space-y-4 w-full max-w-md">
              <input
                className="w-full p-3 rounded-lg border border-purple-700 bg-white text-black placeholder-purple-500"
                value={customCardName}
                onChange={(e) => setCustomCardName(e.target.value)}
                placeholder="Card name (e.g. Charizard)"
              />
              <input
                className="w-full p-3 rounded-lg border border-purple-700 bg-white text-black placeholder-purple-400"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="Image URL (optional)"
              />
              <button
                onClick={addCustomCard}
                className="w-full px-6 py-2 rounded-lg text-white bg-green-600 hover:bg-green-500 shadow-md"
              >
                Add Manually
              </button>
            </div>
          </div>

          {/* Card Results */}
          <div className="flex flex-wrap justify-center gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="border border-purple-700 p-4 rounded-xl w-40 bg-purple-800 text-white shadow-md"
              >
                <img
                  src={card.images.small}
                  alt={card.name}
                  className="w-full rounded-lg"
                />
                <p className="mt-2 text-center">{card.name}</p>
                <button
                  onClick={() => addToMyCards(card)}
                  className="mt-2 px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-sm w-full"
                >
                  Add to My Cards
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
