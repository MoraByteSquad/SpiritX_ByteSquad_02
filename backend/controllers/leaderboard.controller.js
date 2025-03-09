import Leaderboard from "../models/leaderboard.model.js";

export const getLeaderboard = async (req, res, next) => {
  try {
    const { id } = req.params; // Get user ID from request params

    // Fetch the top 50 leaderboard players
    const leaderboard = await Leaderboard.find().sort({ points: -1 }).limit(50);

    // Find the user in the leaderboard
    const user = await Leaderboard.findOne({ userId: id });

    const rank = -1; // Default rank

    if (user) {
      rank = await Leaderboard.countDocuments({ points: { $gt: user.points } }) + 1;
    }

    res.status(200).json({
      success: true,
      message: "Leaderboard fetched successfully",
      data: leaderboard,
      rank,  // User's rank
    });
  } catch (error) {
    next(error);
  }
};