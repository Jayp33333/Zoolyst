import React, { useState, useEffect } from "react";
import GetBadge from "./GetBadge";

const AnimalDetailModal = ({ animal, onClose, onEdit }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(0);
    setImageLoaded(false);
  }, [animal]);

  if (!animal) return null;

  const images =
    animal.imageUrls && animal.imageUrls.length > 0
      ? animal.imageUrls
      : ["https://via.placeholder.com/600x400?text=No+Image"];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-h-[95vh] w-full max-w-4xl flex flex-col overflow-hidden mx-2 sm:mx-0">
        <div className="overflow-y-auto flex-1 space-y-4 sm:space-y-6">
          <div className="relative w-full aspect-video bg-[#E0E0E0] min-h-[200px]">
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                imageLoaded ? "hidden" : "block"
              }`}
            >
              <div className="animate-pulse bg-gray-300 w-full h-full"></div>
            </div>
            <img
              src={images[currentImageIndex]}
              alt={animal.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />

            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 z-10 bg-white/20 hover:bg-white/90 
                      backdrop-blur-sm 
                      text-black 
                      rounded-full 
                      p-2 sm:p-3
                      hover:scale-110 
                      transition-all duration-200 
                      shadow-lg 
                      group
                    "
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-10 max-w-[70%]">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent break-words">
                {animal.name}
              </h2>
              {animal.scientificName && (
                <p className="text-white/90 text-sm sm:text-base font-light mt-1 drop-shadow-lg break-words">
                  {animal.scientificName}
                </p>
              )}
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/90 backdrop-blur-sm text-black rounded-full p-2 sm:p-3 hover:scale-110 transition-all duration-200 shadow-lg"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/90 backdrop-blur-sm text-black rounded-full p-2 sm:p-3 hover:scale-110 transition-all duration-200 shadow-lg"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2 sm:space-x-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setImageLoaded(false);
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 backdrop-blur-sm ${
                        index === currentImageIndex
                          ? "bg-white scale-125 shadow-lg"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-10 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1">
                <span className="text-white text-xs sm:text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[#E0E0E0]">
                <h4 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-3 flex items-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#2E7D32]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  About {animal.name}
                </h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {animal.description || "No description available"}
                </p>
              </div>

              {animal.funFacts && animal.funFacts.length > 0 && (
                <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[#E0E0E0]">
                  <h4 className="text-lg sm:text-xl font-semibold text-black mb-2 sm:mb-3 flex items-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#F57C00]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    Fun Facts
                  </h4>
                  <ul className="space-y-1 sm:space-y-2">
                    {animal.funFacts.map((fact, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-2 text-gray-700 text-sm sm:text-base"
                      >
                        <span className="text-[#2E7D32] mt-1 flex-shrink-0">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-4 sm:space-y-6">
              {animal.habitat && (
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[#E0E0E0]">
                  <h4 className="font-semibold text-black mb-2 flex items-center text-sm sm:text-base">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#2E7D32]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Habitat
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base">{animal.habitat}</p>
                </div>
              )}

              {animal.diet && (
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[#E0E0E0]">
                  <h4 className="font-semibold text-black mb-2 flex items-center text-sm sm:text-base">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#F57C00]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                    Diet
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base">{animal.diet}</p>
                </div>
              )}

              {animal.lifespan && (
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[#E0E0E0]">
                  <h4 className="font-semibold text-black mb-2 flex items-center text-sm sm:text-base">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#0288D1]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Lifespan
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base">{animal.lifespan}</p>
                </div>
              )}

              {animal.videoLinks && animal.videoLinks.length > 0 && (
                <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[#E0E0E0]">
                  <h4 className="font-semibold text-black mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#D32F2F]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Videos
                  </h4>
                  <div className="space-y-1 sm:space-y-2">
                    {animal.videoLinks.map((video, idx) => (
                      <a
                        key={idx}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group text-sm sm:text-base"
                      >
                        <div className="w-4 h-3 sm:w-6 sm:h-4 bg-[#D32F2F] rounded-[3px] sm:rounded-[4px] flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-2 sm:w-4 sm:h-2 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <span className="text-[#0288D1] group-hover:underline truncate font-medium">
                          {video.title || "Watch Video"}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {animal.historyLink && (
                <div className="border border-[#E0E0E0] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5">
                  <h4 className="font-semibold text-black mb-2 text-sm sm:text-base">Learn More</h4>
                  <a
                    href={animal.historyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-[#0288D1] hover:underline font-medium text-sm sm:text-base"
                  >
                    <span className="truncate">{animal.historyTitle || "Explore History"}</span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailModal;