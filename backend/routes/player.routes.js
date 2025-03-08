import { Router } from "express";
import { createPlayer, deletePlayer, getPlayers, getPlayer, updatePlayer } from "../controllers/player.controller.js";

const playerRouter = Router();

playerRouter.post('/create-player', createPlayer);

playerRouter.get('/get-players', getPlayers);    

playerRouter.get('/get-player/:id', getPlayer);

playerRouter.put('/update-player/:id', updatePlayer);

playerRouter.delete('/delete-player/:id', deletePlayer);

export default playerRouter;