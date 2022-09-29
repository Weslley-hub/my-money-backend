import * as dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "dev";
dotenv.config({ path: `${__dirname}/../../.${NODE_ENV}.env` });
