import React from 'react';

const GallerySkeleton = () => {
  // Number of skeleton cards to show (match your grid size)
  const skeletonItems = Array(10).fill(0);

  return (
    <div className="container mx-auto py-28 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {skeletonItems.map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 w-full"></div>
            <div className="mt-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="mt-4 flex space-x-2">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySkeleton;