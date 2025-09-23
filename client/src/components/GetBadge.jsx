import React from 'react'

const GetBadge = ({type}) => {
    if (type === 'Mammal') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-[#FFF8E1] text-[#2E7D32] rounded-md border border-[#2E7D32]">
          {type}
        </span>
      );
    } else if (type === 'Bird') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-[#E3F2FD] text-[#0288D1] rounded-md border border-[#0288D1]">
          {type}
        </span>
      );
    } else if (type === 'Fish') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-[#E0F7FA] text-[#00796B] rounded-md border border-[#00796B]">
          {type}
        </span>
      );
    } else if (type === 'Reptile') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-[#F1F8E9] text-[#689F38] rounded-md border border-[#689F38]">
          {type}
        </span>
      );
    } else if (type === 'Amphibian') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-[#FFF3E0] text-[#F57C00] rounded-md border border-[#F57C00]">
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