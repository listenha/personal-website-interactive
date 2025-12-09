// Types for music entries that can be imported by client components
export interface MusicEntry {
  slug: string;
  title: string;
  date: string;
  memory: string;
  tags: string[];
  videoUrl: string;
  thumbnail?: string;
  duration?: string;
  content: string;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

