import { Router } from "express";
import cityController from "./controller";

const router = Router();
router.post("/", cityController.createCity);
router.get("/", cityController.getCities);
router.get("/state/:stateId", cityController.getCitiesByState);

export { router as cityRouter };
