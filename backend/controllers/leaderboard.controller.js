import Leaderboard from "../models/leaderboard.model.js";

export const getLeaderboard = async (req, res, next) => {
  try {
    const { id } = req.params; // Get user ID from request params

    // Fetch the top 50 leaderboard players
    const leaderboardData = await Leaderboard.find()
      .select("username points")
      .sort({ points: -1, lastUpdated: 1 })
      .limit(10);

    // Add rank field to each entry
    const leaderboard = leaderboardData.map((entry, index) => ({
      rank: index + 1, // Rank starts from 1
      username: entry.username,
      points: entry.points,
    }));

    // Find the user in the leaderboard
    const user = await Leaderboard.findOne({ userId: id });

    let rank = -1; // Default rank if user is not found

    if (user) {
      rank = await Leaderboard.countDocuments({ points: { $gt: user.points } }) + 1;
    }

    res.status(200).json({
      success: true,
      message: "Leaderboard fetched successfully",
      data: leaderboard,
      rank, // User's rank
      points: user?.points,
      username: user?.username,
    });
  } catch (error) {
    next(error);
  }
};
