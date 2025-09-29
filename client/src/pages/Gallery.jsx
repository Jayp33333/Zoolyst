import React, { useEffect, useState } from 'react';
import GalleryHeader from '../components/GalleryHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals, deleteAnimal, updateAnimal } from '../features/animals/animalSlice';
import AnimalCard from '../components/AnimalCard';
import Modal from '../components/Modal';
import AnimalForm from '../components/AnimalForm';
import AnimalDetailModal from '../components/AnimalDetailModal';
import DetailModal from '../components/DetailModal';
import GallerySkeleton from '../components/GallerySkeleton';

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

  if (loading) return <GallerySkeleton />; 
  

  if (error) return <div className="container mx-auto pt-20 text-center text-black">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-white">
      <GalleryHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      
      <div className="container mx-auto py-8 px-4 bg-white">
        {filteredAnimals.length === 0 ? (
          <div className="text-center text-black py-12">
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
                className="text-black hover:underline font-medium border border-black px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Clear Search/Filter
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AnimalForm 
          initialValues={currentAnimal} 
          onSubmit={handleUpdateSubmit} 
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

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
    </div>
  );
};

export default Gallery;