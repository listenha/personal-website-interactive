import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface MarkdownFrontmatter {
  title?: string;
  collection?: string;
  category?: string;
  permalink?: string;
  excerpt?: string;
  date?: string;
  venue?: string;
  paperurl?: string;
  slidesurl?: string;
  bibtexurl?: string;
  citation?: string;
  type?: string;
  author_profile?: boolean;
  [key: string]: any;
}

export interface MarkdownContent {
  slug: string;
  frontmatter: MarkdownFrontmatter;
  content: string;
  htmlContent: string;
}

const contentDirectory = path.join(process.cwd(), "content");

export async function getMarkdownFiles(
  collection: string
): Promise<MarkdownContent[]> {
  const collectionPath = path.join(contentDirectory, collection);
  
  if (!fs.existsSync(collectionPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(collectionPath);
  const allPostsData = await Promise.all(
    fileNames
      .filter((name) => name.endsWith(".md"))
      .map(async (fileName) => {
        const fullPath = path.join(collectionPath, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Process markdown to HTML
        const processedContent = await remark().use(html).process(content);
        const htmlContent = processedContent.toString();

        // Generate slug from filename (remove date prefix and .md extension)
        const slug = fileName
          .replace(/^\d{4}-\d{2}-\d{2}-/, "")
          .replace(/\.md$/, "");

        return {
          slug,
          frontmatter: data as MarkdownFrontmatter,
          content,
          htmlContent,
        };
      })
  );

  // Sort by date (newest first)
  return allPostsData.sort((a, b) => {
    const dateA = String(a.frontmatter.date || "1900-01-01");
    const dateB = String(b.frontmatter.date || "1900-01-01");
    return dateB.localeCompare(dateA);
  });
}

export async function getMarkdownBySlug(
  collection: string,
  slug: string
): Promise<MarkdownContent | null> {
  const collectionPath = path.join(contentDirectory, collection);
  const fileNames = fs.readdirSync(collectionPath);

  // Find file that matches the slug
  const fileName = fileNames.find((name) => {
    const fileSlug = name
      .replace(/^\d{4}-\d{2}-\d{2}-/, "")
      .replace(/\.md$/, "");
    return fileSlug === slug;
  });

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(collectionPath, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    slug,
    frontmatter: data as MarkdownFrontmatter,
    content,
    htmlContent,
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getYear(dateString: string): string {
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

