import { Router } from "express";
import { userController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/", userController.save);
userRouter.get("/:userId", userController.findById);
userRouter.delete("/:userId", userController.delete);
userRouter.put("/:userId", userController.update);

export { userRouter };
