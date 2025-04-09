import React from "react";
import typeColors from "../helpers/typecolors";

const PokemonCard = ({ pokemon }) => {
  const mainType = pokemon.types[0].type.name;
  const bgColor = typeColors[mainType] || "#ddd";

  return (
    <div
      className="rounded-xl shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer p-4 text-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="animate-bounce">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto w-20 h-20" />
      </div>
      <h2 className="capitalize font-bold mt-2 text-lg text-white drop-shadow">{pokemon.name}</h2>
      <div className="mt-1 text-sm text-white">
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </div>
    </div>
  );
};

export default PokemonCard;
