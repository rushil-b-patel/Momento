"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as ExifReader from "exifreader";
import Button from "@/components/ui/Button";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function UploadWizard() {
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    date: "",
  });
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const dmsToDecimal = (dms: any, ref: string) => {
    if (!dms) return null;
    const decimal = dms[0] + dms[1] / 60 + dms[2] / 3600;
    return ref === "S" || ref === "W" ? -decimal : decimal;
  };

  const getAddressFromCoords = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      return data.display_name || "";
    } catch {
      return "";
    }
  };

  const handleFileChange = async (file: File) => {
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));

    try {
      const tags = await ExifReader.load(file);
      const lat = tags["GPSLatitude"]?.description;
      const lon = tags["GPSLongitude"]?.description;
      const latRef = tags["GPSLatitudeRef"]?.value;
      const lonRef = tags["GPSLongitudeRef"]?.value;

      let location = "";
      if (lat && lon && latRef && lonRef) {
        const decimalLat = dmsToDecimal(lat, latRef);
        const decimalLon = dmsToDecimal(lon, lonRef);
        location = await getAddressFromCoords(decimalLat, decimalLon);
      }

      const dateTaken =
        tags["DateTimeOriginal"]?.description ||
        tags["CreateDate"]?.description ||
        "";

      setFormData((prev) => ({
        ...prev,
        location: location || prev.location,
        date: dateTaken
          ? dateTaken.split(" ")[0].replace(/:/g, "-")
          : prev.date,
      }));

      setStep(2);
    } catch (err) {
      console.error("EXIF error:", err);
      setStep(2);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleUpload = async () => {
    if (!imageFile) return;
    setStep(3);
    setProgress(0);
    for (let i = 0; i <= 100; i++) {
      await new Promise((r) => setTimeout(r, 20));
      setProgress(i);
    }
    setDone(true);
    setTimeout(() => {
      setStep(1);
      setDone(false);
      setPreview(null);
      setImageFile(null);
      setFormData({ description: "", location: "", date: "" });
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-zinc-400 dark:border-zinc-700 rounded-2xl cursor-pointer hover:border-zinc-600 transition"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFileChange(e.target.files[0])
              }
            />
            <label htmlFor="fileInput" className="cursor-pointer">
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                Drag & drop or click to upload
              </p>
            </label>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full flex flex-col gap-8"
          >
            {preview && (
              <div className="relative w-full">
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-2xl w-full object-cover max-h-[85vh] sm:max-h-[75vh]"
                />
              </div>
            )}

            <div className="w-full flex flex-col gap-6">
              <textarea
                placeholder="Write a short description..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-none text-base sm:text-lg"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 border rounded-lg p-3 border-zinc-300 dark:border-zinc-700">
                  <MapPin size={18} />
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="bg-transparent w-full focus:outline-none text-sm sm:text-base"
                  />
                </div>
                <div className="flex items-center gap-2 border rounded-lg p-3 border-zinc-300 dark:border-zinc-700">
                  <Calendar size={18} />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="bg-transparent w-full focus:outline-none text-sm sm:text-base"
                  />
                </div>
              </div>

              <Button className="w-full py-3 text-base" onClick={handleUpload}>
                Upload
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6 py-10 w-full"
          >
            {!done ? (
              <>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  Uploading your photo...
                </p>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-zinc-900 dark:bg-zinc-100"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut", duration: 0.1 }}
                  />
                </div>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-3"
              >
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <p className="text-lg font-medium text-green-600">
                  Upload complete!
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
