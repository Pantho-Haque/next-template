// database/reset.ts
import { db } from "@/database/db";
import "dotenv/config";
import { sql } from "kysely";

async function resetDatabase() {
  try {
    console.log("🔄 Starting database reset...");

    // Get all table names
    const tables = await sql<{ tablename: string }>`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `.execute(db);

    if (tables.rows.length === 0) {
      console.log("✅ No tables found to drop");
      return;
    }

    console.log(
      `📋 Found ${tables.rows.length} tables:`,
      tables.rows.map((t) => t.tablename)
    );

    // Drop all tables in correct order (handle dependencies)
    for (const table of tables.rows) {
      console.log(`🗑️  Dropping table: ${table.tablename}`);
      await sql`DROP TABLE IF EXISTS ${sql.id(
        table.tablename
      )} CASCADE`.execute(db);
    }

    console.log("✅ All tables dropped successfully!");

    // Verify cleanup
    const remainingTables = await sql<{ tablename: string }>`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `.execute(db);

    console.log(`📊 Remaining tables: ${remainingTables.rows.length}`);

  } catch (error) {
    console.error("❌ Error resetting database:", error);
    throw error;
  } finally {
    await db.destroy();
  }
}

// Run if called directly
if (require.main === module) {
  resetDatabase()
    .then(() => {
      console.log("🎉 Database reset completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Database reset failed:", error);
      process.exit(1);
    });
}

export { resetDatabase };
