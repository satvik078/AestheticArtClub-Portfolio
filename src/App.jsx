import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ART_DATA } from "./Data/artData";
import AestheticButton from "./Components/AestheticButton";
import ArtCard from "./Components/ArtCard";
import TestimonialsSection from "./Components/TestimonialsSection";
import SocialFeedSection from "./Components/SocialFeedSection";
import Footer from "./Components/Footer";
import ThemeToggle from "./Components/ThemeToggle";
import Gallery from "./Pages/Gallery";
import axios from "axios";

// Owner flag (replace with proper auth later)
const isOwner = true;

const Home = () => {
  const { testimonials, socialFeed } = ART_DATA;

  const [uploadedImages, setUploadedImages] = useState([]); // all images from backend
  const [featuredImages, setFeaturedImages] = useState(Array(6).fill(null)); // first 6 slots

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const res = await axios.get("https://aestheticartclub-portfolio.onrender.com/images");
      setUploadedImages(res.data);

      // Fill first 6 slots for featured section
      const featured = Array(6).fill(null);
      res.data.slice(0, 6).forEach((img, idx) => {
        featured[idx] = img;
      });
      setFeaturedImages(featured);
    } catch (err) {
      console.error("Failed to fetch images", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Delete image from featured or gallery
  const handleDelete = async (url) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      // Find image public_id from uploadedImages
      const imgObj = uploadedImages.find((img) => img.url === url);
      if (!imgObj) return;

      await axios.delete(`https://aestheticartclub-portfolio.onrender.com/images/${imgObj.public_id}`);

      // Remove from uploadedImages
      setUploadedImages((prev) => prev.filter((img) => img.url !== url));

      // Remove from featuredImages if present
      setFeaturedImages((prev) => prev.map((img) => (img?.url === url ? null : img)));
    } catch (err) {
      console.error(err);
      alert("Failed to delete image.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex-col items-center font-sans overflow-x-hidden transition-all duration-500">
      {/* Header Section */}
      <div className="w-full bg-white dark:bg-gray-800 p-6 md:p-12 rounded-b-3xl shadow-lg relative overflow-hidden flex justify-center transition-colors duration-500">
        <header className="relative z-10 text-center pt-8 pb-10">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-800 dark:text-white tracking-wide mb-2">
            Aesthetic Art Club
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300 font-sans italic">
            Where imagination meets ink and color
          </p>

          <div className="mt-8 flex justify-center space-x-4 flex-wrap">
            <Link to="/gallery">
              <AestheticButton primary>View Gallery</AestheticButton>
            </Link>
            <Link to="/upload">
              <AestheticButton>Upload Your Art</AestheticButton>
            </Link>
            <AestheticButton>Reviews & Feeds</AestheticButton>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-8xl px-6 md:px-12 py-16 mx-auto transition-colors duration-500">
        {/* Featured Section */}
        <section id="featured" className="mb-16 text-center">
          <h2 className="text-3xl font-serif text-gray-700 dark:text-gray-200 mb-8 tracking-wider">
            Featured Artworks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {featuredImages.map((img, idx) => (
              <div key={idx} className="relative rounded-xl border border-gray-300 h-60 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                {img ? (
                  <>
                    <img
                      src={img.url}
                      alt={`Featured Art ${idx}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {isOwner && (
                      <button
                        onClick={() => handleDelete(img.url)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400 italic">Empty Slot</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <TestimonialsSection testimonials={testimonials} />
        </section>

        {/* Social Feeds */}
        <section className="mb-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <SocialFeedSection feedItems={socialFeed} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.theme || "light");

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Router>
      <div className="relative min-h-screen transition-colors duration-500">
        {/* Floating Theme Toggle */}
        <div className="fixed bottom-6 right-6 z-50">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/upload" element={<Gallery />} /> {/* Reuse Upload/Gallery logic */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
