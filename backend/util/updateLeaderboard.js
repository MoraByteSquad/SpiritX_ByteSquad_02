import Leaderboard from "../models/leaderboard.model.js";


export const updateLeaderboard = async ( userId, points ) => {

  try {
    const leaderboard = await Leaderboard.findOne({ userId });

    if (!leaderboard) {
      throw new Error('Leaderboard not found');
    }

    leaderboard.points = points;

    await leaderboard.save();

    console.log('Leaderboard updated successfully');
  }
  catch (error) {
    console.error("Error updating leaderboard:", error.message);
    return { error: error.message };
  }
}