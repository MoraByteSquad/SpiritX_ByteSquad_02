import mongoose from 'mongoose';
import Player from '../models/player.model.js';
import PlayerValue from '../models/playerValue.model.js';
import { calculatePoints } from '../util/calculatePoints.util.js';

export const createPlayer = async (req, res, next) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Start a transaction

  try {
    const { name, university, category } = req.body;

    const stats = {
      "Total Runs": 0,
      "Balls Faced": 0,
      "Innings Played": 0,
      "Wickets": 0,
      "Overs Bowled": 0,
      "Runs Conceded": 0
    };

    const player = await Player.create([{ name, university, category, stats }], { session });

    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session

    res.status(201).json({
      success: true,
      message: "Player created successfully",
      data: player[0], // Return created player
    });

  } catch (error) {
    // If transaction is still active, abort it
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession(); // Ensure session ends in any case
    next(error);
  }
};

export const deletePlayer = async (req, res, next) => {
  const session = await mongoose.startSession(); // Start a session to handle transactions in MongoDB
  session.startTransaction(); // Start a transaction

  try {
    const { id } = req.params;

    await Player.findByIdAndDelete(id, { session });

    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session

    res.status(200).json({ 
      success: true,
      message: 'Player deleted successfully'
    });
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction
    session.endSession(); // End the session
    next(error);
  }
}

export const getPlayers = async (req, res, next) => {
  try {
    const players = await Player.find().select("_id name category");

    res.status(200).json({ 
      success: true,
      message: 'Players fetched successfully',
      data: players
    });
  } catch (error) {
    next(error);
  }
}

export const getPlayer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const player = await Player.findById(id);
    

    if (!player) {
      throw new Error('Player not found');
    }

    res.status(200).json({ 
      success: true,
      message: 'Player fetched successfully',
      data: player
    });
  } catch (error) {
    next(error);
  }
}

export const updatePlayer = async (req, res, next) => {
  const session = await mongoose.startSession(); // Start a session to handle transactions in MongoDB
  session.startTransaction(); // Start a transaction

  try {
    const { id } = req.params;
    const { 
      stats: {
        total_runs,
        balls_faced,
        innings_played,
        wickets,
        overs_bowled,
        runs_conceded
      }
    } = req.body;

    // Check if stats are provided correctly
    if (
      total_runs === undefined ||
      balls_faced === undefined ||
      innings_played === undefined ||
      wickets === undefined ||
      overs_bowled === undefined ||
      runs_conceded === undefined
    ) {
      return res.status(400).json({
        success: false,
        error: "All stats fields must be provided."
      });
    }

    // Update the player data in the database
    await Player.findByIdAndUpdate(
      id, 
      {
        stats: {
          "Total Runs": total_runs,
          "Balls Faced": balls_faced,
          "Innings Played": innings_played,
          "Wickets": wickets,
          "Overs Bowled": overs_bowled,
          "Runs Conceded": runs_conceded
        }
      }, 
      { session, runValidators: true }  // Ensure validators are run
    );
    
    calculatePoints(id, req.body.stats); // Calculate player points and value after updating stats

    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session

    res.status(200).json({ 
      success: true,
      message: 'Player updated successfully'
    });
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction
    session.endSession(); // End the session
    next(error);
  }
};

export const getTournamentSummary = async (req, res, next) => {
  try {
    // Aggregate data for overall runs, overall wickets, highest run scorer, and highest wicket taker
    const tournamentSummary = await Player.aggregate([
      {
        $group: {
          _id: null, // Group all players together
          overallRuns: { $sum: "$stats.Total Runs" }, // Sum of all players' runs
          overallWickets: { $sum: "$stats.Wickets" }, // Sum of all players' wickets
          highestRunScorer: {
            $push: {
              name: "$name",
              runs: "$stats.Total Runs",
            },
          },
          highestWicketTaker: {
            $push: {
              name: "$name",
              wickets: "$stats.Wickets",
            },
          },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          overallRuns: 1,
          overallWickets: 1,
          highestRunScorer: {
            $reduce: {
              input: "$highestRunScorer",
              initialValue: { name: "", runs: 0 },
              in: {
                $cond: [
                  { $gt: ["$$this.runs", "$$value.runs"] },
                  { name: "$$this.name", runs: "$$this.runs" },
                  "$$value",
                ],
              },
            },
          },
          highestWicketTaker: {
            $reduce: {
              input: "$highestWicketTaker",
              initialValue: { name: "", wickets: 0 },
              in: {
                $cond: [
                  { $gt: ["$$this.wickets", "$$value.wickets"] },
                  { name: "$$this.name", wickets: "$$this.wickets" },
                  "$$value",
                ],
              },
            },
          },
        },
      },
    ]);

    // If no players are found, return an empty summary
    if (tournamentSummary.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          overallRuns: 0,
          overallWickets: 0,
          highestRunScorer: { name: "", runs: 0 },
          highestWicketTaker: { name: "", wickets: 0 },
        },
      });
    }

    res.status(200).json({ success: true, data: tournamentSummary[0] });
  } catch (error) {
    next(error);
  }
};