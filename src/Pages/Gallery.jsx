import React from 'react';
import { Link } from 'react-router-dom';
import { ART_DATA } from '../Data/artData';
import ArtCard from '../Components/ArtCard';
import AestheticButton from '../Components/AestheticButton';

const Gallery = () => {
  const { artworks } = ART_DATA;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6 transition-all duration-500">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-800 dark:text-gray-100 mb-8">
          Art Gallery
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Browse through all artworks including sketches, paintings, and digital designs.
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {artworks.map((art) => (
            <ArtCard key={art.id} artwork={art} />
          ))}
        </div>

        <div className="mt-12">
          <Link to="/">
            <AestheticButton>Back to Home</AestheticButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
