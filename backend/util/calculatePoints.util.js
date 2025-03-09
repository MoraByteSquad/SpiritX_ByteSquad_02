import PlayerValue from "../models/playerValue.model.js";

export const calculatePoints = async (id, stats, session = null) => {
  try {
    const { total_runs, balls_faced, innings_played, wickets, overs_bowled, runs_conceded } = stats;

    // Validate input values
    if (
      total_runs < 0 || balls_faced <= 0 || innings_played <= 0 ||
      wickets < 0 || overs_bowled <= 0 || runs_conceded < 0
    ) {
      console.log("Invalid input values, not calculating points");
      return;
    }

    // Batting statistics
    const batting_strike_rate = (total_runs / balls_faced) * 100;
    const batting_average = total_runs / innings_played;

    // Bowling statistics (handle division by zero for wickets)
    const bowling_strike_rate = wickets > 0 ? balls_faced / wickets : 0;
    const economy_rate = overs_bowled > 0 ? runs_conceded / overs_bowled : 0;

    // Avoid division by zero errors in player points calculation
    const bowling_points = (wickets > 0 ? (500 / bowling_strike_rate) : 0) + (economy_rate > 0 ? (140 / economy_rate) : 0);
    const batting_points = (batting_strike_rate / 5) + (batting_average * 0.8);

    const player_points = batting_points + bowling_points;

    // Calculate player value and round to nearest 50,000
    let player_value = ((9 * player_points) + 100) * 1000;
    player_value = Math.round(player_value / 50000) * 50000;

    await PlayerValue.findOneAndUpdate(
      { playerId: id },
      { points: player_points, value: player_value },
      { session: session || undefined, runValidators: true } // Ensure validators are run
    );

    console.log("Player points and value calculated successfully");

  } catch (error) {
    console.error("Error calculating player points:", error);
    return { error: error.message };
  }
};
