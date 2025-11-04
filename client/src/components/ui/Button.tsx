"use client";
import { motion } from "framer-motion";
import { springy } from "@/lib/motion";
import { ComponentProps } from "react";

export default function Button(props: ComponentProps<"button">) {
  const { className = "", children, ...rest } = props;
  return (
    <motion.button
      {...springy}
      className={`rounded-xl px-4 py-2 text-sm font-medium bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
