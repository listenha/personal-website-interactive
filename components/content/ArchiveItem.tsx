import Link from "next/link";
import { MarkdownContent } from "@/lib/markdown";
import { formatDate, getYear } from "@/lib/markdown";

interface ArchiveItemProps {
  item: MarkdownContent;
  type?: "list" | "grid";
}

export default function ArchiveItem({ item, type = "list" }: ArchiveItemProps) {
  const { frontmatter, slug } = item;
  const collection = frontmatter.collection || "posts";
  const baseUrl = `/${collection}/${slug}`;

  return (
    <div className={`${type}__item mb-6`}>
      <article className="archive__item border-b border-gray-200 dark:border-gray-700 pb-6">
        <h2 className="archive__item-title text-xl font-semibold mb-2">
          <Link
            href={baseUrl}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {frontmatter.title}
          </Link>
        </h2>

        {frontmatter.collection === "teaching" && frontmatter.type && (
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {frontmatter.type}, <i>{frontmatter.venue}</i>,{" "}
            {frontmatter.date ? getYear(frontmatter.date) : ""}
          </p>
        )}

        {frontmatter.collection === "publications" && frontmatter.venue && (
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Published in <i>{frontmatter.venue}</i>,{" "}
            {frontmatter.date ? getYear(frontmatter.date) : ""}
          </p>
        )}

        {frontmatter.date && !frontmatter.collection && (
          <p className="page__date text-sm text-gray-500 dark:text-gray-500 mb-2">
            <strong>
              <span className="mr-1">📅</span>
              Published:
            </strong>{" "}
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
          </p>
        )}

        {frontmatter.excerpt && (
          <p className="archive__item-excerpt text-gray-700 dark:text-gray-300 mb-3">
            {frontmatter.excerpt}
          </p>
        )}

        {(frontmatter.citation ||
          frontmatter.paperurl ||
          frontmatter.slidesurl ||
          frontmatter.bibtexurl) && (
          <div className="text-sm text-gray-600 dark:text-gray-400 space-x-2">
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
  );
}

