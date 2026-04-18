import { Router } from "express";
import { userController } from "./controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.put("/:userId", userController.updateUserDetails);

export default router;
