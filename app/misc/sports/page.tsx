import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: `Sports - ${siteConfig.title}`,
  description: `Sports activities of ${siteConfig.name}`,
};

export default function SportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-4">
            Sports
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Coming soon...
          </p>
        </header>
      </div>
    </div>
  );
}

