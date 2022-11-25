import { Router } from "express";

import { authenticationMiddleware } from "../../security/middlewares/authentication";
import { UserController } from "../controllers/User";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  "/",
  authenticationMiddleware,
  userController.findById.bind(userController)
);
userRouter.put(
  "/",
  authenticationMiddleware,
  userController.update.bind(userController)
);
userRouter.delete(
  "/",
  authenticationMiddleware,
  userController.delete.bind(userController)
);

export { userRouter };
