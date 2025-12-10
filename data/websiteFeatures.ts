export interface WebsiteFeature {
  id: string;
  title: string;
  description: string;
  url?: string; // If provided, it's a current feature with a link
  icon?: string; // Optional icon name or emoji
  status: "current" | "coming-soon";
  category?: string; // Optional category for grouping
}

export const websiteFeatures: WebsiteFeature[] = [
  {
    id: "music-notebook",
    title: "Music Memory Notebook",
    description: "",
    url: "/misc/music/",
    icon: "🎹",
    status: "current",
    category: "Interactive Content",
  },
  {
    id: "reading-notes",
    title: "Reading Notes",
    description: "Thoughts and reflections on books and movies I've encountered. Coming soon with curated recommendations",
    icon: "📚",
    status: "coming-soon",
    category: "Content",
  },
  {
    id: "tech-news",
    title: "Tech News Aggregation",
    description: "An auto curated feed of recent technology news and developments that catch my attention. Stay tuned for weekly updates!",
    icon: "📰",
    status: "coming-soon",
    category: "Content",
  },
];

