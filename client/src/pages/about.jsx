import React from 'react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto mt-10 px-6">
      <h1 className="text-4xl font-bold text-purple-300 mb-4">About This App</h1>
      <p className="text-lg text-gray-300 mb-6">
        The Pokémon Card Tracker is a full-stack app that allows users to save their Pokémon cards,
        track live prices, and manage their collection with ease.
      </p>
      <p className="text-gray-400">
        Built with React, Flask, MongoDB, and Tailwind CSS. Designed to be fast, responsive, and
        visually engaging.
      </p>
    </div>
  );
}
