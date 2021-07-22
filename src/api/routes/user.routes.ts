import { Router } from "express";
import { createUserController, findUserController } from "../controllers";
const router = Router();

router.post("/create", createUserController);
router.get("/:dni", findUserController);

export default router;
