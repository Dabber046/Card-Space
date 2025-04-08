import React, { useState } from 'react';

const CardDetails = ({ card }) => {
  const [note, setNote] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  if (!card) return <p className="text-center mt-10">No card details available.</p>;

  const handleSaveNote = () => {
    alert(`Saved note: "${note}"`);
    setNote('');
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="card-details max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 mt-10">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2">{card.name}</h2>
        <img
          src={card.imageUrl}
          alt={card.name}
          className="w-52 h-auto mb-4 rounded-lg shadow-md"
        />
        <button
          className={`mb-4 px-4 py-2 rounded-full text-sm font-semibold ${
            isFavorited ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
          }`}
          onClick={toggleFavorite}
        >
          {isFavorited ? '★ Favorited' : '☆ Favorite'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <p><strong>Type:</strong> {card.type}</p>
        <p><strong>HP:</strong> {card.hp}</p>
        {card.rarity && <p><strong>Rarity:</strong> {card.rarity}</p>}
        {card.setName && <p><strong>Set:</strong> {card.setName}</p>}
        {card.cardNumber && <p><strong>Card #:</strong> {card.cardNumber}</p>}
        {card.price && <p><strong>Market Price:</strong> ${card.price}</p>}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-1">Abilities:</h3>
        <ul className="list-disc list-inside text-sm">
          {card.abilities && card.abilities.length > 0 ? (
            card.abilities.map((ability, index) => (
              <li key={index}>{ability}</li>
            ))
          ) : (
            <li>No abilities listed</li>
          )}
        </ul>
      </div>

      <div className="mt-6">
        <label className="block font-semibold mb-1">Add a Note</label>
        <textarea
          className="w-full p-2 border rounded dark:bg-zinc-700"
          placeholder="Write something about this card..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSaveNote}
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default CardDetails;
