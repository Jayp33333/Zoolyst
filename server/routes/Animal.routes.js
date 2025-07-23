import express from 'express';
import { getAllAnimals, createAnimal, updateAnimal, deleteAnimal } from '../controllers/Animal.controller.js';

const router = express.Router();

router.get('/', getAllAnimals);
router.post('/', createAnimal);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

export default router;