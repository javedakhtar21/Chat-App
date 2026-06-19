import { Router } from "express";
import { UserConnectionController } from "./controller";
const router = Router();

router.get("/:userId", UserConnectionController.getConnectionDetails);

export { router as UserConnectionRouter };
