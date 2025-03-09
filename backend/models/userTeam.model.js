import mongoose from "mongoose";
import Leaderboard from "./leaderboard.model.js";

const userTeamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
    unique: true,
  },
  players: [
    {
      playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: [true, "Player ID is required"],
      },
      name: {
        type: String,
        required: [true, "Player name is required"],
      },
      points: {
        type: Number,
        required: [true, "Player points are required"],
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
    },
  ],
  initialBudget: {
    type: Number,
    default: 9000000,
  },
  remainingBudget: {
    type: Number,
    required: [true, "Remaining budget is required"],
  },
  teamSize: {
    type: Number,
    required: [true, "Team size is required"],
    min: 0,
    max: 11,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
});

// Update the Leaderboard entry when a UserTeam is updated
userTeamSchema.post("save", async function (doc, next) {
  try {
    // Calculate the total points for the team
    const totalPoints = doc.players.reduce((sum, player) => sum + player.points, 0);

    // Update the Leaderboard entry for this user
    await Leaderboard.findOneAndUpdate(
      { userId: doc.userId }, // Find the Leaderboard entry by userId
      { 
        points: totalPoints, // Update the points
        lastUpdated: new Date(), // Update the lastUpdated timestamp
      },
      { upsert: true } // Create a new entry if it doesn't exist
    );

    next();
  } catch (error) {
    next(error);
  }
});

const UserTeam = mongoose.model("UserTeam", userTeamSchema, "userTeams");

export default UserTeam;