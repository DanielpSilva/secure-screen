import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "admin",
  database: "hubbeappdb",
  entities: ["src/domain/entity/*.ts"],
  migrations: ["./src/infraestructure/database/migrations"],
  migrationsTableName: "custom_migration_table",
  logging: true,
  synchronize: true,
});
