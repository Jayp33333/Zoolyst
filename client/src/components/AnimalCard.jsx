import React, { useState } from "react";
import GetBadge from "./GetBadge";

const AnimalCard = ({ animal, onDelete, onUpdate, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!animal) return null;

  const imageUrl =
    animal.imageUrls && animal.imageUrls.length > 0
      ? animal.imageUrls[0]
      : "https://via.placeholder.com/300x200?text=No+Image";

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <div
      className="bg-white border border-[#F0F0F0] rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className="relative pt-[75%] overflow-hidden">
        <img
          src={imageUrl}
          alt={animal.name}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {isHovered && (
          <div className="absolute top-3 left-3 transition-opacity duration-300">
            <GetBadge
              type={animal.type.charAt(0).toUpperCase() + animal.type.slice(1)}
            />
          </div>
        )}
        
        {isHovered && animal.scientificName && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent bg-opacity-60 p-3 transition-opacity duration-300">
            <p className="text-white text-xs font-medium">
              {animal.scientificName}
            </p>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg font-bold mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {animal.name}
          </h2>
          {animal.description && (
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {animal.description}
            </p>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Learn more</span>
            <div className="flex space-x-2">
              <button
                onClick={handleLikeClick}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isLiked
                    ? "bg-red-50 text-red-500"
                    : "text-gray-400 hover:bg-gray-50 hover:text-red-500"
                }`}
                title={isLiked ? "Unlike" : "Like"}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>

              <button
                onClick={handleSaveClick}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isSaved
                    ? "bg-blue-50 text-blue-500"
                    : "text-gray-400 hover:bg-gray-50 hover:text-blue-500"
                }`}
                title={isSaved ? "Unsave" : "Save"}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill={isSaved ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalCard;
