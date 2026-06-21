import { Router } from "express";
import { MessageController } from "./controller";

const router = Router();

router.get("/conversation/:conversationId", MessageController.getMessages);

export { router as MessageRouter };
