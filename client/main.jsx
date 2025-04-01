import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import "./src/styles/main.css"

const App = () => {
  const [query, setQuery] = useState('')
  const [cards, setCards] = useState([])
  const [myCards, setMyCards] = useState([])

  const searchCards = async () => {
    const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${query}`)
    const data = await res.json()
    setCards(data.data)
  }

  const addToMyCards = (card) => {
    if (!myCards.some(c => c.id === card.id)) {
      setMyCards([...myCards, card])
    }
  }

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-purple-950 via-black to-purple-900 p-6">
      {/* Nav */}
      <nav className="bg-purple-900 text-white px-6 py-4 flex justify-center gap-6 items-center shadow-lg rounded-b-2xl mb-6">
        <a href="/" className="hover:text-purple-300 transition">Home</a>
        <a href="#mycards" className="hover:text-purple-300 transition">My Cards</a>
        <a href="#login" className="hover:text-purple-300 transition">Login</a>
      </nav>

      <h1 className="text-3xl font-bold text-center mb-6">Pokémon Card Tracker</h1>

      {/* Search Section */}
      <div className="flex flex-col items-center space-y-4 mb-10">
        <input
          className="w-80 p-3 rounded-lg border border-purple-700 shadow bg-white text-black placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search cards..."
        />
        <button
          onClick={searchCards}
          className="px-6 py-2 rounded-lg text-white bg-purple-700 hover:bg-purple-600 transition-all shadow-md"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
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

      {/* My Cards Section */}
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
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
