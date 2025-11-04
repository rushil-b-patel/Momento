"use client";

import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { usePathname } from "next/navigation";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout">
      <motion.main
        key={pathname}
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="pt-20 min-h-screen px-4 sm:px-6 md:px-10"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
