import * as dotenv from "dotenv";

// configure the environment
dotenv.config({ path: `bin/.env.${process.env.NODE_ENV}` });

export const CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.PORT,
}