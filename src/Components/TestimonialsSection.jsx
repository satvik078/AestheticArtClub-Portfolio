import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';

const TestimonialsSection = ({ testimonials }) => (
  <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl max-w-4xl mx-auto border-4 border-gray-100">
    <div className="text-center mb-8">
      <h3 className="text-3xl font-serif text-gray-800 tracking-wider">
        Client Endorsements & Press
      </h3>
      <p className="text-gray-500 text-sm mt-2">Hear what others are saying about the work.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map(t => (
        <div
          key={t.id}
          className={`p-5 rounded-lg shadow-md border-t-4 ${
            t.type === 'client' ? 'bg-amber-50 border-amber-300' : 'bg-gray-50 border-gray-300'
          }`}
        >
          <Quote className="w-6 h-6 text-amber-500 mb-3" />
          <p className="text-sm italic text-gray-700 mb-4 leading-relaxed">
            "{t.quote}"
          </p>
          <div className="flex justify-between items-center text-xs font-semibold text-gray-600">
            <span>— {t.source}</span>
            {t.type === 'press' && t.link && (
              <a href={t.link} className="flex items-center text-amber-600 hover:text-amber-700">
                Read Article <ArrowRight className="w-3 h-3 ml-1" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TestimonialsSection;
