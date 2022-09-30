import express from "express";
import { userRouter } from "./modules/user/routes/user.route";
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);

export { app };
