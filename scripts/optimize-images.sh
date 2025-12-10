#!/bin/bash

# Image Optimization Script
# Automatically optimizes images in public/images/ directory
# Converts HEIF/HEVC to JPEG and resizes large images

# Configuration
IMAGES_DIR="public/images"
MAX_SIZE=800  # Maximum width/height in pixels
QUALITY=85    # JPEG quality (1-100)

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🖼️  Image Optimization Script"
echo "================================"
echo ""

# Check if sips is available (macOS)
if ! command -v sips &> /dev/null; then
    echo -e "${RED}❌ Error: sips command not found. This script requires macOS.${NC}"
    echo "On Linux, install ImageMagick: sudo apt-get install imagemagick"
    exit 1
fi

# Check if images directory exists
if [ ! -d "$IMAGES_DIR" ]; then
    echo -e "${RED}❌ Error: Directory $IMAGES_DIR does not exist${NC}"
    exit 1
fi

# Count images to process
image_count=$(find "$IMAGES_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.heic" -o -iname "*.heif" \) | wc -l | tr -d ' ')

if [ "$image_count" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No images found in $IMAGES_DIR${NC}"
    exit 0
fi

echo "Found $image_count image(s) to process"
echo ""

# Process each image
processed=0
skipped=0
errors=0

# Use process substitution to avoid subshell issues
while IFS= read -r image; do
    filename=$(basename "$image")
    dir=$(dirname "$image")
    
    # Get original file size
    original_size=$(stat -f%z "$image" 2>/dev/null || stat -c%s "$image" 2>/dev/null)
    original_size_mb=$(echo "scale=2; $original_size / 1048576" | bc)
    
    # Get image dimensions
    dimensions=$(sips -g pixelWidth -g pixelHeight "$image" 2>/dev/null | grep -E "pixelWidth|pixelHeight" | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
    width=$(echo $dimensions | cut -d'x' -f1)
    height=$(echo $dimensions | cut -d'x' -f2)
    
    # Check if image needs optimization
    needs_optimization=false
    
    # Check if it's HEIF/HEVC format
    file_type=$(file "$image" | grep -i "heif\|hevc\|iso media" > /dev/null && echo "heif" || echo "standard")
    
    # Check if dimensions are too large
    if [ "$width" -gt "$MAX_SIZE" ] || [ "$height" -gt "$MAX_SIZE" ]; then
        needs_optimization=true
    fi
    
    # Check if file is too large (>500KB)
    if [ "$original_size" -gt 512000 ]; then
        needs_optimization=true
    fi
    
    if [ "$file_type" = "heif" ]; then
        needs_optimization=true
    fi
    
    if [ "$needs_optimization" = false ]; then
        echo -e "${GREEN}✓${NC} Skipping $filename (already optimized: ${dimensions}, ${original_size_mb}MB)"
        skipped=$((skipped + 1))
        continue
    fi
    
    # Create temporary file
    temp_file="${image}.optimized"
    
    echo -e "${YELLOW}⏳${NC} Processing $filename (${dimensions}, ${original_size_mb}MB)..."
    
    # Convert and optimize
    if sips -s format jpeg -Z "$MAX_SIZE" "$image" --out "$temp_file" &> /dev/null; then
        # Get new file size
        new_size=$(stat -f%z "$temp_file" 2>/dev/null || stat -c%s "$temp_file" 2>/dev/null)
        new_size_mb=$(echo "scale=2; $new_size / 1048576" | bc)
        savings=$(echo "scale=1; (($original_size - $new_size) * 100) / $original_size" | bc)
        
        # Replace original with optimized
        mv "$temp_file" "$image"
        
        # Get new dimensions
        new_dimensions=$(sips -g pixelWidth -g pixelHeight "$image" 2>/dev/null | grep -E "pixelWidth|pixelHeight" | awk '{print $2}' | tr '\n' 'x' | sed 's/x$//')
        
        echo -e "${GREEN}✅${NC} Optimized $filename"
        echo "   ${dimensions} → ${new_dimensions}"
        echo "   ${original_size_mb}MB → ${new_size_mb}MB (${savings}% reduction)"
        echo ""
        
        processed=$((processed + 1))
    else
        echo -e "${RED}❌${NC} Failed to optimize $filename"
        rm -f "$temp_file"
        errors=$((errors + 1))
    fi
done < <(find "$IMAGES_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.heic" -o -iname "*.heif" \))

echo ""
echo "================================"
echo -e "${GREEN}✨ Optimization complete!${NC}"
echo "Processed: $processed"
echo "Skipped: $skipped"
echo "Errors: $errors"

