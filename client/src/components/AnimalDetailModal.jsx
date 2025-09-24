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
      <div className="relative bg-white rounded-2xl shadow-2xl max-h-[95vh] w-full max-w-4xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0] sticky top-0 bg-white rounded-t-2xl z-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-2xl font-bold text-black">{animal.name}</h3>
              {/* <GetBadge type={animal.type} /> */}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* <button
              onClick={onEdit}
              className="flex items-center space-x-2 px-4 py-2 bg-[#0288D1] hover:bg-[#0277BD] text-white rounded-lg transition-all duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit</span>
            </button> */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#E0E0E0] rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Image Carousel */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#E0E0E0] shadow-lg">
            <div className={`absolute inset-0 flex items-center justify-center ${imageLoaded ? 'hidden' : 'block'}`}>
              <div className="animate-pulse bg-gray-300 w-full h-full"></div>
            </div>
            <img 
              src={images[currentImageIndex]} 
              alt={animal.name} 
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
            />
            
            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/90 text-black rounded-full p-3 hover:scale-110 transition-all duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/90 text-black rounded-full p-3 hover:scale-110 transition-all duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setImageLoaded(false);
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-[#535353] scale-125' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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