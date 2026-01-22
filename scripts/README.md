# Image Optimization Scripts

## optimize-images.sh

Automatically optimizes images in the `public/images/` directory by:
- Converting HEIF/HEVC format images to JPEG (browsers can't display HEIF)
- Resizing large images to max 800px width/height
- Compressing images larger than 500KB

### Usage

**From the project root directory:**

```bash
./scripts/optimize-images.sh
```

Or:

```bash
bash scripts/optimize-images.sh
```

### What it does:

1. **Scans** `public/images/` for image files (`.jpg`, `.jpeg`, `.png`, `.heic`, `.heif`)
2. **Checks** each image to see if it needs optimization:
   - Is it HEIF/HEVC format? → Convert to JPEG
   - Is it larger than 800px? → Resize to max 800px
   - Is it larger than 500KB? → Optimize
3. **Optimizes** images that need it
4. **Skips** images that are already optimized
5. **Reports** what was processed

### Requirements

- **macOS**: Uses `sips` command (built-in)
- **Linux**: Install ImageMagick: `sudo apt-get install imagemagick` (script needs modification)

### Example Output

```
🖼️  Image Optimization Script
================================

Found 4 image(s) to process

⏳ Processing blazing-thumbnail.jpg (4032x3024, 2.90MB)...
✅ Optimized blazing-thumbnail.jpg
   4032x3024 → 800x600
   2.90MB → 0.06MB (97.9% reduction)

⏳ Processing cage-thumbnail.jpg (4032x3024, 2.90MB)...
✅ Optimized cage-thumbnail.jpg
   4032x3024 → 800x600
   2.90MB → 0.06MB (97.9% reduction)

================================
✨ Optimization complete!
Processed: 4
Skipped: 0
Errors: 0
```

### When to Run

- **After adding new images** to `public/images/`
- **Before deploying** to production
- **Periodically** to ensure all images are optimized

### Notes

- The script **replaces** the original files (make backups if needed)
- Images that are already optimized are **skipped**
- The script is **safe to run multiple times**





