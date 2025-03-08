import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Player name is required"],
    trim: true,
  },
  university: {
    type: String,
    required: [true, "University is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Batsman", "Bowler", "All-Rounder"],
  },
  stats: {
    "Total Runs": {
      type: Number,
      required: [true, "Total Runs is required"],
      min: 0,
    },
    "Balls Faced": {
      type: Number,
      required: [true, "Balls Faced is required"],
      min: 0,
    },
    "Innings Played": {
      type: Number,
      required: [true, "Innings Played is required"],
      min: 0,
    },
    "Wickets": {
      type: Number,
      required: [true, "Wickets is required"],
      min: 0,
    },
    "Overs Bowled": {
      type: Number,
      required: [true, "Overs Bowled is required"],
      min: 0,
    },
    "Runs Conceded": {
      type: Number,
      required: [true, "Runs Conceded is required"],
      min: 0,
    },
  },
}, {
  timestamps: true,
});

const Player = mongoose.model("Player", playerSchema);

export default Player;