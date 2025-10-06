import React, { useEffect, useState } from "react";
import ArtCard from "../Components/ArtCard";
import AestheticButton from "../Components/AestheticButton";
import axios from "axios";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);

  // Fetch all images from backend
  const fetchImages = async () => {
    try {
      const res = await axios.get("https://aestheticartclub-portfolio.onrender.com/images");
      setArtworks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Delete image
  const handleDelete = async (public_id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete(`https://aestheticartclub-portfolio.onrender.com/images/${public_id}`);
      setArtworks((prev) => prev.filter((img) => img.public_id !== public_id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete image.");
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
            <div key={art.public_id} className="relative">
              <ArtCard artwork={{ imageUrl: art.url, title: "Artwork" }} />
              <button
                onClick={() => handleDelete(art.public_id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
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
