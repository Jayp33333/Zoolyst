import axios from '../../services/axiosInstance.js';

export const fetchAnimals = async () => {
  const response = await axios.get('/api/animals');
  return response.data;
};

export const createAnimal = async (animal) => {
  const response = await axios.post('/api/animals', animal);
  return response.data;
};

export const updateAnimal = async ({ id, animal }) => {
  const response = await axios.put(`/api/animals/${id}`, animal);
  return response.data;
};

export const deleteAnimal = async (id) => {
  const response = await axios.delete(`/api/animals/${id}`);
  return { _id: id };
};