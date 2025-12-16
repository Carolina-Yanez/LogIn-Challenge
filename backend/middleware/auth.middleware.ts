import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/generateToken.util";

// Extender la interfaz Request para incluir user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401);

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);

        req.user = decoded;
        next();
    } catch {
        return res.status(401);
    }
}
