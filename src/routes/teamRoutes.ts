import { Router } from "express";
import { TeamController } from "../controller/teamController";

const router = Router();

router.get("/teams", TeamController.getAll);
router.get("/teams/:id", TeamController.getById);
router.post("/teams", TeamController.create);
router.put("/teams/:id", TeamController.update);
router.patch("/teams/:id", TeamController.patch);
router.delete("/teams/:id", TeamController.delete);

export default router;