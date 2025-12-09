# Academic Personal Website - Next.js + Supabase

This is a Next.js application transformed from a Jekyll academic template. It maintains the same layout and functionality while being built on modern web technologies.

## Features

- **Next.js 16** with App Router
- **Tailwind CSS v4** for styling
- **TypeScript** for type safety
- **Markdown-based content** management
- **Supabase-ready** structure (placeholder for future interactive features)

## Project Structure

```
supabase_website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page (homepage)
│   ├── publications/      # Publications listing and detail pages
│   ├── talks/             # Talks listing and detail pages
│   ├── teaching/          # Teaching experience
│   ├── portfolio/        # Portfolio items
│   └── cv/               # CV page
├── components/            # React components
│   ├── layout/           # Layout components (Masthead, Sidebar, Footer)
│   └── content/          # Content components (ArchiveItem)
├── lib/                   # Utilities
│   ├── markdown.ts       # Markdown processing
│   └── supabase.ts       # Supabase client (placeholder)
├── content/               # Markdown content files
│   ├── publications/
│   ├── talks/
│   ├── teaching/
│   └── portfolio/
├── data/                  # Configuration
│   ├── siteConfig.ts     # Site configuration
│   └── navigation.ts     # Navigation menu
└── public/               # Static assets
    ├── images/
    └── files/
```

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Content Management

Content is managed through markdown files in the `content/` directory:

- **Publications**: `content/publications/*.md`
- **Talks**: `content/talks/*.md`
- **Teaching**: `content/teaching/*.md`
- **Portfolio**: `content/portfolio/*.md`

Each markdown file should have frontmatter with metadata:

```markdown
---
title: "Your Title"
date: 2024-01-01
venue: "Venue Name"
excerpt: "Brief description"
---
```

## Configuration

Site configuration is in `data/siteConfig.ts`. Update author information, site metadata, and other settings there.

Navigation menu is configured in `data/navigation.ts`.

## Supabase Integration

The project includes placeholder structure for Supabase integration. When ready to add interactive features:

1. Set up a Supabase project
2. Add environment variables to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
3. Uncomment and configure `lib/supabase.ts`
4. Use the types defined in `lib/supabase/types.ts`

## Pages

- **About** (`/about`): Homepage with author profile
- **Publications** (`/publications`): List of publications, grouped by category
- **Talks** (`/talks`): List of talks and presentations
- **Teaching** (`/teaching`): Teaching experience
- **Portfolio** (`/portfolio`): Portfolio items
- **CV** (`/cv`): Curriculum Vitae

Each collection has individual detail pages accessible via `/collection/[slug]`.

## Migration Notes

This project was migrated from a Jekyll template. Key differences:

- **Static Site Generation**: Uses Next.js SSG instead of Jekyll
- **Styling**: Tailwind CSS instead of SCSS
- **Components**: React components instead of Liquid templates
- **Content**: Markdown files remain, but processed differently
- **Configuration**: TypeScript files instead of YAML

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. **Set up Supabase**:
   - Create a project at [supabase.com](https://supabase.com)
   - Create a public bucket named `music-videos` in Storage
   - Upload your video files

2. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

3. **Add environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Update video URLs** in markdown files to use Supabase Storage paths

## Future Enhancements

- Implement search functionality
- Add blog post archive pages
- Enhance SEO with better metadata
- Add dark mode toggle (currently uses system preference)
