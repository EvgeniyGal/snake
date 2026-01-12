import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: DrizzleAdapter(db) as any,
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const user = await db.query.users.findFirst({
                        where: eq(users.email, credentials.email as string)
                    });

                    if (!user || !user.password) return null;

                    let passwordsMatch = false;
                    // Handle bcrypt vs plain text for seeded admin
                    if (user.password.startsWith("$2")) {
                        passwordsMatch = await bcrypt.compare(
                            credentials.password as string,
                            user.password
                        );
                    } else {
                        passwordsMatch = user.password === credentials.password;
                    }

                    if (passwordsMatch) return { ...user, role: user.role ?? "user" };
                } catch (e) {
                    console.error("Auth error:", e);
                }
                return null;
            },
        }),
    ],
})
