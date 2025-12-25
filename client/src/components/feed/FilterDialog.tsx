"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface FilterDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  filters: { year: string | null; month: string | null };
  setFilters: (value: { year: string | null; month: string | null }) => void;
  posts: { date?: string }[];
}

export default function FilterDialog({ open, setOpen, filters, setFilters, posts }: FilterDialogProps) {
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

  const handleSelect = (type: "year" | "month", value: string | null) => {
    setFilters({ ...filters, [type]: value });
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                  Filter by Date
                </Dialog.Title>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2 text-center">
                    Year
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {years.map((year) => (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        key={year}
                        onClick={() =>
                          handleSelect("year", filters.year === year ? null : year)
                        }
                        className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                          filters.year === year
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {year}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2 text-center">
                    Month
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {months.map((month) => (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        key={month}
                        onClick={() =>
                          handleSelect("month", filters.month === month ? null : month)
                        }
                        className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                          filters.month === month
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {month.slice(0, 3)}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => setFilters({ year: null, month: null })}
                  className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                >
                  Reset
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg text-sm font-medium"
                >
                  Done
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
