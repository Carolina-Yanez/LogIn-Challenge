import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/generateToken.util";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "Missing token" });

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);

        req.body.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
}