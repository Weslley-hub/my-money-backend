import express, { Request, Response } from "express";
import SwaggerUI from "swagger-ui-express";
import { swaggerBasicInfo } from "./docs";
import { userRouter } from "./modules/user/routes/user.route";
import { authRoutes } from "./modules/authentication/routes/authentication.routes";
const app = express();

// Middlewares
app.use(express.json());
// app.use(jwt);

// Documentation
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerBasicInfo));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRoutes);

export { app };
