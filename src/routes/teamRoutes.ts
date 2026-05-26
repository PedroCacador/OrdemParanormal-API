import { Router } from "express";
import { TeamController } from "../controller/teamController";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/teams", verifyToken, TeamController.getAll);
router.get("/teams/:id", verifyToken, TeamController.getById);
router.post("/teams", verifyToken, TeamController.create);
router.put("/teams/:id", verifyToken, TeamController.update);
router.patch("/teams/:id", verifyToken, TeamController.patch);
router.delete("/teams/:id", verifyToken, TeamController.delete);

export default router;