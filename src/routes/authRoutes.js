import { Router } from "express"
import userController from "../controllers/userControllers.js"
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import { userSchema } from "../schemas/userSchema.js";
import { loginSchema } from "../schemas/loginSchema.js";


const authRoutes = Router();

authRoutes.post("/signup", validateSchema(userSchema) ,userController.create)
authRoutes.post("/signin", validateSchema(loginSchema), userController.login)

export default authRoutes