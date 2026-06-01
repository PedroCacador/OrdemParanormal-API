import { Router } from "express";
import { MissionController } from "../controller/missionController";
import { verifyToken } from "../middlewares/verifyToken";
import { authorize } from "../middlewares/authorize";
import { AgentLevel } from "../model/agentModel";

const router = Router();

router.get("/missions", verifyToken, MissionController.getAll);
router.get("/missions/:id", verifyToken, MissionController.getById);
router.post("/missions", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), MissionController.create);
router.put("/missions/:id", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), MissionController.update);
router.patch("/missions/:id", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), MissionController.patch);
router.delete("/missions/:id", verifyToken, authorize([AgentLevel.veteran]), MissionController.delete);

export default router;
