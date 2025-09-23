import mongoose from "mongoose";

const videoLinkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
});

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  type: { type: String, required: true, enum: ["mammal", "bird", "fish", "reptile", "amphibian"] },
  description: { type: String, required: true },
  habitat: { type: String, required: true },
  diet: { type: String, required: true },
  lifespan: { type: String, required: true },
  funFacts: [{ type: String }],
  videoLinks: [videoLinkSchema],
  historyLink: { type: String },
  historyTitle: { type: String },
  imageUrls: [{ type: String }],
}, { timestamps: true });

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;
