// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './src/styles/main.css';

import Layout from './src/components/layout';
import HomePage from './src/pages/HomePage';
import About from './src/pages/about'; // This is the correct name
import CardDetails from './src/pages/CardDetails';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import MyCards from './src/pages/MyCards';
import Profile from './src/pages/Profile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/card/:id" element={<CardDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
