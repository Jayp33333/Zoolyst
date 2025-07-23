import React, { useEffect, useState } from 'react';
import GalleryHeader from '../components/GalleryHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals, deleteAnimal, updateAnimal } from '../features/animals/animalSlice';
import AnimalCard from '../components/AnimalCard';
import Modal from '../components/Modal';
import AnimalForm from '../components/AnimalForm';

const Gallery = () => {
  const dispatch = useDispatch();
  const { data: animalsData, loading, error } = useSelector((state) => state.animals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState(null);

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

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

  if (loading) return <div className="container mx-auto pt-20 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto pt-20 text-center text-red-500">Error: {error}</div>;
  if (!animalsData?.data || animalsData.data.length === 0) {
    return <div className="container mx-auto pt-20 text-center">No animals found</div>;
  }

  return (
    <>
      <GalleryHeader />
      <div className="container mx-auto py-8 px-4">
        <div className="grid gap-6" style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(200px, 30vw, 250px), 1fr))',
          '@media (minWidth: 1024px)': {
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'
          }
        }}>
          {animalsData.data.map((animal) => (
            <AnimalCard 
              key={animal._id} 
              animal={animal} 
              onDelete={handleDelete} 
              onUpdate={() => handleUpdateClick(animal)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Edit Animal</h2>
        <AnimalForm 
          initialValues={currentAnimal} 
          onSubmit={handleUpdateSubmit} 
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default Gallery;