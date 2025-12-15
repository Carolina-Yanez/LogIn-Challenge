import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { AdminOnly } from "../middleware/role.middleware";
import { adminMetrics, userMetrics } from "../controllers/metrics.controller";

const metricsRoutes = Router();

// User Route
metricsRoutes.get('/user', authMiddleware, userMetrics);

//Admin Route
metricsRoutes.get('/admin', authMiddleware, AdminOnly, adminMetrics);

export default metricsRoutes;
