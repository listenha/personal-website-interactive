export interface Author {
  avatar?: string;
  name: string;
  pronouns?: string;
  bio?: string;
  location?: string;
  employer?: string;
  school?: string;
  uri?: string;
  email?: string;
  // Academic websites
  academia?: string;
  arxiv?: string;
  googlescholar?: string;
  "inspire-hep"?: string;
  impactstory?: string;
  orcid?: string;
  semantic?: string;
  ssrn?: string;
  pubmed?: string;
  researchgate?: string;
  scopus?: string;
  zotero?: string;
  // Repositories and software development
  bitbucket?: string;
  codepen?: string;
  dribbble?: string;
  github?: string;
  kaggle?: string;
  stackoverflow?: string;
  // Social media
  artstation?: string;
  bluesky?: string;
  facebook?: string;
  flickr?: string;
  foursquare?: string;
  goodreads?: string;
  google_plus?: string;
  keybase?: string;
  instagram?: string;
  lastfm?: string;
  linkedin?: string;
  mastodon?: string;
  medium?: string;
  pinterest?: string;
  soundcloud?: string;
  steam?: string;
  telegram?: string;
  tumblr?: string;
  twitter?: string;
  vine?: string;
  weibo?: string;
  wikipedia?: string;
  xing?: string;
  youtube?: string;
  zhihu?: string;
}

export interface SiteConfig {
  locale: string;
  siteTheme: string;
  title: string;
  titleSeparator: string;
  name: string;
  description: string;
  url: string;
  baseurl: string;
  author: Author;
  publicationCategory?: {
    [key: string]: { title: string };
  };
  wordsPerMinute: number;
}

export const siteConfig: SiteConfig = {
  locale: "en-US",
  siteTheme: "default",
  title: "Yueshen Li / Homepage",
  titleSeparator: "-",
  name: "Yueshen Li",
  description: "Yueshen Li | MSCS at UIUC | Human-AI Interaction, LLM Reasoning, Social Computing",
  url: "https://yueshen-li.vercel.app",
  baseurl: "",
  author: {
    avatar: "profile.png",
    name: "Yueshen Li",
    bio: "MSCS Student, UIUC",
    location: "Champaign, IL",
    school: "https://siebelschool.illinois.edu/",
    email: "yueshen7@illinois.edu",
    github: "https://github.com/listenha",
    linkedin: "yueshen-li-b36b04251",
  },
  publicationCategory: {
    books: { title: "Books" },
    manuscripts: { title: "Journal Articles" },
    conferences: { title: "Conference Papers" },
    preprints: { title: "Preprints" },
  },
  wordsPerMinute: 160,
};

