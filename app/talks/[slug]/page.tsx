import Sidebar from "@/components/layout/Sidebar";
import { getMarkdownBySlug, getMarkdownFiles, formatDate } from "@/lib/markdown";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const talks = await getMarkdownFiles("talks");
  return talks.map((talk) => ({
    slug: talk.slug,
  }));
}

export default async function TalkPage({
  params,
}: {
  params: { slug: string };
}) {
  const talk = await getMarkdownBySlug("talks", params.slug);

  if (!talk) {
    notFound();
  }

  const { frontmatter, htmlContent } = talk;

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
              {frontmatter.type && frontmatter.venue && frontmatter.date && (
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {frontmatter.type}, <i>{frontmatter.venue}</i>,{" "}
                  {formatDate(frontmatter.date)}
                </p>
              )}
            </header>
            <section
              className="page__content prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            {(frontmatter.slidesurl || frontmatter.videourl) && (
              <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 space-x-2">
                {frontmatter.slidesurl && (
                  <a
                    href={frontmatter.slidesurl}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Download Slides
                  </a>
                )}
                {frontmatter.videourl && (
                  <>
                    {frontmatter.slidesurl && " | "}
                    <a
                      href={frontmatter.videourl}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Watch Video
                    </a>
                  </>
                )}
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}

