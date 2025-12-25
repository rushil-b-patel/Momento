"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerChildren } from "@/lib/motion";
import Card from "./Card";
import { Calendar, Filter } from "lucide-react";
import { Popover } from "@headlessui/react";

interface Photo {
  imageUrl: string;
  description: string;
  location?: string;
  date?: string;
}

interface FeedProps {
  posts: Photo[];
}

export default function Feed({ posts }: FeedProps) {
  const [filters, setFilters] = useState<{ year: string | null; month: string | null }>({
    year: null,
    month: null,
  });

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (!post.date) return true;
      const postDate = new Date(post.date);
      const matchesYear = filters.year ? postDate.getFullYear().toString() === filters.year : true;
      const matchesMonth = filters.month
        ? postDate.toLocaleString("default", { month: "long" }) === filters.month
        : true;
      return matchesYear && matchesMonth;
    });
  }, [posts, filters]);

  const years = Array.from(
    new Set(
      posts
        .filter((p) => p.date)
        .map((p) => new Date(p.date!).getFullYear().toString())
    )
  ).sort((a, b) => parseInt(b) - parseInt(a));

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex flex-wrap justify-center sm:justify-start gap-3">
        <InlineFilter
          label="Year"
          icon={<Filter size={14} />}
          options={years}
          selected={filters.year}
          onSelect={(v) => setFilters({ ...filters, year: v === filters.year ? null : v })}
        />
        <InlineFilter
          label="Month"
          icon={<Calendar size={14} />}
          options={months}
          selected={filters.month}
          onSelect={(v) => setFilters({ ...filters, month: v === filters.month ? null : v })}
        />
      </div>

      <FeedSection posts={filteredPosts} />
    </div>
  );
}

function InlineFilter({
  label,
  icon,
  options,
  selected,
  onSelect,
}: {
  label: string;
  icon: React.ReactNode;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <Popover className="relative">
      <Popover.Button
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition ${
          selected
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
        }`}
      >
        {icon}
        <span>{label}</span>
      </Popover.Button>

      <Popover.Panel className="absolute mt-2 left-0 z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-3 w-40">
        <div className="flex flex-col gap-1 max-h-[250px] overflow-y-auto">
          {options.map((opt) => (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(opt)}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition ${
                selected === opt
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
}

function FeedSection({ posts }: { posts: Photo[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={staggerChildren}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col gap-12"
    >
      {posts.length > 0 ? (
        posts.map((post, i) => <Card key={i} {...post} />)
      ) : (
        <p className="text-center text-zinc-500 mt-10">No posts found.</p>
      )}
    </motion.div>
  );
}
