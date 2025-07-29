import React from 'react';
import GetBadge from './GetBadge';

const AnimalDetailModal = ({ animal, onClose, onEdit }) => {
  if (!animal) return null;

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-[80vh] flex flex-col">
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 sticky top-0 bg-white dark:bg-gray-700 z-10">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {animal.name}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      
      {/* Scrollable Content Area */}
      <div className="overflow-y-auto flex-1 p-4 md:p-5 space-y-4">
        {/* Image Section */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <img 
            src={animal.image} 
            alt={animal.name} 
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Type Badge */}
        <div className="flex items-center">
          <GetBadge type={animal.type} />
        </div>
        
        {/* Description Section */}
        <div>
          <h4 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">About {animal.name}</h4>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {animal.description || 'No description available'}
          </p>
        </div>
      </div>
      
      {/* Fixed Footer */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-700 flex justify-end space-x-2 p-4 border-t dark:border-gray-600">
        <button
          type="button"
          onClick={onEdit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AnimalDetailModal;