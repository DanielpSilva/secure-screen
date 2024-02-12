import { appDataSource } from "../data-source";

export async function runMigrations() {
  try {
    await appDataSource.runMigrations();
  } catch (error) {
    console.error("Migration failed:", error);
    await appDataSource.destroy();
    process.exit(1);
  }
}
