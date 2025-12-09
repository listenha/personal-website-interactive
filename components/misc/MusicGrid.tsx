"use client";

import { useState } from "react";
import { MusicEntry } from "@/lib/music-types";
import VideoCard from "./VideoCard";

interface MusicGridProps {
  entries: MusicEntry[];
  timelineOrientation?: "vertical" | "horizontal";
}

export default function MusicGrid({ entries, timelineOrientation = "vertical" }: MusicGridProps) {
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">(timelineOrientation);

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>No recordings found.</p>
      </div>
    );
  }

  return (
    <div className="music-grid">
      {/* Timeline orientation toggle */}
      <div className="mb-6 flex justify-end">
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setOrientation("vertical")}
            className={`px-4 py-2 rounded text-sm font-medium transition-all ${
              orientation === "vertical"
                ? "bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Vertical
          </button>
          <button
            onClick={() => setOrientation("horizontal")}
            className={`px-4 py-2 rounded text-sm font-medium transition-all ${
              orientation === "horizontal"
                ? "bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            Horizontal
          </button>
        </div>
      </div>

      {/* Grid layout */}
      {orientation === "vertical" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((entry, index) => (
            <VideoCard
              key={entry.slug}
              entry={entry}
              timelineOrientation="vertical"
              isLast={index === entries.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {entries.map((entry, index) => (
            <VideoCard
              key={entry.slug}
              entry={entry}
              timelineOrientation="horizontal"
              isLast={index === entries.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

