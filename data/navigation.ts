export interface NavItem {
  title: string;
  url?: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { title: "Publications", url: "/publications/" },
  // { title: "Talks", url: "/talks/" },
  { title: "Teaching", url: "/teaching/" },
  // { title: "Portfolio", url: "/portfolio/" },
  {
    title: "Misc",
    children: [
      { title: "Music", url: "/misc/music/" },
      { title: "Sports", url: "/misc/sports/" },
    ],
  },
  // { title: "CV", url: "/cv/" },
];

