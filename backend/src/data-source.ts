import { DataSource } from "typeorm";
import { AppConstants } from "./config/AppConstants";

export const appDataSource = new DataSource({
  type: "postgres",
  host: AppConstants.db.host,
  port: 5432,
  username: AppConstants.db.user,
  password: AppConstants.db.password,
  database: AppConstants.db.name,
  entities: ["src/domain/entity/**/*.ts"],
  migrations: ["src/infrastructure/migrations/**/*.ts"],
  migrationsTableName: "migrations",
  logging: false,
  synchronize: true,
});
