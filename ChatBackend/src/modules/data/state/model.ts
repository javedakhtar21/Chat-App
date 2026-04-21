import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
});

export const StateModel = mongoose.model("State", stateSchema);