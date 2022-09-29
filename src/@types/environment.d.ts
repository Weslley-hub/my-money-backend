declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "dev" | "prd";
    SERVER_PORT: number;
  }
}
