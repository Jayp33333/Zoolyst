import Animal from "../models/Animal.model.js";
import mongoose from "mongoose";

// Get all animals
export const getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({});
    res.status(200).json({ success: true, data: animals });
  } catch (error) {
    console.log("Error fetching animals:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create a new animal
export const createAnimal = async (req, res) => {
  const animal = req.body;

  // Validate required fields
  if (!animal.name || !animal.type || !animal.description || !animal.imageUrls || !animal.imageUrls.length) {
    return res.status(400).json({ success: false, message: "Name, type, description, and at least one image URL are required" });
  }

  // Validate type
  const validTypes = ['mammal', 'bird', 'reptile', 'fish', 'amphibian'];
  if (!validTypes.includes(animal.type.toLowerCase())) {
    return res.status(400).json({ success: false, message: "Invalid animal type" });
  }

  try {
    // Ensure type is stored in lowercase
    animal.type = animal.type.toLowerCase();

    const newAnimal = new Animal(animal);
    await newAnimal.save();

    res.status(201).json({ success: true, data: newAnimal });
  } catch (error) {
    console.error("Error creating animal:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update animal
export const updateAnimal = async (req, res) => {
  const { id } = req.params;
  const animalData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(id, animalData, { new: true });
    res.status(200).json({ success: true, data: updatedAnimal });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete animal
export const deleteAnimal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    await Animal.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Animal deleted successfully" });
  } catch (error) {
    console.log("Error deleting animal:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
