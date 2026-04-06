import { Router } from "express";
import { AgentController } from "../controller/agentController";

const router = Router();
const controller = new AgentController();

router.get("/agents", controller.getAll);
router.get("/agents/:id", controller.getById);
router.post("/agents", controller.create);
router.put("/agents/:id", controller.update);
router.delete("/agents/:id", controller.delete);

export default router;