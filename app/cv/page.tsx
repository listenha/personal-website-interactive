import Sidebar from "@/components/layout/Sidebar";
import { siteConfig } from "@/data/siteConfig";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const metadata = {
  title: `CV - ${siteConfig.title}`,
  description: `Curriculum Vitae of ${siteConfig.name}`,
};

async function getCVContent() {
  const cvPath = path.join(process.cwd(), "content", "cv.md");
  
  if (!fs.existsSync(cvPath)) {
    // Return default CV content if file doesn't exist
    return {
      content: `# CV

## Education
* Ph.D in Version Control Theory, GitHub University, 2018 (expected)
* M.S. in Jekyll, GitHub University, 2014
* B.S. in GitHub, GitHub University, 2012

## Work experience
* Spring 2024: Academic Pages Collaborator
  * GitHub University
  * Duties includes: Updates and improvements to template
  * Supervisor: The Users

* Fall 2015: Research Assistant
  * GitHub University
  * Duties included: Merging pull requests
  * Supervisor: Professor Hub

## Skills
* Skill 1
* Skill 2
* Skill 3`,
      htmlContent: "",
    };
  }

  const fileContents = fs.readFileSync(cvPath, "utf8");
  const { content } = matter(fileContents);
  
  // Process markdown to HTML
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return { content, htmlContent };
}

export default async function CVPage() {
  const { htmlContent } = await getCVContent();

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
                CV
              </h1>
            </header>
            <section
              className="page__content prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}

