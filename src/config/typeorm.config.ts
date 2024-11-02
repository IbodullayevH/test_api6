import "reflect-metadata"
import { DataSource } from "typeorm";
import "dotenv/config";
import * as entities from '../entities';

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: true,
    logging: false,
    entities: Object.values(entities),
    subscribers: [],
    migrations: [],
});
