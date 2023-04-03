import { Router } from "express";
import authRoutes from "./authRoutes.js";
import schedulesRoutes from "./schedulesRoutes.js";

const routes = Router();

routes.get("/",(req,res)=>{res.status(200).send("drivencare_API gcg.co")});

routes.use("/users", authRoutes)
routes.use("/schedules", schedulesRoutes)

export default routes