import { Router } from "express";
import { AdminSignIn, signOut, UserSignIn, userSignUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/user/sign-up', userSignUp);

authRouter.post('/user/sign-in', UserSignIn);

authRouter.post('/admin/sign-in', AdminSignIn);

authRouter.post('/sign-out', signOut);

export default authRouter;