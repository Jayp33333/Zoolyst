// src/pages/CreateAnimalPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GalleryHeader from '../../components/GalleryHeader';
import CreateAnimalForm from '../../components/CreateAnimalForm';
import { createAnimal } from './animalSlice';

const CreateAnimal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (animalData) => {
    try {
      await dispatch(createAnimal(animalData)).unwrap();
      navigate('/gallery');
    } catch (err) {
      setError(err.message || 'Failed to create animal');
    }
  };

  const handleCancel = () => {
    navigate('/gallery');
  };

  return (
    <>
      <GalleryHeader />
      <div className="container mx-auto py-8 px-4">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        <CreateAnimalForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </>
  );
};

export default CreateAnimal;