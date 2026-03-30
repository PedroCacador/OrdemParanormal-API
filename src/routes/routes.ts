import { Router } from "express";
import { AgenteController } from "../controller/agenteController";

const router = Router();
const controller = new AgenteController();

router.get("/agentes", controller.getAll);
router.get("/agentes/:id", controller.getById);
router.post("/agentes", controller.create);
router.put("/agentes/:id", controller.update);
router.delete("/agentes/:id", controller.delete);

export default router;