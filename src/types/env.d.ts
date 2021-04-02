declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string | undefined;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}
