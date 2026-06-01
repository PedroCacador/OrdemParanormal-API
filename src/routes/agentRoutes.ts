import { Router } from "express";
import { AgentController } from "../controller/agentController";
import { verifyToken } from "../middlewares/verifyToken";
import { authorize } from "../middlewares/authorize";
import { AgentLevel } from "../model/agentModel";

const router = Router();

router.get("/agents", verifyToken, AgentController.getAll);
router.get("/agents/:id", verifyToken, AgentController.getById);
router.post("/agents", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), AgentController.create);
router.put("/agents/:id", verifyToken, AgentController.update);
router.patch("/agents/:id", verifyToken, AgentController.patch);
router.delete("/agents/:id", verifyToken, authorize([AgentLevel.veteran]), AgentController.delete);

export default router;