import { Router } from "express";
import { TeamController } from "../controller/teamController";
import { verifyToken } from "../middlewares/verifyToken";
import { authorize } from "../middlewares/authorize";
import { AgentLevel } from "../model/agentModel";

const router = Router();

router.get("/teams", verifyToken, TeamController.getAll);
router.get("/teams/:id", verifyToken, TeamController.getById);
router.post("/teams", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), TeamController.create);
router.put("/teams/:id", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), TeamController.update);
router.patch("/teams/:id", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), TeamController.patch);
router.delete("/teams/:id", verifyToken, authorize([AgentLevel.veteran]), TeamController.delete);

export default router;