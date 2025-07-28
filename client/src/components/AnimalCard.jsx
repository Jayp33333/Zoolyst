import React from 'react';
import GetBadge from './GetBadge';

const AnimalCard = ({ animal, onDelete, onUpdate }) => {
  return (
    <div className="bg-gray-800 border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-auto max-w-full">
      {/* Image with fixed aspect ratio */}
      <div className="relative pt-[75%] overflow-hidden"> {/* 4:3 aspect ratio */}
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
          <h2 className="text-white text-lg md:text-xl font-semibold mb-2 line-clamp-1">{animal.name}</h2>
          {animal.description && (
            <p className="text-gray-400 text-sm line-clamp-2 mb-3 font-normal">
              {animal.description}
            </p>
          )}
        </div>
        
        {/* Action Buttons */}
        {/* <div className="flex justify-end space-x-2 mt-auto">
          <button
            onClick={() => onUpdate(animal)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm md:text-base"
            aria-label={`Update ${animal.name}`}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(animal._id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm md:text-base"
            aria-label={`Delete ${animal.name}`}
          >
            Delete
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AnimalCard;