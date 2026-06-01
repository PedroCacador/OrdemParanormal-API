import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AgentLevel } from "../model/agentModel";

export interface JwtPayload {
    id: number;
    name: string;
    email: string;
    level: AgentLevel;
    iat?: number;
    exp?: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "Token ausente." });
        return;
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        res.status(401).json({ error: "Formato inválido. Use 'Bearer <token>'." });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ error: "Token inválido." });
        return;
    }
}