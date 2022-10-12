import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.save.bind(userController));
userRouter.get("/:userId", userController.findById.bind(userController));
userRouter.delete("/:userId", userController.delete.bind(userController));
userRouter.put("/:userId", userController.update.bind(userController));

export { userRouter };
