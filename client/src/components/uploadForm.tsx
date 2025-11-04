"use client";

import { useState } from "react";
import * as ExifReader from "exifreader";

export default function UploadForm() {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    date: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Convert DMS (degrees, minutes, seconds) to decimal
  const dmsToDecimal = (dms, ref) => {
    if (!dms) return null;
    const decimal = dms[0] + dms[1] / 60 + dms[2] / 3600;
    return ref === "S" || ref === "W" ? -decimal : decimal;
  };

  const getAddressFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      return data.display_name || "";
    } catch (error) {
      return "";
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));

    try {
      const tags = await ExifReader.load(file);
      console.log(tags);
      
      const imageDate = tags["DateTimeOriginal"]?.description;
      const lat = tags["GPSLatitude"]?.description;
      const lon = tags["GPSLongitude"]?.description;
      const latRef = tags["GPSLatitudeRef"]?.value;
      const lonRef = tags["GPSLongitudeRef"]?.value;

      let location = formData.location;
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
    } catch (error) {
      console.error("Error reading EXIF:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { ...formData, imageFile });
    alert("Photo uploaded (mock)!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-800 space-y-5"
    >
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        Upload a Photo
      </h2>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-zinc-600 dark:text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-zinc-100 dark:file:bg-zinc-800 file:text-zinc-700 dark:file:text-zinc-300 hover:file:bg-zinc-200 dark:hover:file:bg-zinc-700"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-3 w-full h-56 object-cover rounded-lg border border-zinc-200 dark:border-zinc-800"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Add a short description..."
          className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Auto-fetched from photo (editable)"
          className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium transition hover:bg-zinc-700 dark:hover:bg-zinc-300"
      >
        Upload Photo
      </button>
    </form>
  );
}
