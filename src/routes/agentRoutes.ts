import { Router } from "express";
import { AgentController } from "../controller/agentController";

const router = Router();

router.get("/agents", AgentController.getAll);
router.get("/agents/:id", AgentController.getById);
router.post("/agents", AgentController.create);
router.put("/agents/:id", AgentController.update);
router.patch("/agents/:id", AgentController.patch);
router.delete("/agents/:id", AgentController.delete);

export default router;