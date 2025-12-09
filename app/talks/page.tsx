import Sidebar from "@/components/layout/Sidebar";
import ArchiveItem from "@/components/content/ArchiveItem";
import { getMarkdownFiles } from "@/lib/markdown";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: `Talks - ${siteConfig.title}`,
  description: `Talks and presentations by ${siteConfig.name}`,
};

export default async function TalksPage() {
  const talks = await getMarkdownFiles("talks");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Sidebar showAuthorProfile={true} />
        </div>
        <div className="lg:col-span-3">
          <article className="page">
            <header className="mb-6">
              <h1 className="page__title text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Talks
              </h1>
            </header>
            <section className="page__content">
              {talks.map((talk) => (
                <ArchiveItem key={talk.slug} item={talk} />
              ))}
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}

