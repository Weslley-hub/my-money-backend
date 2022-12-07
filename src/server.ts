import "./config/env";

import { app } from "./app";
import { initializeDatabase } from "./database";

async function initializeApp() {
  try {
    await initializeDatabase();
    startServer();
    fetch("http://localhost:5173/gfg-articles")
      .then((res) => res.json())
      .then((gfg_articles) => console.log(gfg_articles));
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
