import GameBoard from "@/components/game/GameBoard";
import { Leaderboard } from "@/components/game/Leaderboard";
import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-950 text-white">
      <header className="w-full flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-emerald-500">🐍 Snake</h1>
        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <span className="text-emerald-300">{session.user?.name}</span>
              <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}>
                <button type="submit" className="text-sm text-gray-400 hover:text-white border border-gray-700 px-3 py-1 rounded">Sign Out</button>
              </form>
            </>
          ) : (
            <Link href="/login" className="text-sm font-semibold text-emerald-500 hover:text-emerald-400 border border-emerald-900 px-3 py-1 rounded hover:bg-emerald-900/50">
              Sign In
            </Link>
          )}
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center w-full py-8 gap-8">
        <GameBoard />
        <Leaderboard />
      </div>
    </main>
  );
}
