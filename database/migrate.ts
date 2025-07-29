// database/migrate.ts
import { db } from "@/database/db";
import "dotenv/config";
import { promises as fs } from "fs";
import { FileMigrationProvider, Migrator } from "kysely";
import * as path from "path";

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.resolve(__dirname, "migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`Migration "${it.migrationName}" executed successfully`);
    } else if (it.status === "Error") {
      console.error(`Failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("Failed to migrate:", error);
    process.exit(1);
  }

  await db.destroy();
}

export async function resetMigrations() {
  try {
    console.log("Resetting all migrations...");

    const migrator = new Migrator({
      db,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.resolve(__dirname, "migrations"),
      }),
    });

    // Get all executed migrations
    const executedMigrations = await migrator.getMigrations();
    console.log(`Found ${executedMigrations.length} executed migrations`);

    // Migrate down to the beginning (removes all migrations)
    const { error, results } = await migrator.migrateTo("NO_MIGRATIONS");

    results?.forEach((it) => {
      if (it.status === "Success") {
        console.log(`Rolled back migration "${it.migrationName}"`);
      } else if (it.status === "Error") {
        console.error(`Failed to rollback migration "${it.migrationName}"`);
      }
    });

    if (error) {
      console.error("Failed to reset migrations:", error);
      throw error;
    }

    console.log("All migrations reset successfully!");
  } catch (error) {
    console.error("Error resetting migrations:", error);
    throw error;
  } finally {
    await db.destroy();
  }
}

// Check command line arguments
const command = process.argv[2];

if (command === "reset") {
  resetMigrations()
    .then(() => {
      console.log("Migration reset completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration reset failed:", error);
      process.exit(1);
    });
} else {
  migrateToLatest()
    .then(() => {
      console.log("Migration to latest completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}
