import Sidebar from "@/components/layout/Sidebar";
import { getMarkdownBySlug, getMarkdownFiles, formatDate } from "@/lib/markdown";
import { siteConfig } from "@/data/siteConfig";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const publications = await getMarkdownFiles("publications");
  return publications.map((pub) => ({
    slug: pub.slug,
  }));
}

export default async function PublicationPage({
  params,
}: {
  params: { slug: string };
}) {
  const publication = await getMarkdownBySlug("publications", params.slug);

  if (!publication) {
    notFound();
  }

  const { frontmatter, htmlContent } = publication;

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
                {frontmatter.title}
              </h1>
              {frontmatter.venue && frontmatter.date && (
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Published in <i>{frontmatter.venue}</i>,{" "}
                  {formatDate(frontmatter.date)}
                </p>
              )}
            </header>
            <section
              className="page__content prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            {(frontmatter.citation ||
              frontmatter.paperurl ||
              frontmatter.slidesurl ||
              frontmatter.bibtexurl) && (
              <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                {frontmatter.citation && (
                  <p className="mb-2">
                    Recommended citation: {frontmatter.citation}
                  </p>
                )}
                <div className="space-x-2">
                  {frontmatter.paperurl && (
                    <a
                      href={frontmatter.paperurl}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Download Paper
                    </a>
                  )}
                  {frontmatter.slidesurl && (
                    <>
                      {frontmatter.paperurl && " | "}
                      <a
                        href={frontmatter.slidesurl}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Download Slides
                      </a>
                    </>
                  )}
                  {frontmatter.bibtexurl && (
                    <>
                      {(frontmatter.paperurl || frontmatter.slidesurl) && " | "}
                      <a
                        href={frontmatter.bibtexurl}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Download Bibtex
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}

