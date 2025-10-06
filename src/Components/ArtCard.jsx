import React from "react";

const PLACEHOLDER_ART_URL = (id) =>
  `https://placehold.co/300x${300 + (id % 4) * 20}/F0EBE0/333333?text=Art+${id}`;

const ArtCard = ({ artwork }) => {
  const imageSrc = artwork.imageUrl || artwork.url || PLACEHOLDER_ART_URL(artwork.id || 1);
  const title = artwork.title || "Untitled Art";
  const isPrintAvailable = artwork.isPrintAvailable || false;

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105 aspect-[4/5]"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = PLACEHOLDER_ART_URL(artwork.id || 1);
        }}
      />
      {isPrintAvailable && (
        <span className="absolute top-2 right-2 bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Print
        </span>
      )}
    </div>
  );
};

export default ArtCard;
