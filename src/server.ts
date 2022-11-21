import "./config/env.config";

import { app } from "./app";
import { initializeDatabase } from "./database";

async function initializeApp() {
  try {
    await initializeDatabase();
    startServer();
  } catch (error) {
    console.error("[ERROR] Initializing application error");
    console.error(error);
  }
}

function startServer() {
  const PORT = process.env.SERVER_PORT;
  app.listen(PORT, () =>
    console.log(`[INFO] Server running at port ${PORT} ✔`)
  );
}

initializeApp();
