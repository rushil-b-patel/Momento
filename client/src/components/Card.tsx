"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarClock, LocateFixed, X } from "lucide-react";

interface CardProps {
  imageUrl: string;
  description: string;
  location?: string;
  date?: string;
}

export default function Card({ imageUrl, description, location, date }: CardProps) {
  const [showLocation, setShowLocation] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const locationRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setShowLocation(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className="flex flex-col rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 
                 bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-md"
      >
        <div className="relative w-full overflow-hidden">
          <img
            src={imageUrl}
            alt="photo"
            className="object-contain w-full h-auto max-h-[80vh] transition-all duration-500 cursor-zoom-in select-none"
            onClick={() => setShowModal(true)}
          />

            <div ref={dateRef} className="absolute top-3 left-3">
            {showDate && date ? (
                <span
                className="px-3 py-1 text-xs font-medium bg-black/60 text-white rounded-full backdrop-blur-sm"
                >
                {date}
                </span>
            ) : (
                date && (
                <button
                    onClick={() => setShowDate(true)}
                    className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition opacity-50"
                >
                    <CalendarClock size={16} />
                </button>
                )
            )}
            </div>

            <div ref={locationRef} className="absolute top-3 right-3">
            {showLocation && location ? (
                <span
                className="px-3 py-1 text-xs font-medium bg-black/60 text-white rounded-full backdrop-blur-sm"
                >
                {location}
                </span>
            ) : (
                location && (
                <button
                    onClick={() => setShowLocation(true)}
                    className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition opacity-50"
                >
                    <LocateFixed size={16} />
                </button>
                )
            )}
            </div>
        </div>

        <div className="p-2 text-center">
          {description}
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <button
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
            onClick={() => setShowModal(false)}
          >
            <X size={20} />
          </button>

          <img
            src={imageUrl}
            alt="fullscreen"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
