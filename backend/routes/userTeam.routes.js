import { Router } from "express";
import { 
  getUserTeam, 
  addPlayerToTeam, 
  removePlayerFromTeam, 
  getRemainingBudget, 
  getIsComplete,
  getTotalPoints, 
  updateTotalPoints 
} from "../controllers/userTeam.controller.js";

const userTeamRouter = Router();

userTeamRouter.get('/get-team/:id', getUserTeam);

userTeamRouter.post('/add-player/:id', addPlayerToTeam);

userTeamRouter.post('/remove-player/:id', removePlayerFromTeam);

userTeamRouter.get('/remaining-budget/:id', getRemainingBudget);

userTeamRouter.get('/is-complete/:id', getIsComplete);

userTeamRouter.get('/total-points/:id', getTotalPoints);

export default userTeamRouter;