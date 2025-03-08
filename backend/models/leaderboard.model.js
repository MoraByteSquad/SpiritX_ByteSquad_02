import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  points: {
    type: Number,
    required: [true, "Points are required"],
    min: 0,
  },
  lastUpdated: {
    type: Date,
    required: [true, "Last updated date is required"],
  },
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema, "leaderboard");

export default Leaderboard;