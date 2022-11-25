import express from "express";

import { userRouter } from "./modules/user/routes/user.route";
import { authRoutes } from "./modules/authentication/routes/authentication.routes";
import { cardRouter } from "./modules/card/routes/card.routes";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cards", cardRouter);

export { app };
