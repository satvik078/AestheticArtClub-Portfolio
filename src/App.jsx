import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ART_DATA } from "./data/artData";
import AestheticButton from "./Components/AestheticButton";
import ArtCard from "./Components/ArtCard";
import TestimonialsSection from "./Components/TestimonialsSection";
import SocialFeedSection from "./Components/SocialFeedSection";
import Footer from "./Components/Footer";
import { useFeaturedPrints } from "./hooks/useFeaturedPrints";
import ThemeToggle from "./Components/ThemeToggle";
import Gallery from "./Pages/Gallery";
import UploadArtSection from "./Components/UploadArtSection";
import Navbar from "./Components/Navbar";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";

const Home = () => {
  const { artworks, testimonials, socialFeed } = ART_DATA;
  const featuredPrints = useFeaturedPrints(artworks);

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

          {/* Buttons */}
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
        <section id="gallery" className="mb-16 text-center">
          <h2 className="text-3xl font-serif text-gray-700 dark:text-gray-200 mb-8 tracking-wider">
            Featured Artworks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {artworks.slice(0, 6).map((art) => (
              <ArtCard key={art.id} artwork={art} />
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

// Protected Route for Admin Dashboard
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("adminToken");
  return token ? element : <Navigate to="/admin" replace />;
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.theme || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Router>
      <div className="relative min-h-screen transition-colors duration-500">
        {/* Navbar */}
        <Navbar />
        {/* Floating Theme Toggle */}
        <div className="fixed bottom-6 right-6 z-50">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/upload" element={<UploadArtSection />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
