import React, { useState } from 'react';

const Login = () => {
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginClick = () => {
    setShowLoginBox(true);
  };

  const handleClose = () => {
    setShowLoginBox(false);
    setMessage('');
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      setMessage('Login successful!');
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="text-center mt-8">
      <button
        onClick={handleLoginClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Log In
      </button>

      {showLoginBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-80 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-left font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-2 border rounded dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="block text-left font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border rounded dark:bg-zinc-800"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>
            {message && (
              <p className="mt-3 text-sm text-center text-red-500 dark:text-red-400">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
