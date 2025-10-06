import React from 'react';
import { Instagram, Dribbble, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="w-full bg-gray-800 text-gray-300 mt-auto">
    <div className="max-w-6xl mx-auto p-6 flex flex-col sm:flex-row justify-between items-center text-sm">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
        <p>&copy; {new Date().getFullYear()} Aesthetic Art Club</p>
        <a href="#" className="hover:text-amber-300">Privacy Policy</a>
        <a href="#" className="hover:text-amber-300">Terms</a>
        <a href="#" className="hover:text-amber-300">FAQ</a>
      </div>
      <div className="flex space-x-4">
        <Instagram size={20} />
        <Dribbble size={20} />
        <Twitter size={20} />
        <Youtube size={20} />
        <Mail size={20} />
      </div>
    </div>
  </footer>
);

export default Footer;
