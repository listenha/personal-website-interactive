import { getMusicEntries, getAllTags } from "@/lib/music";
import MusicIntro from "@/components/misc/MusicIntro";
import MusicPageClient from "@/components/misc/MusicPageClient";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: `Music - ${siteConfig.title}`,
  description: `Music memory notebook of ${siteConfig.name}`,
};

export default function MusicPage() {
  const allEntries = getMusicEntries();
  const allTags = getAllTags();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-4">
            Music Memory Notebook
          </h1>
          <MusicIntro />
        </header>

        <MusicPageClient entries={allEntries} tags={allTags} />
      </div>
    </div>
  );
}

