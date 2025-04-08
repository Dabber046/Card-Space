import React, { useState } from 'react';

const About = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for your feedback: "${feedback}"`);
    setFeedback('');
  };

  return (
    <div className="relative max-w-3xl mx-auto p-6 text-white">
      {/* 🎨 Floating Pikachu */}
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        alt="Pikachu"
        className="absolute top-4 right-6 w-16 h-16 animate-bounce hidden sm:block"
      />

      {/* 🔥 Glowing Header */}
      <h1 className="text-4xl font-extrabold mb-4 text-center text-white drop-shadow-lg animate-fade-in">
        About This App
      </h1>
      <p className="mb-6 text-lg text-center text-purple-200">
        This app helps you search, track, and collect Pokémon cards. You can favorite cards, add notes, and see live prices!
      </p>

      {/* 💬 Feedback Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-purple-900 bg-opacity-60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-purple-700 space-y-4 animate-fade-in"
      >
        <label className="block font-semibold text-white text-lg">Have ideas or feedback?</label>
        <textarea
          className="w-full h-28 p-3 rounded-lg border border-purple-500 bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Tell us what you think..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 transition px-6 py-2 text-white font-semibold rounded-lg shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default About;
