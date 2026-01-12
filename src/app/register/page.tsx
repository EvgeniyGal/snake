"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions/auth";
import Link from "next/link";

export default function RegisterPage() {
    const [state, action, isPending] = useActionState(registerAction, null);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
            <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-xl">
                <h2 className="text-center text-3xl font-bold tracking-tight text-emerald-500">
                    Create Account
                </h2>
                <form action={action} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                Username
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {state?.error && (
                        <p className="text-center text-sm text-red-500">{state.error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isPending ? "Creating account..." : "Register"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-emerald-500 hover:text-emerald-400">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
