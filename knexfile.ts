import { Knex } from "knex";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const config: Knex.Config = {
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST || "127.0.0.1",
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "ordem_paranormal"
    },
    migrations: {
        directory: path.resolve(__dirname, "src", "database", "migrations"),
        extension: "ts"
    }
};

export default config;
