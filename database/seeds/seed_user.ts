// seeds/seed_users.ts
import { db } from "@/database/db";

export async function seed() {
  // Check if users already exist
  const existingUsers = await db
    .selectFrom("users")
    .select("id")
    .limit(1)
    .executeTakeFirst();

  // Skip seeding if users already exist
  if (existingUsers) {
    console.log("Users already exist, skipping seed");
    return;
  }

  await db
    .insertInto("users")
    .values([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "password",
        role: "user",
        created_at: new Date(),
      },
      {
        id: 2,
        name: "pantho Smith",
        email: "jane@example.com",
        password: "password",
        role: "user",
        created_at: new Date(),
      },
    ])
    .execute();

  console.log("Seeded users table");
}
