import Path from "path";
import * as dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "dev";

const envFilePath = [`${__dirname}`, "..", "..", `.${NODE_ENV}.env`];
const envFileResolvedPath = Path.resolve(...envFilePath);

dotenv.config({
  path: envFileResolvedPath,
});
