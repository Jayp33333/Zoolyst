import React from 'react';
import GetBadge from './GetBadge';

const AnimalCard = ({ animal, onDelete, onUpdate, onClick }) => {
  if (!animal) return null;

  const imageUrl = animal.imageUrls && animal.imageUrls.length > 0
    ? animal.imageUrls[0]
    : 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div 
      className="bg-white border border-[#E0E0E0] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative pt-[75%] overflow-hidden">
        <img 
          src={imageUrl} 
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

          {/* Animal Name */}
          <h2 className="text-black text-md sm:text-lg md:text-xl font-semibold mb-2 line-clamp-1">{animal.name}</h2>

          {/* Small preview description */}
          {animal.description && (
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 font-normal">
              {animal.description}
            </p>
          )}

          {/* Optional small info: Habitat and Lifespan */}
          <div className="text-gray-700 text-xs sm:text-sm space-y-1">
            {animal.habitat && (
              <p className="line-clamp-1">
                <strong>Habitat:</strong> {animal.habitat}
              </p>
            )}
            {animal.lifespan && (
              <p className="line-clamp-1">
                <strong>Lifespan:</strong> {animal.lifespan}
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        {/* <div className="mt-3 flex justify-end space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); onUpdate(animal); }}
            className="px-3 py-2 bg-[#0288D1] text-white rounded-md text-xs hover:bg-[#0277BD] transition-colors font-medium"
          >
            Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(animal._id); }}
            className="px-3 py-2 bg-[#D32F2F] text-white rounded-md text-xs hover:bg-[#C62828] transition-colors font-medium"
          >
            Delete
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AnimalCard;