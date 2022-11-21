import Knex from "knex";
import "../config/env.config";

function getConnection() {
  return Knex({
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
  });
}

async function initializeDatabase() {
  const connection = getConnection();
  const res = await connection.raw(
    `SELECT datname FROM pg_database WHERE datname = '${process.env.DB_NAME}'`
  );

  if (res.rowCount <= 0) {
    console.info("[INFO] Creating database...");
    await connection.raw(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.info("[INFO] Database has been created  ✔");
  }

  connection.destroy();
}

export { initializeDatabase };
