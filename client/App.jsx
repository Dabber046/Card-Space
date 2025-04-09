import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/styles/main.css'; // ✅ alias import

import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import About from '@/pages/About';
import CardDetails from '@/pages/CardDetails';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import MyCards from '@/pages/MyCards';
import Profile from '@/pages/Profile';
import PokemonGallery from '@/pages/PokemonGallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="card/:id" element={<CardDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="my-cards" element={<MyCards />} />
          <Route path="profile" element={<Profile />} />
          <Route path="pokemon" element={<PokemonGallery />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
