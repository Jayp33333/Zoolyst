import React from 'react'

const GetBadge = ({type}) => {
    if (type === 'Mammal' || type === 'Bird' || type === 'Reptile' || type === 'Amphibian' || type === 'Fish') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium backdrop-blur-xl bg-black/20 text-white rounded-md border border-white">
          {type}
        </span>
      );
    } else {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-[#E0E0E0] text-gray-700 rounded-md border border-gray-500">
          {type || 'Unknown'}
        </span>
      );
    }
}

export default GetBadge