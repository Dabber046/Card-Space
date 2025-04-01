// src/components/CardStoreSidebar.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const mockStores = [
  {
    name: 'Charizard Comics',
    address: '123 Main St',
    position: [40.7128, -74.0060],
  },
  {
    name: 'PokéMart Local',
    address: '456 Elm St',
    position: [40.7138, -74.0020],
  },
  {
    name: 'Game Haven',
    address: '789 Oak Ave',
    position: [40.7148, -74.0045],
  },
];

const CardStoreSidebar = () => {
  const [search, setSearch] = useState('');

  const filtered = mockStores.filter(store =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-full md:w-64 bg-purple-950 text-white p-4 rounded-xl shadow-lg mb-6 md:mb-0">
      <h2 className="text-xl font-bold mb-4">📍 Local Card Stores</h2>

      <input
        className="w-full mb-4 p-2 rounded bg-black text-white placeholder-purple-400 border border-purple-700"
        placeholder="Search stores..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Small map preview */}
      <div className="h-48 w-full rounded mb-4 overflow-hidden">
        <MapContainer
          center={[40.7138, -74.006]} // Manhattan default
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((store, idx) => (
            <Marker key={idx} position={store.position}>
              <Popup>
                <strong>{store.name}</strong><br />
                {store.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Store List */}
      <ul className="space-y-3">
        {filtered.map((store, idx) => (
          <li key={idx} className="p-2 rounded-lg bg-purple-800 hover:bg-purple-700 transition">
            <p className="font-semibold">{store.name}</p>
            <p className="text-sm text-purple-300">{store.address}</p>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-purple-400 text-sm">No results found</li>
        )}
      </ul>
    </aside>
  );
};

export default CardStoreSidebar;
