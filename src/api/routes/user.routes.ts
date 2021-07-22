import { Router } from "express";
import { findUserController } from "../controllers";
const router = Router();

router.get("/:dni", findUserController);

export default router;
