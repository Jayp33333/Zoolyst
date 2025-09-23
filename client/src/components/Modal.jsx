import React from 'react';

const Modal = ({ isOpen, onClose, children } ) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className={`bg-white  rounded-lg shadow-lg w-full max-w-3xl relative my-8 max-h-[90vh] overflow-y-auto`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10"
        >
          &times;
        </button>

        {/* Modal content */}
        <div className="p-6 clear-both">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;