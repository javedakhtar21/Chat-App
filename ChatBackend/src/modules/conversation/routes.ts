import { Router } from "express";
import { ConversationController } from "./controller";

const router = Router();

router.get("/", ConversationController.getConversations);
router.post("/", ConversationController.createConversation);

export { router as ConversationRouter };