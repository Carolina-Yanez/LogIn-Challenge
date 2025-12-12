declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production';
    PORT?: string;
    JWT_SECRET: string;
    JWT_EXPIRES: string;
  }
}
