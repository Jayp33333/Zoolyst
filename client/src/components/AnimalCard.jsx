import React from 'react';
import GetBadge from './GetBadge';

const AnimalCard = ({ animal, onDelete, onUpdate, onClick }) => {
  return (
    <div 
      className="bg-gray-800 border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-auto max-w-full cursor-pointer"
      onClick={onClick}
    >
      {/* Image with fixed aspect ratio */}
      <div className="relative pt-[75%] overflow-hidden">
        <img 
          src={animal.image} 
          alt={animal.name} 
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <GetBadge type={animal.type} />
          </div>
          <h2 className="text-white text-md sm:text-lg md:text-xl font-semibold mb-2 line-clamp-1">{animal.name}</h2>
          {animal.description && (
            <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3 font-normal">
              {animal.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;