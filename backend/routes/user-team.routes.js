import { Router } from "express";
import { getTeam, addPlayerToUserTeam, deletePlayerFromUserTeam } from "../controllers/userTeam.controller.js";

const userTeamRouter = Router();

userTeamRouter.get('/get-team/:id', getTeam);

userTeamRouter.post('/add-player/:id', addPlayerToUserTeam);

userTeamRouter.post('/delete-player/:id', deletePlayerFromUserTeam);

userTeamRouter.get('/budjet/:id', getBudjet);

export default userTeamRouter;