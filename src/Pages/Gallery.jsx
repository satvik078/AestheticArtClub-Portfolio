import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArtCard from "../Components/ArtCard";
import AestheticButton from "../Components/AestheticButton";
import axios from "axios";

const isOwner = true; // Set to true for owner view, false for visitors

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
        imageUrl: url,
      }));

      setArtworks(artObjects);
    } catch (err) {
      console.error("Failed to fetch gallery images", err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Remove image from backend and state
  const handleRemove = async (artId, imageUrl) => {
    try {
      // Call backend to remove image from cloudinary
      await axios.delete("https://aestheticartclub-portfolio.onrender.com/delete", { data: { url: imageUrl } });

      // Remove from state
      setArtworks((prev) => prev.filter((art) => art.id !== artId));
    } catch (err) {
      console.error("Failed to delete image", err);
    }
  };

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
            <div key={art.id} className="relative">
              <ArtCard artwork={art} />
              {isOwner && (
                <button
                  onClick={() => handleRemove(art.id, art.imageUrl)}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition"
                >
                  Remove
                </button>
              )}
            </div>
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
