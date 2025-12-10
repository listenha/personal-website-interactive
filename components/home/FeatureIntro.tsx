import Link from "next/link";
import { websiteFeatures, WebsiteFeature } from "@/data/websiteFeatures";

export default function FeatureIntro() {
  const currentFeatures = websiteFeatures.filter((f) => f.status === "current");
  const upcomingFeatures = websiteFeatures.filter((f) => f.status === "coming-soon");

  return (
    <section className="website-features-intro mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-400 dark:text-white mb-2">
          Website Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          I am building an interactive website, Explore the content and stay tuned for upcoming features!
        </p>
      </div>

      {/* Current Features */}
      {currentFeatures.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-400 dark:text-gray-200 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded"></span>
            Available Now
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentFeatures.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Features */}
      {upcomingFeatures.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-400 dark:text-gray-200 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-amber-500 dark:bg-amber-400 rounded"></span>
            Coming Soon
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingFeatures.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function FeatureCard({ feature }: { feature: WebsiteFeature }) {
  const isComingSoon = feature.status === "coming-soon";
  const cardContent = (
    <div
      className={`p-5 rounded-lg border-2 transition-all ${
        isComingSoon
          ? "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-75"
          : "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        {feature.icon && (
          <span className="text-2xl flex-shrink-0">{feature.icon}</span>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-600 dark:text-white">
              {feature.title}
            </h4>
            {isComingSoon && (
              <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded">
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {feature.description}
          </p>
          {!isComingSoon && feature.url && (
            <div className="mt-3">
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1 group">
                Explore
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isComingSoon || !feature.url) {
    return cardContent;
  }

  return (
    <Link href={feature.url} className="block">
      {cardContent}
    </Link>
  );
}

