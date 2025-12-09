// TypeScript types for future Supabase tables
// These are example schemas that can be used when Supabase is set up

export interface Publication {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  venue?: string;
  paperurl?: string;
  slidesurl?: string;
  bibtexurl?: string;
  citation?: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Talk {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  venue?: string;
  slidesurl?: string;
  videourl?: string;
  type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Teaching {
  id: string;
  title: string;
  type?: string;
  venue?: string;
  date: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Portfolio {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  image?: string;
  url?: string;
  created_at?: string;
  updated_at?: string;
}

