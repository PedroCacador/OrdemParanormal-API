import { Router } from "express";
import { AgentController } from "../controller/agentController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/agents", verifyToken, AgentController.getAll);
router.get("/agents/:id", verifyToken, AgentController.getById);
router.post("/agents", AgentController.create);
router.put("/agents/:id", verifyToken, AgentController.update);
router.patch("/agents/:id", verifyToken, AgentController.patch);
router.delete("/agents/:id", verifyToken, AgentController.delete);

export default router;