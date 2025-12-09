# Deployment Guide - Supabase + Next.js

This guide will help you deploy your Next.js website with Supabase integration.

## Overview

- **Frontend Hosting**: Vercel (recommended for Next.js) or Netlify
- **Backend/Storage**: Supabase (for videos and future database features)

## Step 1: Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Note down your:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - Anon/Public Key (found in Settings > API)

## Step 2: Create Supabase Storage Bucket

1. In your Supabase dashboard, go to **Storage**
2. Create a new bucket named `music-videos`
3. Set it to **Public** (so videos can be accessed without authentication)
4. Upload your video files to this bucket

## Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Update Supabase Storage Utilities

Once Supabase is set up, update `lib/supabase-storage.ts` to use the actual Supabase URLs.

## Step 5: Deploy to Vercel (Recommended)

### Option A: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   cd supabase_website
   vercel
   ```

4. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Option B: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables during setup
5. Deploy!

## Step 6: Update Video URLs in Markdown Files

After uploading videos to Supabase Storage, update your markdown files:

```markdown
videoUrl: "recordings/2024/Blazing.mp4"  # Path in Supabase bucket
```

## Alternative: Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login and deploy:
   ```bash
   netlify login
   netlify deploy --prod
   ```

3. Add environment variables in Netlify dashboard

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify videos play from Supabase Storage
- [ ] Check that thumbnails display properly
- [ ] Test tag filtering on Music page
- [ ] Verify all navigation links work
- [ ] Check mobile responsiveness


