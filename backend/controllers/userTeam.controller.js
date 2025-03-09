import mongoose from 'mongoose';
import UserTeam from '../models/userTeam.model.js';
import Player from '../models/player.model.js';
import PlayerValue from '../models/playerValue.model.js';
import { updateLeaderboard } from '../util/updateLeaderboard.js';

export const getUserTeam = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userTeam = await UserTeam.findOne({ userId: id });

    if (!userTeam) {
      return res.status(404).json({
        success: false,
        message: "User team not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User team fetched successfully",
      data: userTeam,
    });
  } catch (error) {
    next(error);
  }
};

export const addPlayerToTeam = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params; // userId from request params
    const { playerId } = req.body; // playerId from request body

    console.log("Incoming request:", { userId: id, playerId }); // Debugging

    if (!mongoose.Types.ObjectId.isValid(playerId)) {
      throw new Error("Invalid Player ID format");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid User ID format");
    }

    if (!playerId) {
      throw new Error("Player ID is required");
    }

    // Find player details
    const player = await Player.findById(playerId).session(session);
    if (!player) {
      throw new Error(`Player with ID ${playerId} not found`);
    }

    const playerValue = await PlayerValue.findOne({ playerId }).session(session);
    if (!playerValue) {
      throw new Error(`PlayerValue for Player ID ${playerId} not found`);
    }

    const { name, category } = player;
    const { value, points } = playerValue;

    // Find user's team within the transaction
    const userTeam = await UserTeam.findOne({ userId: id }).session(session);
    if (!userTeam) {
      throw new Error(`User team for User ID ${id} not found`);
    }

    console.log("UserTeam found:", userTeam); // Debugging

    // Check if the player is already in the team
    if (userTeam.players.some((p) => p.playerId.toString() === playerId)) {
      throw new Error("Player is already in the team");
    }

    if (userTeam.remainingBudget < value) {
      throw new Error("Insufficient budget");
    }

    if (userTeam.teamSize >= 11) {
      throw new Error("Team already has 11 players");
    }

    // Add the player to the team
    userTeam.players.push({ playerId, name, points, category, value });
    userTeam.remainingBudget -= value;
    userTeam.teamSize += 1;
    userTeam.totalPoints = userTeam.players.reduce((sum, player) => sum + (player.points || 0), 0);

    if (userTeam.teamSize === 11) {
      userTeam.isComplete = true;
      await updateLeaderboard(id, userTeam.totalPoints);
    }

    await userTeam.save({ session });
    await session.commitTransaction();
    session.endSession();

    console.log("Player added successfully:", playerId); // Debugging

    res.status(201).json({
      success: true,
      message: "Player added successfully",
      data: userTeam,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in addPlayerToTeam:", error.message); // Debugging
    next(error);
  }
};

export const removePlayerFromTeam = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { playerId } = req.body;
    
    const userTeam = await UserTeam.findOne({ userId: id }).session(session);

    if (!userTeam) { 
      throw new Error('User team not found');
    }

    if (userTeam.teamSize === 0) {
      throw new Error('Team is empty');
    }

    const playerIndex = userTeam.players.findIndex(player => player.playerId.toString() === playerId);

    if (playerIndex === -1) {
      throw new Error('Player not found in team');
    }

    const removedPlayer = userTeam.players[playerIndex]; // Store player details before removing
    const playerValue = removedPlayer.value;
    const playerPoints = removedPlayer.points ?? 0; // Ensure points is never undefined

    // Remove the player
    userTeam.players.splice(playerIndex, 1);

    // Ensure remaining players have valid points before saving
    userTeam.players = userTeam.players.map(player => ({
      ...player,
      points: player.points ?? 0, // Ensure every player has a points value
    }));

    // Correct totalPoints calculation
    userTeam.totalPoints = userTeam.players.reduce((sum, player) => sum + (player.points || 0), 0);

    userTeam.remainingBudget += playerValue;
    userTeam.teamSize -= 1;
    userTeam.isComplete = false;

    await userTeam.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: 'Player removed successfully', data: userTeam });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getRemainingBudget = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userTeam = await UserTeam.findOne({ userId: id });

    if (!userTeam) throw new Error('User team not found');

    res.status(200).json({ success: true, data: userTeam.remainingBudget });
  } catch (error) {
    next(error);
  }
};

export const getIsComplete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userTeam = await UserTeam.findOne({ userId: id });

    if (!userTeam) throw new Error('User team not found');

    res.status(200).json({ success: true, data: userTeam.isComplete });
  } catch (error) {
    next(error);
  }
};

export const getTotalPoints = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userTeam = await UserTeam.findOne({ userId: id });

    if (!userTeam) {
      throw new Error('User team not found');
    }

    res.status(200).json({ success: true, data: userTeam.totalPoints });
  } catch (error) {
    next(error);
  }
};

export const updateTotalPoints = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { totalPoints } = req.body;

    const userTeam = await UserTeam.findOneAndUpdate(
      { userId },
      { totalPoints },
      { new: true }
    );
    if (!userTeam) throw new Error('User team not found');

    res.status(200).json({ success: true, message: 'Total points updated', data: userTeam });
  } catch (error) {
    next(error);
  }
};