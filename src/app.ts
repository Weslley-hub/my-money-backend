import express from "express";

import { userRouter } from "./modules/user/routes";
import { authRoutes } from "./modules/authentication/routes";
import { cardRouter } from "./modules/card/routes";
import { expenseCategoryRouter } from "./modules/expense-category/routes";
import { authenticationMiddleware } from "./modules/security/middlewares";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cards", cardRouter);
app.use(
  "/api/v1/expense-categories",
  authenticationMiddleware,
  expenseCategoryRouter
);

export { app };
