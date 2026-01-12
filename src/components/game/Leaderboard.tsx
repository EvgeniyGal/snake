import { db } from "@/lib/db";
import { scores, users } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function Leaderboard() {
    const topScores = await db
        .select({
            name: users.name,
            score: sql<number>`MAX(${scores.score})`.as('max_score'),
        })
        .from(scores)
        .innerJoin(users, eq(scores.userId, users.id))
        .groupBy(scores.userId, users.name)
        .orderBy(desc(sql`max_score`))
        .limit(10);

    return (
        <div className="w-full max-w-md mt-8 p-4 bg-gray-900 rounded-lg border border-gray-800 shadow-lg">
            <h3 className="text-xl font-bold text-center text-emerald-500 mb-4">🏆 High Scores</h3>
            {topScores.length === 0 ? (
                <p className="text-center text-gray-500">No scores yet. Be the first!</p>
            ) : (
                <ul className="space-y-2">
                    {topScores.map((entry, i) => (
                        <li key={i} className="flex justify-between px-4 py-3 bg-gray-800/50 rounded hover:bg-gray-800 transition">
                            <span className="text-gray-300 flex items-center gap-2">
                                <span className={`text-sm w-5 h-5 flex items-center justify-center rounded-full ${i < 3 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                                    {i + 1}
                                </span>
                                {entry.name || 'Anonymous'}
                            </span>
                            <span className="font-mono text-emerald-400 font-bold">{entry.score}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
