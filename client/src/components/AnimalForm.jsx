import React, { useState, useEffect } from 'react';

const AnimalForm = ({ initialValues, onSubmit, onCancel, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    type: '',
    description: '',
    habitat: '',
    diet: '',
    lifespan: '',
    imageUrls: [''],
    funFacts: [''],
    videoLinks: [{ url: '', title: '' }],
    historyLink: '',
    historyTitle: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const animalTypes = ['Mammal', 'Bird', 'Reptile', 'Amphibian', 'Fish', 'Insect', 'Arachnid', 'Other'];

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || '',
        scientificName: initialValues.scientificName || '',
        type: initialValues.type || '',
        description: initialValues.description || '',
        habitat: initialValues.habitat || '',
        diet: initialValues.diet || '',
        lifespan: initialValues.lifespan || '',
        imageUrls: initialValues.imageUrls?.length > 0 ? initialValues.imageUrls : [''],
        funFacts: initialValues.funFacts?.length > 0 ? initialValues.funFacts : [''],
        videoLinks: initialValues.videoLinks?.length > 0 ? initialValues.videoLinks : [{ url: '', title: '' }],
        historyLink: initialValues.historyLink || '',
        historyTitle: initialValues.historyTitle || ''
      });
    }
  }, [initialValues]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    // Validate image URLs
    formData.imageUrls.forEach((url, index) => {
      if (url && !isValidUrl(url)) {
        newErrors[`imageUrl-${index}`] = 'Please enter a valid URL';
      }
    });
    
    // Validate video URLs
    formData.videoLinks.forEach((video, index) => {
      if (video.url && !isValidUrl(video.url)) {
        newErrors[`videoUrl-${index}`] = 'Please enter a valid URL';
      }
    });
    
    if (formData.historyLink && !isValidUrl(formData.historyLink)) {
      newErrors.historyLink = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayChange = (index, value, field, subField = null) => {
    setFormData(prev => {
      const updated = [...prev[field]];
      if (subField) {
        updated[index] = { ...updated[index], [subField]: value };
      } else {
        updated[index] = value;
      }
      return { ...prev, [field]: updated };
    });
    
    // Clear error when user starts typing
    const errorKey = subField ? `${field}-${subField}-${index}` : `${field}-${index}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handleAddField = (field, defaultValue = '') => {
    setFormData(prev => {
      const updated = [...prev[field]];
      if (typeof defaultValue === 'object') {
        updated.push({ ...defaultValue });
      } else {
        updated.push(defaultValue);
      }
      return { ...prev, [field]: updated };
    });
  };

  const handleRemoveField = (field, index) => {
    if (formData[field].length > 1) {
      setFormData(prev => {
        const updated = [...prev[field]];
        updated.splice(index, 1);
        return { ...prev, [field]: updated };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Clean up empty fields before submitting
      const cleanedData = {
        ...formData,
        imageUrls: formData.imageUrls.filter(url => url.trim() !== ''),
        funFacts: formData.funFacts.filter(fact => fact.trim() !== ''),
        videoLinks: formData.videoLinks.filter(video => video.url.trim() !== '')
      };
      
      await onSubmit(cleanedData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const SectionHeader = ({ icon, title, description }) => (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <div className="p-2 bg-blue-100 rounded-lg mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      {description && <p className="text-gray-600 text-sm ml-11">{description}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-3xl font-bold">
            {mode === 'edit' ? 'Edit Animal' : 'Add New Animal'}
          </h1>
          <p className="opacity-90 mt-2">
            {mode === 'edit' 
              ? 'Update the details for this animal' 
              : 'Fill in the details to add a new animal to the database'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <SectionHeader 
              icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>}
              title="Basic Information"
              description="Essential details about the animal"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g., African Elephant"
                  required 
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scientific Name</label>
                <input 
                  type="text" 
                  name="scientificName" 
                  value={formData.scientificName} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="e.g., Loxodonta africana"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type <span className="text-red-500">*</span>
                </label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Select animal type</option>
                  {animalTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Lifespan</label>
                <input 
                  type="text" 
                  name="lifespan" 
                  value={formData.lifespan} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="e.g., 60-70 years"
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <SectionHeader 
              icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>}
              title="Description"
              description="Tell us about this animal"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="5" 
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Describe the animal's appearance, behavior, and characteristics..."
                required 
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>

          {/* Habitat & Diet Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <SectionHeader 
              icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
              title="Habitat & Diet"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Natural Habitat</label>
                <input 
                  type="text" 
                  name="habitat" 
                  value={formData.habitat} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="e.g., Savannas, forests, grasslands"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diet</label>
                <input 
                  type="text" 
                  name="diet" 
                  value={formData.diet} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="e.g., Herbivore, carnivore, omnivore"
                />
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <SectionHeader 
              icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>}
              title="Media"
              description="Add images and videos of the animal"
            />
            
            {/* Image URLs */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Image URLs</label>
              {formData.imageUrls.map((url, i) => (
                <div key={i} className="flex items-start space-x-3 mb-3">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={url} 
                      onChange={e => handleArrayChange(i, e.target.value, 'imageUrls')} 
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors[`imageUrl-${i}`] ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="https://example.com/image.jpg"
                    />
                    {errors[`imageUrl-${i}`] && <p className="text-red-500 text-sm mt-1">{errors[`imageUrl-${i}`]}</p>}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveField('imageUrls', i)} 
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center"
                    disabled={formData.imageUrls.length <= 1}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => handleAddField('imageUrls', '')} 
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Image URL
              </button>
            </div>

            {/* Video Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Video Links</label>
              {formData.videoLinks.map((video, i) => (
                <div key={i} className="mb-4 p-4 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Video Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g., National Geographic Documentary" 
                        value={video.title} 
                        onChange={e => handleArrayChange(i, e.target.value, 'videoLinks', 'title')} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Video URL</label>
                      <input 
                        type="text" 
                        placeholder="https://youtube.com/watch?v=..." 
                        value={video.url} 
                        onChange={e => handleArrayChange(i, e.target.value, 'videoLinks', 'url')} 
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors[`videoUrl-${i}`] ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors[`videoUrl-${i}`] && <p className="text-red-500 text-sm mt-1">{errors[`videoUrl-${i}`]}</p>}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      onClick={() => handleRemoveField('videoLinks', i)} 
                      className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm flex items-center"
                      disabled={formData.videoLinks.length <= 1}
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove Video
                    </button>
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => handleAddField('videoLinks', { url: '', title: '' })} 
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Add Another Video
              </button>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <SectionHeader 
              icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
              title="Additional Information"
            />
            
            {/* Fun Facts */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Fun Facts</label>
              {formData.funFacts.map((fact, i) => (
                <div key={i} className="flex items-start space-x-3 mb-3">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={fact} 
                      onChange={e => handleArrayChange(i, e.target.value, 'funFacts')} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="e.g., Can run up to 50 mph"
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveField('funFacts', i)} 
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center"
                    disabled={formData.funFacts.length <= 1}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => handleAddField('funFacts', '')} 
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Fun Fact
              </button>
            </div>

            {/* History Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">History Link</label>
                <input 
                  type="text" 
                  name="historyLink" 
                  value={formData.historyLink} 
                  onChange={handleChange} 
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.historyLink ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="https://en.wikipedia.org/wiki/..."
                />
                {errors.historyLink && <p className="text-red-500 text-sm mt-1">{errors.historyLink}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">History Link Title</label>
                <input 
                  type="text" 
                  name="historyTitle" 
                  value={formData.historyTitle} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="e.g., Wikipedia - African Elephant"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              Fields marked with <span className="text-red-500">*</span> are required
            </div>
            
            <div className="flex space-x-3">
              <button 
                type="button" 
                onClick={onCancel} 
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all font-medium flex items-center disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {mode === 'edit' ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {mode === 'edit' ? 'Update Animal' : 'Create Animal'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimalForm;