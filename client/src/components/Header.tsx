"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  if (loading) return null;

  return (
    <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          <span className="italic font-light text-zinc-500 dark:text-zinc-400">
            Lens
          </span>{" "}
          <span>to world</span>
        </h1>

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/upload"
              className="px-5 py-2 text-sm font-medium rounded-lg 
                         bg-zinc-900 text-zinc-100 
                         dark:bg-zinc-100 dark:text-zinc-900 
                         hover:bg-zinc-800 dark:hover:bg-zinc-200 
                         transition-all duration-200"
            >
              Upload
            </Link>

            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="px-4 py-2 text-sm font-medium rounded-lg
                         border border-zinc-300 dark:border-zinc-700
                         text-zinc-700 dark:text-zinc-300
                         hover:bg-zinc-100 dark:hover:bg-zinc-800
                         transition-all duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-medium rounded-lg 
                       bg-zinc-100 text-zinc-900 
                       dark:bg-zinc-900 dark:text-zinc-100 
                       hover:bg-zinc-200 dark:hover:bg-zinc-800 
                       transition-all duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
