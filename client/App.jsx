function Dashboard({ token }) {
  const [cards, setCards] = React.useState([]);
  const [cardName, setCardName] = React.useState('');
  const [priceMap, setPriceMap] = React.useState({});
  const [favorites, setFavorites] = React.useState([]);

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
    setFavorites(prev =>
      prev.includes(name)
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  React.useEffect(() => {
    if (token) fetchCards();
  }, [token]);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 space-y-6">
      {/* Search/Add input and button centered */}
      <div className="flex flex-col items-center space-y-4">
        <input
          className="w-full p-3 rounded-lg border border-purple-700 shadow bg-white text-black placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Search or add a Pokémon card..."
          value={cardName}
          onChange={e => setCardName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCard()}
        />
        <button
          onClick={addCard}
          className="px-6 py-2 rounded-lg text-white bg-purple-700 hover:bg-purple-600 transition-all shadow-md"
        >
          Add Card
        </button>
      </div>

      {/* Card list */}
      <ul className="space-y-3">
        {cards
          .sort((a, b) => favorites.includes(b.name) - favorites.includes(a.name))
          .map(card => (
            <li
              key={card.id}
              className={`p-4 rounded-xl shadow flex justify-between items-center border border-purple-700 ${
                card.name.toLowerCase().includes('charizard') ? 'charizard' : 'bg-purple-800 text-white'
              }`}
            >
              <div>
                <span className="block text-lg font-semibold">{card.name}</span>
                <span className="text-sm text-purple-300">${priceMap[card.name] || '...'}</span>
              </div>
              <button
                onClick={() => toggleFavorite(card.name)}
                className="text-2xl"
              >
                {favorites.includes(card.name) ? '⭐' : '☆'}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
