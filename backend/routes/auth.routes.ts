import { Router } from "express";
import { loginController, signupController} from "../controllers/auth.controller";

const authRoutes = Router();

// SignUp Route
authRoutes.post('/register', signupController);

// LogIn Route
authRoutes.post('/login', loginController);

export default authRoutes;
