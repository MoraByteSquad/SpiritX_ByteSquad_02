import { Router } from "express";
import { SignUp, signOut, SignIn } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', SignUp);

authRouter.post('/sign-in', SignIn);

authRouter.post('/sign-out', signOut);

export default authRouter;