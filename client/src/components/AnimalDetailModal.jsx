import React, { useState, useEffect } from 'react';
import GetBadge from './GetBadge';

const AnimalDetailModal = ({ animal, onClose, onEdit }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(0);
    setImageLoaded(false);
  }, [animal]);

  if (!animal) return null;

  const images = animal.imageUrls && animal.imageUrls.length > 0 
    ? animal.imageUrls 
    : ['https://via.placeholder.com/600x400?text=No+Image'];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setImageLoaded(false);
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setImageLoaded(false);
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-h-[95vh] w-full max-w-4xl flex flex-col overflow-hidden">
              {/* Content */}
        <div className="overflow-y-auto flex-1 space-y-6">
        
        {/* Header Overlay - Inside Image */}
        <div className="relative w-full aspect-video bg-[#E0E0E0]">
          {/* Loading State */}
          <div className={`absolute inset-0 flex items-center justify-center ${imageLoaded ? 'hidden' : 'block'}`}>
            <div className="animate-pulse bg-gray-300 w-full h-full"></div>
          </div>
          
          {/* Main Image */}
          <img 
            src={images[currentImageIndex]} 
            alt={animal.name} 
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
          
          {/* Close Button - Top Right */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-white/20 hover:bg-white/90 backdrop-blur-sm text-black rounded-full p-3 hover:scale-110 transition-all duration-200 shadow-lg group"
          >
            <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Animal Name - Top Left */}
          <div className="absolute top-6 left-6 z-10">
            <h2 className="text-4xl font-bold text-white drop-shadow-2xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {animal.name}
            </h2>
            {animal.scientificName && (
              <p className="text-white/90 text-lg font-light mt-1 drop-shadow-lg">
                {animal.scientificName}
              </p>
            )}
          </div>

          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 left-6 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/90 backdrop-blur-sm text-black rounded-full p-3 hover:scale-110 transition-all duration-200 shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 right-6 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/90 backdrop-blur-sm text-black rounded-full p-3 hover:scale-110 transition-all duration-200 shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setImageLoaded(false);
                      setCurrentImageIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-200 backdrop-blur-sm ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125 shadow-lg' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-6 right-6 z-10 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm font-medium">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>


          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-6">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="rounded-xl p-5 border border-[#E0E0E0]">
                <h4 className="text-xl font-semibold text-black mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About {animal.name}
                </h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {animal.description || 'No description available'}
                </p>
              </div>

              {/* Fun Facts */}
              {animal.funFacts && animal.funFacts.length > 0 && (
                <div className="rounded-xl p-5 border border-[#E0E0E0]">
                  <h4 className="text-xl font-semibold text-black mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#F57C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Fun Facts
                  </h4>
                  <ul className="space-y-2">
                    {animal.funFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-gray-700">
                        <span className="text-[#2E7D32] mt-1">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Habitat */}
              {animal.habitat && (
                <div className="bg-white rounded-xl p-5 border border-[#E0E0E0]">
                  <h4 className="font-semibold text-black mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Habitat
                  </h4>
                  <p className="text-gray-600">{animal.habitat}</p>
                </div>
              )}

              {/* Diet */}
              {animal.diet && (
                <div className="bg-white rounded-xl p-5 border border-[#E0E0E0]">
                  <h4 className="font-semibold text-black mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#F57C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    Diet
                  </h4>
                  <p className="text-gray-600">{animal.diet}</p>
                </div>
              )}

              {/* Lifespan */}
              {animal.lifespan && (
                <div className="bg-white rounded-xl p-5 border border-[#E0E0E0]">
                  <h4 className="font-semibold text-black mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#0288D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Lifespan
                  </h4>
                  <p className="text-gray-600">{animal.lifespan}</p>
                </div>
              )}

              {/* Video Links */}
              {animal.videoLinks && animal.videoLinks.length > 0 && (
                <div className="bg-white rounded-xl p-5 border border-[#E0E0E0]">
                  <h4 className="font-semibold text-black mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#D32F2F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Videos
                  </h4>
                  <div className="space-y-2">
                    {animal.videoLinks.map((video, idx) => (
                      <a 
                        key={idx}
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                      >
                        <div className="w-6 h-4 bg-[#D32F2F] rounded-[4px] flex items-center justify-center">
                          <svg className="w-6 h-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <span className="text-[#0288D1] group-hover:underline truncate font-medium">
                          {video.title || 'Watch Video'}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* History Link */}
              {animal.historyLink && (
                <div className="border border-[#E0E0E0] rounded-xl p-5">
                  <h4 className="font-semibold text-black mb-2">Learn More</h4>
                  <a 
                    href={animal.historyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-[#0288D1] hover:underline font-medium"
                  >
                    <span>{animal.historyTitle || 'Explore History'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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