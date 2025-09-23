import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GalleryHeader = ({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const animalCategories = ['Mammal', 'Fish', 'Amphibian', 'Bird', 'Reptile'];

  const handleSearchToggle = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close filter dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
      
      // Close mobile search
      if (showMobileSearch && mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileSearch]);

  return (
    <nav className="bg-white border-b border-[#E0E0E0]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#2E7D32] hover:text-[#1B5E20] transition-colors duration-300">
            Zoolyst
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-2">
          {/* Mobile Search Button */}
          <button 
            type="button" 
            className="md:hidden text-gray-600 hover:bg-[#E0E0E0] rounded-lg text-sm p-2.5 transition-colors"
            onClick={handleSearchToggle}
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>

          {/* Mobile Search Input */}
          {showMobileSearch && (
            <div className="absolute top-16 left-0 right-0 px-4 md:hidden" ref={mobileSearchRef}>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input 
                  ref={searchInputRef}
                  type="text" 
                  className="block w-full p-2 ps-10 pe-7 text-sm text-black border border-[#E0E0E0] rounded-lg bg-white focus:ring-[#2E7D32] focus:border-[#2E7D32]" 
                  placeholder="Search animals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute inset-y-0 end-0 flex items-center pr-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Clear search</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Desktop Search Input */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="text" 
              className="block w-full p-2 ps-10 pe-7 text-sm text-black border border-[#E0E0E0] rounded-lg bg-white focus:ring-[#2E7D32] focus:border-[#2E7D32]" 
              placeholder="Search animals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 end-0 flex items-center pr-2 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>

          {/* Filter Button */}
          <div className="relative" ref={dropdownRef}>
            <button 
              type="button" 
              className="flex items-center text-gray-600 hover:bg-[#E0E0E0] rounded-lg text-sm p-2.5 transition-colors"
              onClick={toggleFilterDropdown}
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m2.133 2.6 5.856 6.9L8 14l4-3 .011-7.5L17.866 2.6c.414-.6-.237-1.4-.867-.9l-6.56 5.6a1 1 0 0 1-1.278 0L3 1.7c-.63-.5-1.281.3-.867.9Z"/>
              </svg>
              {selectedCategories.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold text-[#2E7D32] bg-[#E8F5E8] rounded-full">
                  {selectedCategories.length}
                </span>
              )}
              <span className="sr-only">Filter</span>
            </button>

            {/* Filter Dropdown */}
            {showFilterDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg border border-[#E0E0E0]">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-[#E0E0E0] font-medium">
                    Filter by category
                  </div>
                  {animalCategories.map(category => (
                    <div key={category} className="flex items-center px-4 py-2 hover:bg-[#FFF8E1] transition-colors">
                      <input
                        id={`filter-${category}`}
                        type="checkbox"
                        className="w-4 h-4 text-[#2E7D32] bg-white border-[#E0E0E0] rounded focus:ring-[#2E7D32] focus:ring-2"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <label 
                        htmlFor={`filter-${category}`}
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                  {selectedCategories.length > 0 && (
                    <div className="px-4 py-2 border-t border-[#E0E0E0]">
                      <button
                        onClick={() => setSelectedCategories([])}
                        className="text-sm text-[#0288D1] hover:underline font-medium"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GalleryHeader;