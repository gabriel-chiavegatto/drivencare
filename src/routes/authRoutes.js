import { Router } from "express"
import userController from "../controllers/userControllers.js"
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import { userSchema } from "../schemas/userSchema.js";


const authRoutes = Router();

authRoutes.post("/", validateSchema(userSchema) ,userController.create)

export default authRoutes