import express from "express";
const app = express();

// Middlewares
app.use(express.json());

export { app };
