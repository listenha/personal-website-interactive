import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { FaLocationDot, FaEnvelope, FaGithub, FaLinkedin, FaXTwitter, FaBuildingColumns } from "react-icons/fa6";

interface SidebarProps {
  showAuthorProfile?: boolean;
}

export default function Sidebar({ showAuthorProfile = true }: SidebarProps) {
  if (!showAuthorProfile) return null;

  const { author } = siteConfig;

  return (
    <div className="sidebar sticky top-4">
      <div className="author-profile bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        {author.avatar && (
          <div className="author__avatar mb-4">
            <Image
              src={`/images/${author.avatar}`}
              alt={author.name}
              width={200}
              height={200}
              className="rounded-full"
              priority
            />
          </div>
        )}

        <div className="author__content mb-4">
          <h3 className="author__name text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {author.name}
          </h3>
          {author.pronouns && (
            <p className="author__pronouns text-sm text-gray-600 dark:text-gray-400 mb-2">
              {author.pronouns}
            </p>
          )}
          {author.bio && (
            <p className="author__bio text-gray-700 dark:text-gray-300">
              {author.bio}
            </p>
          )}
        </div>

        <div className="author__urls-wrapper">
          <ul className="author__urls space-y-2">
            {author.location && (
              <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <FaLocationDot className="mr-2" aria-hidden="true" />
                {author.location}
              </li>
            )}
            {author.email && (
              <li>
                <a
                  href={`mailto:${author.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                >
                  <FaEnvelope className="mr-2" aria-hidden="true" />
                  Email
                </a>
              </li>
            )}
            {author.github && (
              <li>
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                >
                  <FaGithub className="mr-2" aria-hidden="true" />
                  GitHub
                </a>
              </li>
            )}
            {author.school && (
              <li>
                <a
                  href={author.school}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                >
                  <FaBuildingColumns className="mr-2" aria-hidden="true" />
                  School
                </a>
              </li>
            )}
            {author.linkedin && (
              <li>
                <a
                  href={
                    author.linkedin.startsWith("http")
                      ? author.linkedin
                      : `https://www.linkedin.com/in/${author.linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                >
                  <FaLinkedin className="mr-2" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            )}
            {author.twitter && (
              <li>
                <a
                  href={`https://twitter.com/${author.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                >
                  <FaXTwitter className="mr-2" aria-hidden="true" />
                  X (Twitter)
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

