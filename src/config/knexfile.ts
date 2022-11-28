import Path from "path";
import "./env";

const migrationsPath = [__dirname, "..", "database", "migrations"];
const resolvedMigrationsPath = Path.resolve(...migrationsPath);

module.exports = {
  development: {
    client: "pg",

    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    },

    migrations: {
      directory: resolvedMigrationsPath
    }
  }
};
