declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "dev" | "prd";
    SERVER_PORT: number;

    BD_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_PORT: number;

    ENCRYPT_SALT: string;

    JWT_SECRET: string;
  }
}
