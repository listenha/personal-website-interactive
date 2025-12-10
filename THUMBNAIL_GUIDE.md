# How to Add Custom Thumbnails to Music Entries

## Overview
You can add custom thumbnails to your music entries. Custom thumbnails take priority over YouTube's automatic thumbnails.

## Steps to Add a Custom Thumbnail

### 1. Add the thumbnail image file
Place your thumbnail image in one of these locations:
- **Local development**: `public/images/music/` folder
- **Supabase Storage**: Upload to the `music-videos` bucket (when configured)

Example: `public/images/music/blazing-thumbnail.jpg`

### 2. Add thumbnail field to markdown frontmatter
Edit your music entry markdown file (e.g., `content/misc/music/2024-02-24-Blazing.md`) and add the `thumbnail` field:

```markdown
---
title: "Blazing"
date: 2024-12-05
memory: "A quiet evening after finishing a challenging project..."
tags: ["Lantern Festival"]
videoUrl: "https://youtu.be/ydaeOGSuupE"
thumbnail: "blazing-thumbnail.jpg"  # Add this line
duration: "2:43"
---
```

### 3. Thumbnail path format
- **Local file**: Just the filename (e.g., `"blazing-thumbnail.jpg"`)
  - The file should be in `public/images/` directory
  - The system will automatically prepend `/images/`
- **Full URL**: If you want to use an external image, use the full URL:
  - `thumbnail: "https://example.com/my-thumbnail.jpg"`

## Priority Order
1. **Custom thumbnail** (if specified in markdown)
2. **YouTube thumbnail** (automatically extracted from video URL)
3. **Video frame** (for non-YouTube videos, first frame is extracted)
4. **Placeholder** (play icon)

## Example
```markdown
---
title: "Blazing"
date: 2024-12-05
memory: "A quiet evening after finishing a challenging project..."
tags: ["Lantern Festival"]
videoUrl: "https://youtu.be/ydaeOGSuupE"
thumbnail: "blazing-thumbnail.jpg"
duration: "2:43"
---
```

The thumbnail image should be placed at: `public/images/blazing-thumbnail.jpg`

