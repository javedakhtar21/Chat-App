import { Router } from "express";
import stateController from "./controller";

const router = Router();

router.post("/", stateController.createState);
router.get("/", stateController.getStates);

export { router as stateRouter };
