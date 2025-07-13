import { migrate } from "drizzle-orm/neon-http/migrator"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import { exit } from "process";

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

async function runmigration() {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const db = drizzle(sql);

        await migrate(db, {
            migrationsFolder: "./drizzle"
        });
        console.log("Migration completed successfully.");

        console.log("Migration completed successfully.");
    } catch (error) {
        console.error("Migration failed:", error);
        exit(1);
    }
}