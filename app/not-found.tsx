import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          404
        </h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
          Page Not Found
        </p>
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

