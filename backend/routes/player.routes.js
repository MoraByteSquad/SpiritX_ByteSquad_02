import { Router } from "express";
import { createPlayer, deletePlayer, getPlayers, getPlayer, updatePlayer } from "../controllers/player.controller.js";

const playerRouter = Router();

playerRouter.post('/createPlayer', createPlayer);

playerRouter.get('/getPlayers', getPlayers);    

playerRouter.get('/getPlayer/:id', getPlayer);

playerRouter.put('/updatePlayer/:id', updatePlayer);

playerRouter.delete('/deletePlayer/:id', deletePlayer);



export default playerRouter;