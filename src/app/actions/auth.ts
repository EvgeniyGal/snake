"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export async function registerAction(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Missing fields" };
    }

    try {
        const existing = await db.query.users.findFirst({
            where: eq(users.email, email)
        });

        if (existing) {
            return { error: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insert(users).values({
            name, // can be null if not provided
            email,
            password: hashedPassword,
            role: "user"
        });
    } catch (e) {
        console.error(e);
        return { error: "Database error" };
    }

    // Attempt login
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        });
    } catch (e) {
        if ((e as Error).message.includes("NEXT_REDIRECT")) {
            throw e; // Re-throw redirect
        }
        return { error: "Login failed after registration" };
    }

    return { success: true };
}

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        });
    } catch (error) {
        if ((error as Error).message.includes("NEXT_REDIRECT")) {
            throw error;
        }
        return { error: "Invalid credentials" };
    }
    return { success: true };
}
