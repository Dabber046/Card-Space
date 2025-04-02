import React, { useState } from 'react';

const FavoriteButton = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <button
            onClick={toggleFavorite}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: isFavorite ? 'gold' : 'gray',
            }}
            aria-label={isFavorite ? 'Unmark as favorite' : 'Mark as favorite'}
        >
            {isFavorite ? '★' : '☆'}
        </button>
    );
};

export default FavoriteButton;
