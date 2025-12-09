import { siteConfig } from "@/data/siteConfig";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="page__footer bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {siteConfig.author.github && (
          <div className="page__footer-follow mb-4">
            <ul className="social-icons flex gap-4 items-center">
              <li>
                <strong className="text-gray-700 dark:text-gray-300">Follow:</strong>
              </li>
              <li>
                <a
                  href={siteConfig.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  <FaGithub className="mr-1" aria-hidden="true" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        )}
        <div className="page__footer-copyright text-sm text-gray-600 dark:text-gray-400">
          &copy; {currentYear} {siteConfig.name || siteConfig.title}. Powered by{" "}
          <a
            href="https://nextjs.org"
            rel="nofollow"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Next.js
          </a>
          .
        </div>
      </div>
    </footer>
  );
}

