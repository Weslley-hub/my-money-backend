import express from "express";
import SwaggerUI from "swagger-ui-express";

import { swaggerBasicInfo } from "./docs";
import { userRouter } from "./modules/user/routes/user.route";

const app = express();

// Middlewares
app.use(express.json());
// app.use(jwt);

// Documentation
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerBasicInfo));

// Routes
app.use("/api/v1/users", userRouter);

export { app };
