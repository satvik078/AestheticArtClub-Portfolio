import React from 'react';

const AestheticButton = ({ children, primary = false, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm
      ${primary
        ? 'bg-amber-100 text-gray-800 hover:bg-amber-200 border-2 border-amber-300'
        : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300'}
    `}
  >
    {children}
  </button>
);

export default AestheticButton;
