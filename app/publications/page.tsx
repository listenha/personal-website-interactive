import Sidebar from "@/components/layout/Sidebar";
import ArchiveItem from "@/components/content/ArchiveItem";
import { getMarkdownFiles } from "@/lib/markdown";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: `Publications - ${siteConfig.title}`,
  description: `Publications by ${siteConfig.name}`,
};

export default async function PublicationsPage() {
  const publications = await getMarkdownFiles("publications");

  // Group by category if publication categories are defined
  const categories = siteConfig.publicationCategory
    ? Object.keys(siteConfig.publicationCategory)
    : [];

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
                Publications
              </h1>
              {siteConfig.author.googlescholar && (
                <div className="wordwrap mb-4 text-gray-700 dark:text-gray-300">
                  You can also find my articles on{" "}
                  <a
                    href={siteConfig.author.googlescholar}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    my Google Scholar profile
                  </a>
                  .
                </div>
              )}
            </header>
            <section className="page__content">
              {categories.length > 0 ? (
                categories.map((categoryKey) => {
                  const categoryPublications = publications.filter(
                    (pub) => pub.frontmatter.category === categoryKey
                  );
                  if (categoryPublications.length === 0) return null;
                  const categoryTitle =
                    siteConfig.publicationCategory?.[categoryKey]?.title ||
                    categoryKey;

                  return (
                    <div key={categoryKey} className="mb-8">
                      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                        {categoryTitle}
                      </h2>
                      <hr className="mb-4 border-gray-300 dark:border-gray-700" />
                      {categoryPublications.map((pub) => (
                        <ArchiveItem key={pub.slug} item={pub} />
                      ))}
                    </div>
                  );
                })
              ) : (
                publications.map((pub) => (
                  <ArchiveItem key={pub.slug} item={pub} />
                ))
              )}
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}

