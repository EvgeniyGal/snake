import { db } from "./index";
import { users } from "./schema";

async function main() {
    console.log("Seeding database...");

    try {
        await db.insert(users).values({
            name: "Admin",
            email: "admin@example.com",
            role: "admin",
            password: "admin",
        });
        console.log("Admin created");
    } catch (e) {
        console.error("Error seeding:", e);
    }

    console.log("Seeding complete");
}

main();
