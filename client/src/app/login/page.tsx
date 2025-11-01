"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      login(res.token, res.user);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
        <h1 className="text-2xl font-semibold text-center">
          Join the journey
        </h1>
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 dark:text-zinc-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-600 dark:text-zinc-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium py-2 rounded-lg hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
