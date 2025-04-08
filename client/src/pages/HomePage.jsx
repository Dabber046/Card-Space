import React, { useState, useEffect } from 'react';

const getRandomPokemonIds = () => {
  const nums = new Set();
  while (nums.size < 5) {
    nums.add(Math.floor(Math.random() * 151) + 1); // Gen 1
  }
  return Array.from(nums);
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customCardName, setCustomCardName] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [cards, setCards] = useState([]);
  const [myCards, setMyCards] = useState([]);
  const [leftPokemon, setLeftPokemon] = useState([]);
  const [rightPokemon, setRightPokemon] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('myCards');
    if (saved) setMyCards(JSON.parse(saved));

    setLeftPokemon(getRandomPokemonIds());
    setRightPokemon(getRandomPokemonIds());
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
    <div className="relative flex flex-col items-center px-4">

      {/* 🎨 Random Pokémon Sprites + Pokéballs Left */}
      <div className="hidden lg:flex flex-col gap-6 fixed left-4 top-24 z-10">
        {leftPokemon.map((id, index) => (
          <div key={`left-${index}`} className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <img
                  key={`pokeball-left-${index}-${i}`}
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                  alt="Pokéball"
                  className="w-5 h-5 animate-spin-slow"
                />
              ))}
            </div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={`pokemon-${id}`}
              title={`Pokémon #${id}`}
              className="w-12 h-12 animate-bounce hover:scale-125 cursor-pointer transition"
              onClick={() => alert(`Pokémon ID: ${id} (Pokédex coming soon!)`)}
            />
          </div>
        ))}
      </div>

      {/* 🎨 Random Pokémon Sprites + Pokéballs Right */}
      <div className="hidden lg:flex flex-col gap-6 fixed right-4 top-24 z-10">
        {rightPokemon.map((id, index) => (
          <div key={`right-${index}`} className="flex items-center gap-2 flex-row-reverse">
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <img
                  key={`pokeball-right-${index}-${i}`}
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                  alt="Pokéball"
                  className="w-5 h-5 animate-pulse"
                />
              ))}
            </div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={`pokemon-${id}`}
              title={`Pokémon #${id}`}
              className="w-12 h-12 animate-pulse hover:scale-125 cursor-pointer transition"
              onClick={() => alert(`Pokémon ID: ${id} (Pokédex coming soon!)`)}
            />
          </div>
        ))}
      </div>

      {/* 🧢 Header */}
      <h1 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow">
        Pokémon Card Tracker
      </h1>

      {/* 🔍 Search Cards */}
      <div className="flex justify-center mb-10 z-10">
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
      <div className="flex justify-center mb-12 z-10">
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
      <div className="cards flex flex-wrap justify-center gap-4 z-10">
        {cards.map(card => (
          <div key={card.id} className="card border border-purple-700 p-4 rounded-xl w-40 bg-purple-800 text-white shadow-md hover:shadow-xl transition">
            <img src={card.images.small} alt={card.name} className="w-full rounded-lg" />
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

      {/* 🧾 My Cards */}
      <h2 id="mycards" className="text-2xl font-semibold text-center mt-12 mb-4 text-white">My Cards</h2>
      <div className="cards flex flex-wrap justify-center gap-4 z-10 mb-12">
        {myCards.map(card => (
          <div key={card.id} className="card border border-purple-700 p-4 rounded-xl w-40 bg-purple-800 text-white shadow-md">
            <img src={card.images.small} alt={card.name} className="w-full rounded-lg" />
            <p className="mt-2 text-center">{card.name}</p>
          </div>
        ))}
      </div>

      {/* 🎖️ Bottom Row: Pokémon + Pokéballs + Master Balls */}
      <div className="w-full flex flex-wrap justify-center items-center gap-6 px-4 py-6 bg-black bg-opacity-30 rounded-t-3xl z-0">
        {['25', '1', '4', '7', '150'].map((id) => (
          <img
            key={`bottom-poke-${id}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={`pokemon-${id}`}
            className="w-10 h-10 hover:scale-110 transition transform"
          />
        ))}

        {[ 'poke-ball', 'great-ball', 'ultra-ball', 'master-ball', 'premier-ball', 'luxury-ball' ].map((ball, i) => (
          <img
            key={`ball-type-${i}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${ball}.png`}
            alt={ball}
            className="w-8 h-8 hover:scale-110 transition transform"
            title={ball.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
          />
        ))}

        {Array.from({ length: 3 }).map((_, i) => (
          <img
            key={`masterball-${i}`}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
            alt="Master Ball"
            className="w-8 h-8 animate-spin-slow hover:scale-110 transition"
          />
        ))}
      </div>

      {/* 🌀 Floating Pokéball Animation */}
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
        alt="Floating Pokéball"
        className="fixed w-20 h-20 opacity-60 animate-float z-0 pointer-events-none"
        style={{ top: '10%', left: '5%' }}
      />
    </div>
  );
};

export default HomePage;
