"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { scores } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function submitScoreAction(score: number) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return { error: "Not authenticated" };
    }

    try {
        await db.insert(scores).values({
            userId: session.user.id,
            score,
        });
        revalidatePath("/");
        return { success: true };
    } catch (e) {
        return { error: "Failed to save score" };
    }
}
