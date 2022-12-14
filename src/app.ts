import express from "express";

import { authenticationMiddleware } from "./modules/security/middlewares";

import { userRouter } from "./modules/user/routes";
import { authRoutes } from "./modules/authentication/routes";
import { creditCardRouter } from "./modules/creditCard/routes";
import { debitCardRouter } from "./modules/debitCard/routes";

import { expenseCategoryRouter } from "./modules/expense-category/routes";
import { revenueRouter } from "./modules/revenue/routes";
import { expenseRouter } from "./modules/expenses/routes";
const cors = require("cors");
const app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Middlewares
app.use(express.json());
// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/credit-cards", authenticationMiddleware, creditCardRouter);
app.use("/api/v1/debit-cards", authenticationMiddleware, debitCardRouter);

app.use(
  "/api/v1/expense-categories",
  authenticationMiddleware,
  expenseCategoryRouter
);
app.use("/api/v1/revenues", authenticationMiddleware, revenueRouter);
app.use("/api/v1/expenses", authenticationMiddleware, expenseRouter);

export { app };
