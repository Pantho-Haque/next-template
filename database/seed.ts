import { promises as fs, readdirSync } from "fs";
import path from "path";
import { db } from "./db";

export async function runSeeds() {
  try {
    const seedsDirectory = path.join(__dirname, "seeds");

    // Check if seeds directory exists
    try {
      await fs.access(seedsDirectory);
    } catch {
      console.log("⚠️  No seeds directory found, skipping seeding");
      return;
    }

    const seedFiles = readdirSync(seedsDirectory)
      .filter((file) => file.endsWith(".ts"))
      .sort(); // Run seeds in order

    for (const file of seedFiles) {
      try {
        const seed = await import(path.join(seedsDirectory, file));
        if (seed.seed) {
          await seed.seed(db);
          console.log(`✅ Seeded data from: ${file}`);
        }
      } catch (error) {
        console.error(`❌ Error seeding from ${file}:`, error);
        throw error;
      }
    }
  } catch (error) {
    console.error("❌ Error running seeds:", error);
    throw error;
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  runSeeds().then(() => {
    console.log('Seeding completed');
    db.destroy();
  }).catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
}