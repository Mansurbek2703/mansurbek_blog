"use client"

import { useState } from "react"
import { Play, ExternalLink } from "lucide-react"

interface YouTubeEmbedProps {
  url: string
  title?: string
  className?: string
  showExternalLink?: boolean
}

export function YouTubeEmbed({
  url,
  title = "YouTube Video",
  className = "",
  showExternalLink = true,
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getVideoId(url)

  if (!videoId) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg p-8 ${className}`}>
        <p className="text-gray-500">Invalid YouTube URL</p>
      </div>
    )
  }

  if (isPlaying) {
    return (
      <div className={`relative w-full aspect-video ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>
    )
  }

  return (
    <div className={`relative w-full aspect-video ${className}`}>
      {/* Thumbnail */}
      <div
        className="relative w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer group"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsPlaying(true)
        }}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = `/placeholder.svg?height=300&width=400`
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>

        {/* YouTube badge */}
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-xs">YouTube</div>
      </div>

      {/* External link */}
      {showExternalLink && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400 text-sm">🎥 YouTube video</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.open(url, "_blank")
            }}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>YouTubeda</span>
          </button>
        </div>
      )}
    </div>
  )
}
