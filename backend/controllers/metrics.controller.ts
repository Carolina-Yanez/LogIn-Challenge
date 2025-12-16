import { NextFunction, Request, Response } from "express";
import { getUserMetrics, getAdminMetrics } from "../services/metrics.service";

export const userMetrics = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401)
        }
        
        const email = req.user.email
        const metrics = getUserMetrics(email)

        res.json(metrics)
    } catch (error) {
        res.status(500)
    }
}

export const adminMetrics = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401)
        }
        
        const email = req.user.email
        const metrics = getAdminMetrics(email)

        res.json(metrics)
    } catch (error) {
        res.status(500)
    }
}
