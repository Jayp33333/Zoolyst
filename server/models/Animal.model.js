import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Mammal', 'Bird', 'Reptile', 'Fish', 'Amphibian'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;