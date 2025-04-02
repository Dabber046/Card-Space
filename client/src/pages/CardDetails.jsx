import React from 'react';

const CardDetails = ({ card }) => {
    if (!card) {
        return <p>No card details available.</p>;
    }

    return (
        <div className="card-details">
            <h2>{card.name}</h2>
            <img src={card.imageUrl} alt={card.name} />
            <p><strong>Type:</strong> {card.type}</p>
            <p><strong>HP:</strong> {card.hp}</p>
            <p><strong>Abilities:</strong></p>
            <ul>
                {card.abilities && card.abilities.length > 0 ? (
                    card.abilities.map((ability, index) => (
                        <li key={index}>{ability}</li>
                    ))
                ) : (
                    <li>No abilities listed</li>
                )}
            </ul>
        </div>
    );
};

export default CardDetails;
