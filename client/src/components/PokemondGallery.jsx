import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";

const PokemonGallery = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 30;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const results = res.data.results;

        const detailed = await Promise.all(
          results.map(async (pokemon) => {
            const pokeRes = await axios.get(pokemon.url);
            return pokeRes.data;
          })
        );

        setPokemonList(detailed);
        setFilteredList(detailed);
      } catch (err) {
        console.error("Error fetching Pokémon:", err);
      }
    };

    fetchPokemon();
  }, [offset]);

  useEffect(() => {
    let filtered = pokemonList;

    if (selectedType !== "all") {
      filtered = filtered.filter((poke) =>
        poke.types.some((t) => t.type.name === selectedType)
      );
    }

    if (searchTerm !== "") {
      filtered = filtered.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredList(filtered);
  }, [selectedType, searchTerm, pokemonList]);

  return (
    <div className="flex flex-col md:flex-row p-4">
      {/* Sidebar */}
      <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
        <div className="sticky top-4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Pokédex Filters</h2>

          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

          <select
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="all">All Types</option>
            {[
              "normal", "fire", "water", "electric", "grass", "ice", "fighting",
              "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
              "dragon", "dark", "steel", "fairy"
            ].map((type) => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>

          <div className="flex justify-between">
            <button
              onClick={() => setOffset(Math.max(offset - limit, 0))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Prev
            </button>
            <button
              onClick={() => setOffset(offset + limit)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredList.length > 0 ? (
          filteredList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No Pokémon found.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonGallery;
