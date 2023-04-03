import { Router } from "express"
import userController from "../controllers/userControllers.js"

const authRoutes = Router();

authRoutes.post("/",userController.create)  

export default authRoutes