import mongoose from "mongoose";

const playerValueSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: [true, "Player ID is required"],
    unique: true,
  },
  points: {
    type: Number,
    required: [true, "Points are required"],
    min: 0,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Batsman", "Bowler", "All-Rounder"],
  },
  value: {
    type: Number,
    required: [true, "Value is required"],
    min: 0,
  },
});

const PlayerValue = mongoose.model("PlayerValue", playerValueSchema);

export default PlayerValue;