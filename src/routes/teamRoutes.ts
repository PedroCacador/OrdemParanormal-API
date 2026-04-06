import { Router } from "express";
import { TeamController } from "../controller/teamController";

const router = Router();
const controller = new TeamController();

router.get("/teams", controller.getAll);
router.get("/teams/:id", controller.getById);
router.post("/teams", controller.create);
router.put("/teams/:id", controller.update);
router.delete("/teams/:id", controller.delete);

export default router;