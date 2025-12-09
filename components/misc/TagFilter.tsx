"use client";

import { MusicEntry } from "@/lib/music-types";

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  onTagClick: (tag: string | null) => void;
  entries: MusicEntry[];
}

export default function TagFilter({ tags, activeTag, onTagClick, entries }: TagFilterProps) {
  const getTagCount = (tag: string) => {
    return entries.filter((entry) => entry.tags.includes(tag)).length;
  };

  return (
    <div className="tag-filter mb-8 flex flex-wrap gap-3 justify-center items-center">
      <button
        onClick={() => onTagClick(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          activeTag === null
            ? "bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 shadow-md"
            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        View All ({entries.length})
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTag === tag
              ? "bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 shadow-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {tag} ({getTagCount(tag)})
        </button>
      ))}
    </div>
  );
}

