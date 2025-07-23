import Animal from "../models/Animal.model.js";
import mongoose from "mongoose";

export const getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({});
    res.status(200).json({ success: true, data: animals });
  } catch (error) {
    console.log("Error fetching animals:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const createAnimal = async (req, res) => {
  const animal = req.body;
  if (!animal.name || !animal.type || !animal.description || !animal.image) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  if (!['Mammal', 'Bird', 'Reptile', 'Fish', 'Amphibian'].includes(animal.type)) {
    return res.status(400).json({ success: false, message: "Invalid animal type" });
  }
  try {
    const newAnimal = new Animal(animal);
    await newAnimal.save();
  res.status(201).json({ success: true, data: newAnimal });
  } catch (error) {
    console.error("Error creating animal:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const updateAnimal = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  try {
    const updateAnimal = await Animal.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updateAnimal });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

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
}