import React, { useEffect, useState } from 'react';
import GalleryHeader from '../components/GalleryHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals, deleteAnimal, updateAnimal } from '../features/animals/animalSlice';
import AnimalCard from '../components/AnimalCard';
import Modal from '../components/Modal';
import AnimalForm from '../components/AnimalForm';
import AnimalDetailModal from '../components/AnimalDetailModal';
import DetailModal from '../components/DetailModal';

const Gallery = () => {
  const dispatch = useDispatch();
  const { data: animalsData, loading, error } = useSelector((state) => state.animals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  // Filter animals based on search query and selected categories
  const filteredAnimals = animalsData?.data?.filter(animal => {
    const categoryMatch = selectedCategories.length === 0 || 
                         selectedCategories.includes(animal.type);
    
    const searchMatch = animal.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    
    return categoryMatch && searchMatch;
  }) || [];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      try {
        await dispatch(deleteAnimal(id)).unwrap();
      } catch (err) {
        console.error('Failed to delete animal:', err);
        alert('Failed to delete animal');
      }
    }
  };

  const handleUpdateClick = (animal) => {
    setCurrentAnimal(animal);
    setIsModalOpen(true);
  };

  const handleCardClick = (animal) => {
    setSelectedAnimal(animal);
    setIsDetailModalOpen(true);
  };

  const handleUpdateSubmit = async (updatedAnimal) => {
    try {
      if (!currentAnimal?._id) {
        throw new Error('No animal ID found for update');
      }
      
      await dispatch(updateAnimal({
        id: currentAnimal._id,
        animal: updatedAnimal
      })).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to update animal:', err);
      alert('Failed to update animal: ' + err.message);
    }
  };

  if (loading) return (
    <div className="container mx-auto pt-20 text-center">
      <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
        </svg>
        Loading...
      </button>
    </div>
  );

  if (error) return <div className="container mx-auto pt-20 text-center text-red-500">Error: {error}</div>;

  return (
    <>
      <GalleryHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      
      <div className="container mx-auto py-8 px-4">
        {filteredAnimals.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            {animalsData?.data?.length === 0 ? (
              'No animals found in the database'
            ) : (
              'No animal found to match your search '
            )}
            <div className="mt-4">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories([]);
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear Search/Filter
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAnimals.map((animal) => (
              <AnimalCard 
                key={animal._id} 
                animal={animal} 
                onDelete={handleDelete} 
                onUpdate={() => handleUpdateClick(animal)}
                onClick={() => handleCardClick(animal)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AnimalForm 
          initialValues={currentAnimal} 
          onSubmit={handleUpdateSubmit} 
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Detail View Modal */}
      <DetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)}>
        <AnimalDetailModal 
          animal={selectedAnimal}
          onClose={() => setIsDetailModalOpen(false)}
          onEdit={() => {
            setIsDetailModalOpen(false);
            setCurrentAnimal(selectedAnimal);
            setIsModalOpen(true);
          }}
        />
      </DetailModal>
    </>
  );
};

export default Gallery;