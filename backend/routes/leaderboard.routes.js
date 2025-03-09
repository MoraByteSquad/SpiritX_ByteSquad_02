import { Router } from "express";
import { getLeaderboard } from "../controllers/leaderboard.controller.js";

const leaderboardRouter = Router();

leaderboardRouter.get('/:id', getLeaderboard);

export default leaderboardRouter;