"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, X } from "lucide-react";
import { fadeInUp } from "@/lib/motion";

interface CardProps {
  imageUrl: string;
  description: string;
  location?: string;
  date?: string;
}

export default function Card({ imageUrl, description, location, date }: CardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        variants={fadeInUp}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 bg-white/10 dark:bg-zinc-900/40 backdrop-blur-md"
      >
        <motion.img
          src={imageUrl}
          alt={description}
          className="object-cover w-full h-[70vh] sm:h-[60vh] md:h-[75vh] cursor-zoom-in"
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
        />

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-6">
          <p className="text-white text-lg sm:text-xl font-medium drop-shadow-lg">{description}</p>
          <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {location}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {date}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <button
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            <motion.img
              src={imageUrl}
              alt="fullscreen"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
