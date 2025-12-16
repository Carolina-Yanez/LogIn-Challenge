import { Router } from "express";
import { loginController, meController, signupController} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const authRoutes = Router();

// SignUp Route
authRoutes.post('/register', signupController);

// LogIn Route
authRoutes.post('/login', loginController);

authRoutes.get('/me', authMiddleware, meController)

export default authRoutes;
