import React from 'react'

const GetBadge = ({type}) => {
    if (type === 'Mammal') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-black/50 text-[#fbff0f] rounded-md border border-[#fbff0f]">
          {type}
        </span>
      );
    } else if (type === 'Bird') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-black/50 text-[#ff08b1] rounded-md border border-[#ff08b1]">
          {type}
        </span>
      );
    } else if (type === 'Fish') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-black/50 text-[#00a6ff] rounded-md border border-[#00a6ff]">
          {type}
        </span>
      );
    } else if (type === 'Reptile') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-black/50 text-[#77ff00] rounded-md border border-[#77ff00]">
          {type}
        </span>
      );
    } else if (type === 'Amphibian') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-black/50 text-[#ff870f] rounded-md border border-[#ff870f]">
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