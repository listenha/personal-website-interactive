import Sidebar from "@/components/layout/Sidebar";
import { siteConfig } from "@/data/siteConfig";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const metadata = {
  title: `About - ${siteConfig.title}`,
  description: siteConfig.description,
};

async function getAboutContent() {
  const aboutPath = path.join(process.cwd(), "content", "about.md");
  
  if (!fs.existsSync(aboutPath)) {
    return { frontmatter: { title: "About me" }, htmlContent: "" };
  }

  const fileContents = fs.readFileSync(aboutPath, "utf8");
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return { frontmatter: data, htmlContent };
}

export default async function AboutPage() {
  const { frontmatter, htmlContent } = await getAboutContent();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Sidebar showAuthorProfile={true} />
        </div>
        <div className="lg:col-span-3">
          <article className="page">
            <header className="mb-6">
              <h1 className="page__title text-3xl font-bold mb-4 text-black dark:text-white">
                {frontmatter.title || "About me"}
              </h1>
            </header>
            <section
              className="page__content prose prose-lg dark:prose-invert max-w-none text-black dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}

