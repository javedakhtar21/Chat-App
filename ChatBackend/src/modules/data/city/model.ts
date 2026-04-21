import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  stateId: { type: Number, required: true, index: true },
});

export const CityModel = mongoose.model("City", citySchema);
