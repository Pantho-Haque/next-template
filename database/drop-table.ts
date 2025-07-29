import { readdirSync } from "fs";
import path from "path";
import { db } from "./db";

export async function dropAllTables() {
  try {
    // Get all migration files and run their down functions
    const migrationsDirectory = path.join(__dirname, "migrations");
    const migrationFiles = readdirSync(migrationsDirectory)
      .filter((file) => file.endsWith(".ts"))
      .sort()
      .reverse(); // Reverse order for dropping

    for (const file of migrationFiles) {
      try {
        const migration = await import(path.join(migrationsDirectory, file));
        if (migration.down) {
          await migration.down(db);
          console.log(`✅ Dropped tables from: ${file}`);
        }
      } catch (error) {
        console.log(`⚠️  Warning: Could not drop tables from ${file}:`, error);
      }
    }
  } catch (error) {
    console.error("❌ Error dropping tables:", error);
    throw error;
  }
}
