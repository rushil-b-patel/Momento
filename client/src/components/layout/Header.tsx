"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import useScrollDirection from "@/hooks/useScrollDirection";

export default function Header() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const direction = useScrollDirection();
  const [elevate, setElevate] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevate(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return null;

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: direction === "down" ? -80 : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6"
    >
      <div
        className={`max-w-7xl mx-auto mt-3 px-4 py-2 rounded-2xl backdrop-blur-xl
          bg-white/60 dark:bg-black/40 border border-zinc-200/60 dark:border-zinc-800/60
          flex items-center justify-between transition-shadow duration-300
          ${elevate ? "shadow-[0_8px_28px_rgba(0,0,0,0.08)]" : ""}`}
      >
        <Link href="/" className="flex items-center gap-2 select-none">
          <Camera className="w-5 h-5 text-zinc-800 dark:text-zinc-100" />
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Momento
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <NavLink href="/" label="Feed" />
          {user && <NavLink href="/upload" label="Upload" />}
          {user ? (
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Logout
            </button>
          ) : (
            <NavLink href="/login" label="Login" />
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg border border-zinc-300 dark:border-zinc-700"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed top-[80px] inset-x-0 z-40"
          >
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl rounded-2xl p-3"
              >
                <MobileLink href="/" label="Feed" onClick={() => setOpen(false)} />
                {user && <MobileLink href="/upload" label="Upload" onClick={() => setOpen(false)} />}
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                      router.push("/login");
                    }}
                    className="w-full mt-2 rounded-xl px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <MobileLink href="/login" label="Login" onClick={() => setOpen(false)} />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
    >
      {label}
    </Link>
  );
}

function MobileLink({ href, label, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-xl px-3 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
    >
      {label}
    </Link>
  );
}
