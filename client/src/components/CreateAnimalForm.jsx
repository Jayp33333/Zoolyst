// src/components/CreateAnimalForm.js
import React, { useState } from 'react';

const CreateAnimalForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    type: '', 
    description: '',
    habitat: '',
    diet: '',
    lifespan: '',
    funFacts: [''],
    imageUrls: [''],
    videoLinks: [{ url: '', title: '' }],
    historyLink: '',
    historyTitle: ''
  });

  const animalTypes = ['Mammal', 'Bird', 'Reptile', 'Amphibian', 'Fish'];

  const handleChange = (e, index, arrayName, field) => {
    const { name, value } = e.target;
    if (arrayName) {
      const updatedArray = [...formData[arrayName]];
      if (field) {
        updatedArray[index][field] = value; // for videoLinks
      } else {
        updatedArray[index] = value; // for funFacts or imageUrls
      }
      setFormData(prev => ({ ...prev, [arrayName]: updatedArray }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addArrayItem = (arrayName, defaultValue) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultValue]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-xl border border-[#E0E0E0] space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Add New Animal</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Scientific Name</label>
          <input
            type="text"
            name="scientificName"
            value={formData.scientificName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
            required
          >
            <option value="">Select animal type</option>
            {animalTypes.map((type) => (
              <option key={type} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lifespan</label>
          <input
            type="text"
            name="lifespan"
            value={formData.lifespan}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Habitat</label>
          <input
            type="text"
            name="habitat"
            value={formData.habitat}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diet</label>
          <input
            type="text"
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
          required
        />
      </div>

      {/* Image URLs */}
      <div className="bg-[#FFF8E1] p-4 rounded-lg shadow-sm border border-[#E0E0E0]">
        <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
        {formData.imageUrls.map((url, idx) => (
          <div key={idx} className="flex items-center mb-2 space-x-2">
            <input
              type="text"
              value={url}
              onChange={(e) => handleChange(e, idx, 'imageUrls')}
              className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
              placeholder="Image URL"
            />
            <button type="button" onClick={() => removeArrayItem('imageUrls', idx)} className="text-[#D32F2F] hover:underline font-medium">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('imageUrls', '')} className="text-[#0288D1] hover:underline text-sm font-medium">
          + Add Image
        </button>
      </div>

      {/* Fun Facts */}
      <div className="bg-[#FFF8E1] p-4 rounded-lg shadow-sm border border-[#E0E0E0]">
        <label className="block text-sm font-medium text-gray-700 mb-2">Fun Facts</label>
        {formData.funFacts.map((fact, idx) => (
          <div key={idx} className="flex items-center mb-2 space-x-2">
            <input
              type="text"
              value={fact}
              onChange={(e) => handleChange(e, idx, 'funFacts')}
              className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
              placeholder="Fun fact"
            />
            <button type="button" onClick={() => removeArrayItem('funFacts', idx)} className="text-[#D32F2F] hover:underline font-medium">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('funFacts', '')} className="text-[#0288D1] hover:underline text-sm font-medium">
          + Add Fun Fact
        </button>
      </div>

      {/* Video Links */}
      <div className="bg-[#FFF8E1] p-4 rounded-lg shadow-sm border border-[#E0E0E0]">
        <label className="block text-sm font-medium text-gray-700 mb-2">Video Links</label>
        {formData.videoLinks.map((video, idx) => (
          <div key={idx} className="flex items-center mb-2 space-x-2">
            <input
              type="text"
              value={video.url}
              placeholder="Video URL"
              onChange={(e) => handleChange(e, idx, 'videoLinks', 'url')}
              className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
            />
            <input
              type="text"
              value={video.title}
              placeholder="Video Title"
              onChange={(e) => handleChange(e, idx, 'videoLinks', 'title')}
              className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
            />
            <button type="button" onClick={() => removeArrayItem('videoLinks', idx)} className="text-[#D32F2F] hover:underline font-medium">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('videoLinks', { url: '', title: '' })} className="text-[#0288D1] hover:underline text-sm font-medium">
          + Add Video
        </button>
      </div>

      {/* History Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">History Link</label>
          <input
            type="text"
            name="historyLink"
            value={formData.historyLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">History Title</label>
          <input
            type="text"
            name="historyTitle"
            value={formData.historyTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-sm"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-[#E0E0E0]">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-[#E0E0E0] text-gray-700 rounded-md hover:bg-gray-300 transition-colors shadow-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#2E7D32] text-white rounded-md hover:bg-[#1B5E20] transition-colors shadow-lg font-medium"
        >
          Create Animal
        </button>
      </div>
    </form>
  );
};

export default CreateAnimalForm;