import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArtCard from "../Components/ArtCard";
import AestheticButton from "../Components/AestheticButton";
import axios from "axios";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);

  // Fetch all images from backend
  const fetchGallery = async () => {
    try {
      const res = await axios.get("https://aestheticartclub-portfolio.onrender.com/images");

      // Map URLs to artwork objects expected by ArtCard
      const artObjects = res.data.map((url, idx) => ({
        id: idx,
        title: "Uploaded Art",
        url, // Make sure ArtCard uses artwork.url
      }));

      setArtworks(artObjects);
    } catch (err) {
      console.error("Failed to fetch gallery images", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

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
