import { Router } from "express";
import { getUserById } from "../controllers/userControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/users/:id", protectRoute, getUserById);


export default userRouter;