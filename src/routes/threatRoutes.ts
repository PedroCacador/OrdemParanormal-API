import { Router } from "express";
import { ThreatController } from "../controller/threatController";
import { verifyToken } from "../middlewares/verifyToken";
import { authorize } from "../middlewares/authorize";
import { AgentLevel } from "../model/agentModel";

const router = Router();

router.get("/threats", verifyToken, ThreatController.getAll);
router.get("/threats/:id", verifyToken, ThreatController.getById);
router.post("/threats", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), ThreatController.create);
router.put("/threats/:id", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), ThreatController.update);
router.patch("/threats/:id", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), ThreatController.patch);
router.delete("/threats/:id", verifyToken, authorize([AgentLevel.veteran]), ThreatController.delete);

export default router;
