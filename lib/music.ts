import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MusicEntry } from "./music-types";

export type { MusicEntry } from "./music-types";

const contentDirectory = path.join(process.cwd(), "content", "misc", "music");

export function getMusicEntries(): MusicEntry[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const entries = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");

      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        memory: data.memory || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        videoUrl: data.videoUrl || "",
        thumbnail: data.thumbnail,
        duration: data.duration,
        content,
      };
    });

  // Sort by date (newest first)
  return entries.sort((a, b) => {
    const dateA = String(a.date || "1900-01-01");
    const dateB = String(b.date || "1900-01-01");
    return dateB.localeCompare(dateA);
  });
}

export function getAllTags(): string[] {
  const entries = getMusicEntries();
  const tagSet = new Set<string>();
  entries.forEach((entry) => {
    entry.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function getEntriesByTag(tag: string): MusicEntry[] {
  if (!tag) return getMusicEntries();
  return getMusicEntries().filter((entry) => entry.tags.includes(tag));
}

export { formatDate } from "./music-types";

