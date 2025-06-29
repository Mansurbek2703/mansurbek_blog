"use client"

import { useState } from "react"
import { Play, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface YouTubeEmbedProps {
  url: string
  title?: string
  className?: string
}

// YouTube URL dan video ID ni olish funksiyasi
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export function YouTubeEmbed({ url, title = "YouTube Video", className = "" }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoId = getYouTubeVideoId(url)

  if (!videoId) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600">Noto'g'ri YouTube URL: {url}</p>
      </div>
    )
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-2xl">
        {!isLoaded ? (
          // Thumbnail with play button
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative w-full h-full cursor-pointer group"
            onClick={() => setIsLoaded(true)}
          >
            <img
              src={thumbnailUrl || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to default thumbnail if maxres doesn't exist
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />

            {/* Play button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </motion.div>

            {/* YouTube logo */}
            <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-md">
              <span className="text-white text-sm font-semibold">YouTube</span>
            </div>

            {/* Video title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-semibold text-lg">{title}</h3>
            </div>
          </motion.div>
        ) : (
          // Embedded iframe
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* External link */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400 text-sm">🎥 YouTube video</p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          <span>YouTube'da ochish</span>
        </motion.a>
      </div>
    </div>
  )
}
