"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { navigation, NavItem } from "@/data/navigation";
import { useState } from "react";

export default function Masthead() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="masthead bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="masthead__inner-wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="masthead__menu py-4">
          <nav className="greedy-nav flex items-center justify-between">
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="navicon block w-6 h-6 relative">
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gray-900 dark:bg-white transition-all ${
                    isMenuOpen ? "rotate-45 top-2.5" : ""
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-full h-0.5 bg-gray-900 dark:bg-white transition-all ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-full h-0.5 bg-gray-900 dark:bg-white transition-all ${
                    isMenuOpen ? "-rotate-45 top-2.5" : ""
                  }`}
                />
              </span>
            </button>
            <ul
              className={`visible-links flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 ${
                isMenuOpen ? "block" : "hidden md:flex"
              }`}
            >
              <li className="masthead__menu-item--lg font-bold text-lg">
                <Link href="/" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                  {siteConfig.title}
                </Link>
              </li>
              {navigation.map((item) => (
                <li
                  key={item.title}
                  className="masthead__menu-item relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.children ? (
                    <>
                      <button
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                        onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                      >
                        {item.title}
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.title ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === item.title && (
                        <ul className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-2 min-w-[120px] z-50">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <Link
                                href={child.url || "#"}
                                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.url || "#"}
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
