import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

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
    <div>
      <nav>
        <a href="/">Home</a> | <a href="#mycards">My Cards</a> | <a href="#login">Login</a>
      </nav>
      <h1>Pokémon Card Tracker</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search cards..." />
      <button onClick={searchCards}>Search</button>
      <div className="cards">
        {cards.map(card => (
          <div key={card.id} className="card">
            <img src={card.images.small} alt={card.name} />
            <p>{card.name}</p>
            <button onClick={() => addToMyCards(card)}>Add to My Cards</button>
          </div>
        ))}
      </div>
      <h2 id="mycards">My Cards</h2>
      <div className="cards">
        {myCards.map(card => (
          <div key={card.id} className="card">
            <img src={card.images.small} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
