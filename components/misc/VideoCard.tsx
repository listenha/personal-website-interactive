"use client";

import { useState, useRef, useEffect } from "react";
import { MusicEntry, formatDate } from "@/lib/music-types";
import { getThumbnailUrl, getVideoUrl } from "@/lib/supabase-storage";
import VideoPlayer from "./VideoPlayer";

interface VideoCardProps {
  entry: MusicEntry;
  timelineOrientation?: "vertical" | "horizontal";
  isLast?: boolean;
}

export default function VideoCard({ entry, timelineOrientation = "vertical", isLast = false }: VideoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullMemory, setShowFullMemory] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    entry.thumbnail ? getThumbnailUrl(entry.thumbnail) : null
  );
  const [useVideoAsThumbnail, setUseVideoAsThumbnail] = useState(!entry.thumbnail);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const memoryExcerpt = entry.memory.length > 150 ? entry.memory.substring(0, 150) + "..." : entry.memory;
  const videoUrl = entry.videoUrl ? getVideoUrl(entry.videoUrl) : null;

  // Get YouTube thumbnail if it's a YouTube URL
  const getYouTubeThumbnail = (url: string): string | null => {
    if (!url) return null;
    
    // Check if it's a YouTube URL
    const youtubePattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/;
    const match = url.match(youtubePattern);
    
    if (match) {
      const videoId = match[1];
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    
    return null;
  };

  // Determine final thumbnail URL
  const youtubeThumbnail = getYouTubeThumbnail(entry.videoUrl);
  const finalThumbnailUrl = entry.thumbnail 
    ? getThumbnailUrl(entry.thumbnail) 
    : youtubeThumbnail || thumbnailUrl;
  
  // Check if it's a YouTube video (don't try to extract frame from YouTube)
  const isYouTubeVideo = entry.videoUrl && (entry.videoUrl.includes("youtube.com") || entry.videoUrl.includes("youtu.be"));

  // Use YouTube thumbnail if available
  useEffect(() => {
    if (youtubeThumbnail && !entry.thumbnail) {
      setThumbnailUrl(youtubeThumbnail);
      setUseVideoAsThumbnail(false);
    }
  }, [youtubeThumbnail, entry.thumbnail]);

  // Extract first frame from video if no thumbnail is provided (only for non-YouTube videos)
  useEffect(() => {
    if (!entry.thumbnail && !isYouTubeVideo && entry.videoUrl && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const extractFrame = () => {
        try {
          if (canvas && video && video.readyState >= 2 && video.videoWidth > 0) {
            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
              setThumbnailUrl(dataUrl);
              setUseVideoAsThumbnail(false); // Switch to using the extracted image
            }
          }
        } catch (error) {
          console.error("Error extracting video frame:", error);
          // Keep using video as thumbnail if extraction fails
        }
      };

      const handleLoadedMetadata = () => {
        if (video.duration > 0 && video.videoWidth > 0) {
          video.currentTime = Math.min(0.1, video.duration * 0.1);
        }
      };

      const handleSeeked = () => {
        extractFrame();
      };

      // Set video source if not already set
      if (video.src !== videoUrl) {
        video.src = videoUrl || "";
        video.load();
      }

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("seeked", handleSeeked);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("seeked", handleSeeked);
      };
    }
  }, [entry.thumbnail, entry.videoUrl, videoUrl, isYouTubeVideo]);

  return (
    <>
      <div
        className={`video-card group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 ${
          timelineOrientation === "vertical" ? "mb-8" : ""
        }`}
      >
        {/* Timeline connector */}
        {!isLast && (
          <div
            className={`absolute ${
              timelineOrientation === "vertical"
                ? "left-8 top-full w-0.5 h-8 bg-gradient-to-b from-amber-300 to-amber-200 dark:from-amber-600 dark:to-amber-700"
                : "top-8 right-0 h-0.5 w-8 bg-gradient-to-r from-amber-300 to-amber-200 dark:from-amber-600 dark:to-amber-700"
            }`}
          />
        )}

        {/* Timeline dot */}
        <div
          className={`absolute ${
            timelineOrientation === "vertical" ? "left-6 top-6" : "top-6 right-6"
          } w-4 h-4 bg-amber-400 dark:bg-amber-600 rounded-full border-2 border-white dark:border-gray-800 shadow-md z-10`}
        />

        <div className="p-6 pl-12 md:pl-16">
          {/* Date */}
          <div className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-2">
            {formatDate(entry.date)}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-3">{entry.title}</h3>

          {/* Thumbnail */}
          <div
            className="relative w-full h-48 mb-4 rounded-lg overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-700"
            onClick={() => setIsExpanded(true)}
          >
            {/* Canvas for frame extraction (hidden) */}
            {!entry.thumbnail && entry.videoUrl && (
              <canvas ref={canvasRef} className="hidden" />
            )}
            
            {/* Show video as thumbnail if no thumbnail image is available (only for non-YouTube) */}
            {useVideoAsThumbnail && videoUrl && !isYouTubeVideo ? (
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                preload="metadata"
                muted
                playsInline
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget;
                  if (video.duration > 0) {
                    video.currentTime = Math.min(0.1, video.duration * 0.1);
                  }
                }}
              />
            ) : finalThumbnailUrl ? (
              <img
                src={finalThumbnailUrl}
                alt={entry.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => {
                  // Fallback to video if image fails (only for non-YouTube)
                  if (!isYouTubeVideo) {
                    setThumbnailUrl(null);
                    setUseVideoAsThumbnail(true);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800">
                <svg className="w-16 h-16 text-amber-400 dark:text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8 text-amber-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Memory */}
          <div className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            <p className="italic">
              {showFullMemory ? entry.memory : memoryExcerpt}
              {entry.memory.length > 150 && (
                <button
                  onClick={() => setShowFullMemory(!showFullMemory)}
                  className="ml-2 text-amber-600 dark:text-amber-400 hover:underline"
                >
                  {showFullMemory ? "Read less" : "Read more"}
                </button>
              )}
            </p>
          </div>

          {/* Tags */}
          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Play button */}
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play Recording
            {entry.duration && <span className="text-sm opacity-90">({entry.duration})</span>}
          </button>
        </div>
      </div>

      <VideoPlayer
        videoUrl={entry.videoUrl}
        title={entry.title}
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
      />
    </>
  );
}

