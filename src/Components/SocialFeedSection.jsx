import React from 'react';
import { Video, Instagram, Youtube, Dribbble } from 'lucide-react';
import AestheticButton from './AestheticButton';

const SocialFeedSection = ({ feedItems }) => (
  <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl max-w-4xl mx-auto">
    <div className="text-center mb-8">
      <h3 className="text-3xl font-serif text-gray-800 tracking-wider">
        Featured Social Feed
      </h3>
      <p className="text-gray-500 text-sm mt-2">Latest from the studio and behind the scenes.</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {feedItems.map(item => (
        <a href={item.link} key={item.id} className="block group relative overflow-hidden rounded-lg shadow-md">
          <img src={item.image} alt={item.caption} className="w-full h-32 object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
            {item.type === 'video' ? <Video className="w-8 h-8 text-white" /> : <Instagram className="w-8 h-8 text-white" />}
          </div>
        </a>
      ))}
    </div>

    <div className="text-center mt-10">
      <AestheticButton primary>Follow on Instagram</AestheticButton>
    </div>
  </div>
);

export default SocialFeedSection;
