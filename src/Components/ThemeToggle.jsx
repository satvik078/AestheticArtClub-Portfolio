import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 shadow-md hover:scale-110 transition-transform duration-300"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;
