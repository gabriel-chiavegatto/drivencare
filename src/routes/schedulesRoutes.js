import { Router } from "express";
import schedulesControllers from "../controllers/schedulesControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const schedulesRoutes = Router()

schedulesRoutes.post("/provide", authMiddleware.authValidation, schedulesControllers.provideSchedule)



export default schedulesRoutes