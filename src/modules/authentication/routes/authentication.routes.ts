import { Router } from "express";
import { AuthenticationController } from "../controllers/authentication.controllers";

const authRoutes = Router();
const authenticationController = new AuthenticationController();

authRoutes.post("/register", authenticationController.register);
authRoutes.post("/login", authenticationController.login);
authRoutes.post("/recoverypassword", authenticationController.passwordRecovery);

export { authRoutes };
