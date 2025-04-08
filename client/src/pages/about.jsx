import React, { useState } from 'react';

const About = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for your feedback: "${feedback}"`);
    setFeedback('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About This App</h1>
      <p className="mb-4 text-lg">
        This app helps you search, track, and collect Pokémon cards. You can favorite cards, add notes, and see live prices!
      </p>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 p-4 rounded shadow-md">
        <label className="block mb-2 font-semibold">Have ideas or feedback?</label>
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Tell us what you think..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default About;
