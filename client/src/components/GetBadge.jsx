import React from 'react'

const GetBadge = ({type}) => {
    if (type === 'Mammal') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-gray-700 text-yellow-400 rounded-sm border border-yellow-400">
          {type}
        </span>
      );
    } else if (type === 'Bird') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-gray-700 text-purple-400 rounded-sm border border-purple-400">
          {type}
        </span>
      );
    } else if (type === 'Fish') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-gray-700 text-blue-400 rounded-sm border border-blue-400">
          {type}
        </span>
      );
    } else if (type === 'Reptile') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-gray-700 text-green-400 rounded-sm border border-green-400">
          {type}
        </span>
      );
    } else if (type === 'Amphibian') {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-gray-700 text-orange-400 rounded-sm border border-orange-400">
          {type}
        </span>
      );
    } else {
      return (
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-gray-700 text-gray-400 rounded-sm border border-gray-500">
          {type}
        </span>
      );
    }
}

export default GetBadge