import { Router } from "express";
import { AuthenticationController } from "../controllers";

const authRoutes = Router();
const authenticationController = new AuthenticationController();

authRoutes.post("/register", authenticationController.register);
authRoutes.post("/login", authenticationController.login);
authRoutes.post(
  "/recovery-password/confirm-email",
  authenticationController.confirmEmail
);
authRoutes.post(
  "/recovery-password/new-password",
  authenticationController.newPassword
);

export { authRoutes };
