import { Request, Response, NextFunction } from "express";
import { AgentLevel } from "../model/agentModel";

export function authorize(allowedLevels: AgentLevel[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user || !req.user.level) {
            res.status(403).json({ error: "Access denied." });
            return;
        }
        
        if (!allowedLevels.includes(req.user.level)) {
            res.status(403).json({ error: "Access denied for this role." });
            return;
        }
        
        next();
    };
}