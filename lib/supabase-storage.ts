// Supabase Storage utilities for video and thumbnail URLs
// This will be used when Supabase is initialized

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_BUCKET = "music-videos";

/**
 * Get public URL for a video file stored in Supabase Storage
 * @param path - Path to the video file in the storage bucket
 * @returns Public URL for the video
 */
export function getVideoUrl(path: string): string {
  if (!path) return "";
  
  // If it's already a full URL (YouTube, etc.), return as-is
  if (path.startsWith("http")) return path;
  
  // If Supabase is configured, use Supabase Storage URL
  if (SUPABASE_URL) {
    return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/${path}`;
  }
  
  // For local development, use local path
  return `/videos/${path}`;
}

/**
 * Get public URL for a thumbnail image stored in Supabase Storage
 * @param path - Path to the thumbnail in the storage bucket
 * @returns Public URL for the thumbnail
 */
export function getThumbnailUrl(path: string): string {
  if (!path) return "";
  
  // If it's already a full URL, return as-is
  if (path.startsWith("http")) return path;
  
  // If Supabase is configured, use Supabase Storage URL
  if (SUPABASE_URL) {
    return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/${path}`;
  }
  
  // For local development, use local path
  return `/images/${path}`;
}

