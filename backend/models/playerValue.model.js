import mongoose from "mongoose";
import UserTeam from "./userTeam.model.js"; // Import the UserTeam model

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

// Update UserTeam documents when a PlayerValue is saved
playerValueSchema.post("save", async function (doc, next) {
  try {
    await updateUserTeams(doc); // Call the update function
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware to update UserTeam documents when a PlayerValue is updated using findOneAndUpdate
playerValueSchema.post("findOneAndUpdate", async function (doc, next) {
  try {
    if (doc) {
      await updateUserTeams(doc); // Call the update function
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Helper function to update UserTeam documents
async function updateUserTeams(playerValueDoc) {
  // Find all UserTeam documents that include this player
  const userTeams = await UserTeam.find({ "players.playerId": playerValueDoc.playerId });

  // Update each UserTeam document
  for (const userTeam of userTeams) {
    // Find the player in the UserTeam's players array
    const playerInTeam = userTeam.players.find(
      (player) => player.playerId.toString() === playerValueDoc.playerId.toString()
    );

    if (playerInTeam) {
      // Update the player's points, category, and value
      playerInTeam.name = playerValueDoc.name;
      playerInTeam.points = playerValueDoc.points;
      playerInTeam.category = playerValueDoc.category;
      playerInTeam.value = playerValueDoc.value;

      // Recalculate the totalPoints for the UserTeam
      userTeam.totalPoints = userTeam.players.reduce(
        (sum, player) => sum + player.points,
        0
      );

      // Save the updated UserTeam document
      await userTeam.save();
    }
  }
}

const PlayerValue = mongoose.model("PlayerValue", playerValueSchema, "playerValues");

export default PlayerValue;