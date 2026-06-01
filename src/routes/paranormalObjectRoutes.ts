import { Router } from "express";
import { ParanormalObjectController } from "../controller/paranormalObjectController";
import { verifyToken } from "../middlewares/verifyToken";
import { authorize } from "../middlewares/authorize";
import { AgentLevel } from "../model/agentModel";

const router = Router();

router.get("/paranormal-objects", verifyToken, ParanormalObjectController.getAll);
router.get("/paranormal-objects/:id", verifyToken, ParanormalObjectController.getById);
router.post("/paranormal-objects", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), ParanormalObjectController.create);
router.put("/paranormal-objects/:id", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), ParanormalObjectController.update);
router.patch("/paranormal-objects/:id", verifyToken, authorize([AgentLevel.operator, AgentLevel.veteran]), ParanormalObjectController.patch);
router.delete("/paranormal-objects/:id", verifyToken, authorize([AgentLevel.veteran]), ParanormalObjectController.delete);

export default router;
