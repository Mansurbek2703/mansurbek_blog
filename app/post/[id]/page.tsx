"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  Send,
  Reply,
  MoreHorizontal,
  ArrowLeft,
  Globe,
  Moon,
  Sun,
  Laptop,
  Sparkles,
  Star,
  Check,
  Youtube,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useComments } from "@/hooks/useComments"
import { usePost } from "@/hooks/usePost"
import { usePosts } from "@/hooks/usePosts"
import { useGlobalSettings } from "@/hooks/useGlobalSettings"
import { YouTubeEmbed } from "@/components/youtube-embed"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const floatingLaptop = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 3, -3, 0],
    scale: [1, 1.03, 1],
  },
  transition: {
    duration: 8,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

const sparkleAnimation = {
  animate: {
    scale: [0, 1, 0],
    rotate: [0, 180, 360],
    opacity: [0, 1, 0],
  },
  transition: {
    duration: 2.5,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

// Compact Floating Background Component
const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Compact Gradient Orbs - Mobile optimized */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-40 h-40 sm:w-60 sm:h-60 md:w-96 md:h-96 bg-gradient-to-r from-green-400/15 to-emerald-400/15 rounded-full blur-3xl"
      />

      {/* Compact Floating Laptops - Mobile optimized */}
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 0, duration: 10 }}
        className="absolute top-32 left-12 opacity-8 sm:opacity-12 md:opacity-18"
      >
        <Laptop className="w-8 h-8 sm:w-12 sm:h-12 md:w-24 md:h-24 text-blue-500 drop-shadow-lg" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 1.5, duration: 12 }}
        className="absolute top-60 right-16 opacity-10 sm:opacity-15 md:opacity-22"
      >
        <Laptop className="w-6 h-6 sm:w-10 sm:h-10 md:w-20 md:h-20 text-blue-600 drop-shadow-lg" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 3, duration: 14 }}
        className="absolute bottom-40 left-1/4 opacity-6 sm:opacity-10 md:opacity-15"
      >
        <Laptop className="w-10 h-10 sm:w-14 sm:h-14 md:w-28 md:h-28 text-cyan-500 drop-shadow-lg" />
      </motion.div>

      {/* Compact Sparkles - Mobile optimized */}
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 0 }}
        className="absolute top-40 left-1/2 opacity-15 sm:opacity-25 md:opacity-35"
      >
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-7 md:h-7 text-cyan-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 1 }}
        className="absolute bottom-60 right-1/4 opacity-12 sm:opacity-20 md:opacity-30"
      >
        <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5 text-blue-400" />
      </motion.div>
    </div>
  )
}

const stickers = [
  { emoji: "👍", name: "like", count: 2 },
  { emoji: "❤️", name: "love", count: 0 },
  { emoji: "🔥", name: "fire", count: 0 },
  { emoji: "💡", name: "idea", count: 0 },
  { emoji: "🎉", name: "celebrate", count: 0 },
  { emoji: "🤔", name: "thinking", count: 0 },
]

export default function PostPage({ params }: { params: { id: string } }) {
  const { language, darkMode, isLoaded, toggleLanguage, toggleDarkMode, t } = useGlobalSettings()
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [selectedStickers, setSelectedStickers] = useState<string[]>([])
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [shareSuccess, setShareSuccess] = useState(false)

  // Dynamic post data using usePost hook
  const postId = Number.parseInt(params.id)
  const { post, loading: postLoading, error: postError } = usePost(postId)
  const {
    comments,
    loading: commentsLoading,
    addComment,
    handleCommentLike,
    likedComments,
    likingComments,
  } = useComments(postId)

  const { posts: relatedPosts } = usePosts(2, post?.category_name)

  useEffect(() => {
    if (post) {
      setLikesCount(post.likes_count || 0)
    }
  }, [post])

  const handleLike = async () => {
    try {
      console.log(`Attempting to like post ${postId}`)

      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "like" }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setLiked(!liked)
        if (disliked) setDisliked(false)
        console.log(`Post ${postId} liked successfully`)
      } else {
        console.error("Like failed:", data.error)
        alert(`Like failed: ${data.error}`)
      }
    } catch (error) {
      console.error("Like error:", error)
      alert(`Network error: ${error.message}`)
    }
  }

  const handleDislike = () => {
    setDisliked(!disliked)
    if (liked) setLiked(false)
  }

  const handleStickerClick = (stickerName: string) => {
    if (selectedStickers.includes(stickerName)) {
      setSelectedStickers(selectedStickers.filter((s) => s !== stickerName))
    } else {
      setSelectedStickers([...selectedStickers, stickerName])
    }
  }

  const handleShare = async () => {
    try {
      const currentUrl = window.location.href

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2000)
      } else {
        const textArea = document.createElement("textarea")
        textArea.value = currentUrl
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          document.execCommand("copy")
          setShareSuccess(true)
          setTimeout(() => setShareSuccess(false), 2000)
        } catch (err) {
          console.error("Fallback: Oops, unable to copy", err)
        }
        document.body.removeChild(textArea)
      }
    } catch (error) {
      console.error("Failed to copy URL:", error)
    }
  }

  const handleCommentSubmit = async () => {
    if (newComment.trim() && authorName.trim()) {
      setIsSubmitting(true)
      try {
        await addComment({
          author: authorName.trim(),
          content: newComment.trim(),
          content_en: newComment.trim(),
        })
        setNewComment("")
        setAuthorName("")
      } catch (error) {
        console.error("Comment submission error:", error)
        alert(t("Izoh yuborishda xatolik yuz berdi", "Error occurred while submitting comment"))
      } finally {
        setIsSubmitting(false)
      }
    } else {
      alert(t("Iltimos, ism va izoh matnini kiriting", "Please enter your name and comment text"))
    }
  }

  const handleReplySubmit = async (parentId: number) => {
    if (replyContent.trim() && authorName.trim()) {
      setIsSubmitting(true)
      try {
        await addComment({
          author: authorName.trim(),
          content: replyContent.trim(),
          content_en: replyContent.trim(),
          parent_id: parentId,
        })
        setReplyContent("")
        setReplyTo(null)
      } catch (error) {
        console.error("Reply submission error:", error)
        alert(t("Javob yuborishda xatolik yuz berdi", "Error occurred while submitting reply"))
      } finally {
        setIsSubmitting(false)
      }
    } else {
      alert(t("Iltimos, ism va javob matnini kiriting", "Please enter your name and reply text"))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return language === "uz" ? date.toLocaleDateString("uz-UZ") : date.toLocaleDateString("en-US")
  }

  // Compact Loading state
  if (!isLoaded || postLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
        <FloatingBackground />
        <div className="text-center relative z-10 px-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-2 sm:border-3 md:border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg"
          />
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-lg font-medium">
            {t("Maqola yuklanmoqda...", "Loading article...")}
          </p>
        </div>
      </div>
    )
  }

  // Compact Error state
  if (postError || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
        <FloatingBackground />
        <div className="text-center relative z-10 px-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-xl"
          >
            <span className="text-white text-lg sm:text-xl md:text-3xl">❌</span>
          </motion.div>
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6">
            {t("Maqola topilmadi", "Article not found")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-lg">
            {t(
              "Kechirasiz, bu maqola mavjud emas yoki o'chirilgan.",
              "Sorry, this article doesn't exist or has been deleted.",
            )}
          </p>
          <Link href="/">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg shadow-lg">
                {t("Bosh sahifaga qaytish", "Back to home")}
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "dark bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50"
      }`}
    >
      <FloatingBackground />

      {/* Compact Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-gray-900/85 border-b border-blue-200/50 dark:border-blue-700/50 shadow-lg"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </motion.button>
              </Link>
              <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-md"
                >
                  <span className="text-white font-bold text-xs sm:text-sm md:text-lg">M</span>
                </motion.div>
                <span className="font-bold text-xs sm:text-sm md:text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent hidden xs:block">
                  Mansurbek Qazaqov
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleLanguage}
                className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-800 dark:to-cyan-800 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-700 dark:hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5" />
                <span className="text-xs sm:text-xs md:text-sm font-semibold">{language.toUpperCase()}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleDarkMode}
                className="p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 text-green-700 dark:text-green-300 hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-700 dark:hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {darkMode ? <Sun className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Compact Article Content */}
      <main className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Compact Article Header */}
          <motion.div {...fadeInUp} className="mb-6 sm:mb-8 md:mb-12">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <motion.div whileHover={{ scale: 1.02 }} className="inline-block mb-3 sm:mb-4 md:mb-6">
                <Badge className="px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-lg bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900 dark:to-cyan-900 dark:text-blue-200 shadow-md">
                  {language === "uz" ? post.category_name : post.category_name_en}
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-sm"
              >
                {language === "uz" ? post.title_uz : post.title_en}
              </motion.h1>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-8 text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 md:mb-8"
            >
              <motion.div variants={fadeInUp} className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ring-1 sm:ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                  <AvatarImage src={post.author_avatar || "/placeholder.svg?height=48&width=48"} alt={post.author} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-xs sm:text-sm md:text-base">
                    {post.author?.charAt(0) || "M"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm md:text-lg">{post.author}</p>
                  <p className="text-xs sm:text-xs md:text-sm">{t("Muallif", "Author")}</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-500" />
                <span className="font-medium text-xs sm:text-sm md:text-base">{formatDate(post.created_at)}</span>
              </motion.div>
              {post.read_time && (
                <motion.div variants={fadeInUp} className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
                  <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500" />
                  <span className="font-medium text-xs sm:text-sm md:text-base">
                    {post.read_time} {t("daq", "min")}
                  </span>
                </motion.div>
              )}
              <motion.div variants={fadeInUp} className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cyan-500" />
                <span className="font-medium text-xs sm:text-sm md:text-base">
                  {post.views || 0}
                </span>
              </motion.div>
            </motion.div>

            {/* Compact Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-10"
              >
                {(language === "uz" ? post.tags : post.tags_en || post.tags).map((tag, index) => (
                  <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.02, y: -1 }}>
                    <Badge
                      variant="secondary"
                      className="text-xs sm:text-xs md:text-sm px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-2 bg-gradient-to-r from-blue-100 to-green-100 text-gray-700 dark:from-blue-900 dark:to-green-900 dark:text-gray-300 shadow-sm"
                    >
                      #{typeof tag === "object" ? (language === "uz" ? tag.name : tag.name_en) : tag}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Compact YouTube Video Section */}
          {post.youtube_url && (
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="mb-6 sm:mb-8 md:mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative"
              >
                <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 mb-3 sm:mb-4 md:mb-6">
                  <div className="p-1 sm:p-1.5 md:p-2 bg-red-100 dark:bg-red-900/30 rounded-md sm:rounded-lg">
                    <Youtube className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <h2 className="text-sm sm:text-base md:text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    {t("Video", "Video")}
                  </h2>
                </div>
                <YouTubeEmbed
                  url={post.youtube_url}
                  title={language === "uz" ? post.title_uz : post.title_en}
                  className="shadow-lg sm:shadow-xl md:shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Compact Featured Image */}
          {post.featured_image && (
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="mb-6 sm:mb-8 md:mb-16">
              <motion.div
                whileHover={{ scale: 1.01, y: -2 }}
                className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl"
              >
                <Image
                  src={post.featured_image || "/placeholder.svg"}
                  alt={language === "uz" ? post.title_uz : post.title_en}
                  width={1200}
                  height={600}
                  className="w-full h-48 sm:h-64 md:h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </motion.div>
            </motion.div>
          )}

          {/* Compact Article Content */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none dark:prose-invert mb-6 sm:mb-8 md:mb-16 prose-headings:bg-gradient-to-r prose-headings:from-blue-600 prose-headings:to-green-600 prose-headings:bg-clip-text prose-headings:text-transparent prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed"
          >
            <div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg sm:shadow-xl border border-blue-200/50 dark:border-blue-700/50"
              dangerouslySetInnerHTML={{
                __html: language === "uz" ? post.content_uz : post.content_en,
              }}
            />
          </motion.div>

          {/* Compact Reactions - Mobile Optimized */}
          <motion.section {...fadeInUp} transition={{ delay: 0.4 }} className="mb-6 sm:mb-8 md:mb-16">
            <motion.div
              whileHover={{ scale: 1.005, y: -1 }}
              className="p-3 sm:p-4 md:p-8 bg-gradient-to-r from-blue-50/80 via-cyan-50/80 to-green-50/80 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-green-900/30 rounded-lg sm:rounded-xl md:rounded-3xl shadow-lg sm:shadow-xl backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50"
            >
              {/* Mobile: Vertical Stack Layout */}
              <div className="flex flex-col space-y-3 sm:space-y-4 md:hidden">
                {/* Like/Dislike Buttons */}
                <div className="flex items-center justify-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 shadow-md ${
                      liked
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/25"
                        : "bg-white/90 dark:bg-gray-700/90 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/50 backdrop-blur-sm"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-semibold text-sm">{likesCount + (liked ? 1 : 0)}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDislike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 shadow-md ${
                      disliked
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25"
                        : "bg-white/90 dark:bg-gray-700/90 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/50 backdrop-blur-sm"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="font-semibold text-sm">{(post.dislikes || 0) + (disliked ? 1 : 0)}</span>
                  </motion.button>
                </div>

                {/* Emoji Stickers - Mobile Optimized with Horizontal Scroll */}
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-2 pb-2 min-w-max">
                    {stickers.map((sticker, index) => (
                      <motion.button
                        key={sticker.name}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleStickerClick(sticker.name)}
                        className={`relative p-2 rounded-lg transition-all duration-300 shadow-md flex-shrink-0 ${
                          selectedStickers.includes(sticker.name)
                            ? "bg-gradient-to-r from-yellow-400 to-orange-400 ring-1 ring-yellow-500 shadow-yellow-500/25"
                            : "bg-white/90 dark:bg-gray-700/90 hover:bg-yellow-50 dark:hover:bg-yellow-900/50 backdrop-blur-sm"
                        }`}
                      >
                        <span className="text-lg">{sticker.emoji}</span>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-md"
                        >
                          {sticker.count + (selectedStickers.includes(sticker.name) ? 1 : 0)}
                        </motion.span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Share Button - Full Width on Mobile */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 shadow-lg font-semibold text-sm ${
                    shareSuccess
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 text-white hover:from-blue-600 hover:via-cyan-600 hover:to-green-600"
                  }`}
                >
                  {shareSuccess ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span>{shareSuccess ? t("Nusxalandi!", "Copied!") : t("Ulashish", "Share")}</span>
                </motion.button>
              </div>

              {/* Desktop: Horizontal Layout (md and up) */}
              <div className="hidden md:flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleLike}
                      className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${
                        liked
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/25"
                          : "bg-white/90 dark:bg-gray-700/90 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/50 backdrop-blur-sm"
                      }`}
                    >
                      <ThumbsUp className="w-6 h-6" />
                      <span className="font-semibold text-lg">{likesCount + (liked ? 1 : 0)}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDislike}
                      className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${
                        disliked
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25"
                          : "bg-white/90 dark:bg-gray-700/90 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/50 backdrop-blur-sm"
                      }`}
                    >
                      <ThumbsDown className="w-6 h-6" />
                      <span className="font-semibold text-lg">{(post.dislikes || 0) + (disliked ? 1 : 0)}</span>
                    </motion.button>
                  </div>

                  <Separator orientation="vertical" className="h-12 bg-gradient-to-b from-blue-300 to-green-300" />

                  <div className="flex items-center space-x-3">
                    {stickers.map((sticker, index) => (
                      <motion.button
                        key={sticker.name}
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleStickerClick(sticker.name)}
                        className={`relative p-3 rounded-xl transition-all duration-300 shadow-lg ${
                          selectedStickers.includes(sticker.name)
                            ? "bg-gradient-to-r from-yellow-400 to-orange-400 ring-2 ring-yellow-500 shadow-yellow-500/25"
                            : "bg-white/90 dark:bg-gray-700/90 hover:bg-yellow-50 dark:hover:bg-yellow-900/50 backdrop-blur-sm"
                        }`}
                      >
                        <span className="text-3xl">{sticker.emoji}</span>
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg"
                        >
                          {sticker.count + (selectedStickers.includes(sticker.name) ? 1 : 0)}
                        </motion.span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className={`flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-300 shadow-xl font-semibold text-lg ${
                    shareSuccess
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 text-white hover:from-blue-600 hover:via-cyan-600 hover:to-green-600"
                  }`}
                >
                  {shareSuccess ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                  <span>{shareSuccess ? t("Nusxalandi!", "Copied!") : t("Ulashish", "Share")}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.section>

          {/* Compact Comments Section */}
          <motion.section {...fadeInUp} transition={{ delay: 0.5 }} className="mb-6 sm:mb-8 md:mb-16">
            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-10">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg sm:text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center space-x-2 sm:space-x-2.5 md:space-x-3"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 text-blue-500" />
                <span>
                  {t("Izohlar", "Comments")} ({comments.length})
                </span>
              </motion.h3>
            </div>

            {/* Compact Add Comment */}
            <motion.div whileHover={{ scale: 1.005, y: -1 }}>
              <Card className="mb-4 sm:mb-6 md:mb-10 shadow-lg sm:shadow-xl md:shadow-2xl border border-blue-200 dark:border-blue-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                <CardContent className="p-3 sm:p-4 md:p-8">
                  <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-6">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ring-1 sm:ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="You" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-xs sm:text-sm md:text-base">
                        Y
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-6">
                      <input
                        type="text"
                        placeholder={t("Ismingizni kiriting...", "Enter your name...")}
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-3 sm:px-3.5 md:px-4 py-2 sm:py-2.5 md:py-3 border border-blue-200 dark:border-blue-700 rounded-lg sm:rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md backdrop-blur-sm text-sm sm:text-base md:text-lg"
                      />
                      <Textarea
                        placeholder={t("Izoh yozing...", "Write a comment...")}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[60px] sm:min-h-[80px] md:min-h-[120px] resize-none border border-blue-200 dark:border-blue-700 rounded-lg sm:rounded-xl bg-white/90 dark:bg-gray-800/90 focus:ring-1 sm:focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md backdrop-blur-sm text-sm sm:text-base md:text-lg"
                      />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <p className="text-xs sm:text-xs md:text-sm text-gray-500 font-medium">
                          {t(
                            "Hurmatli muloqot qoidalariga rioya qiling",
                            "Please follow respectful communication rules",
                          )}
                        </p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={handleCommentSubmit}
                            disabled={!newComment.trim() || !authorName.trim() || isSubmitting}
                            className="w-full sm:w-auto flex items-center justify-center space-x-2 sm:space-x-2.5 md:space-x-3 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg sm:shadow-xl font-semibold text-sm sm:text-base md:text-lg"
                          >
                            <Send className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            <span>{isSubmitting ? t("Yuborilmoqda...", "Sending...") : t("Yuborish", "Send")}</span>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Compact Comments List */}
            {commentsLoading ? (
              <div className="text-center py-8 sm:py-12 md:py-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 border-2 sm:border-3 md:border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg"
                />
                <p className="text-gray-500 text-sm sm:text-base md:text-xl font-medium">
                  {t("Izohlar yuklanmoqda...", "Loading comments...")}
                </p>
              </div>
            ) : comments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 sm:py-12 md:py-16"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-500" />
                </div>
                <p className="text-gray-500 text-sm sm:text-base md:text-xl font-medium">{t("Hozircha izohlar yo'q", "No comments yet")}</p>
              </motion.div>
            ) : (
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3 sm:space-y-4 md:space-y-8">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.005, y: -1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Card className="shadow-lg sm:shadow-xl border border-blue-200 dark:border-blue-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                      <CardContent className="p-3 sm:p-4 md:p-8">
                        <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-6">
                          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ring-1 sm:ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                            <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-xs sm:text-sm md:text-base">
                              {comment.author?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 mb-2 sm:mb-2.5 md:mb-3">
                              <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
                                {comment.author || "Anonim"}
                              </h4>
                              <span className="text-xs sm:text-xs md:text-sm text-gray-500 font-medium">{comment.date}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6 leading-relaxed text-sm sm:text-base md:text-lg">
                              {language === "uz" ? comment.content : comment.contentEn}
                            </p>
                            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
                              <motion.button
                                whileHover={{ scale: 1.02, y: -0.5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => handleCommentLike(comment.id, e)}
                                disabled={likedComments.has(comment.id) || likingComments.has(comment.id)}
                                className={`flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 text-xs sm:text-sm md:text-sm transition-colors font-medium ${
                                  likedComments.has(comment.id)
                                    ? "text-red-600"
                                    : likingComments.has(comment.id)
                                      ? "text-gray-400 cursor-not-allowed"
                                      : "text-gray-500 hover:text-red-600"
                                }`}
                              >
                                <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill={likedComments.has(comment.id) ? "red" : "none"} />
                                <span>{comment.likes}</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02, y: -0.5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setReplyTo(comment.id)}
                                className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 text-xs sm:text-sm md:text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium"
                              >
                                <Reply className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                                <span>{t("Javob", "Reply")}</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02, y: -0.5 }}
                                whileTap={{ scale: 0.98 }}
                                className="text-xs sm:text-sm md:text-sm text-gray-500 hover:text-gray-700 transition-colors"
                              >
                                <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                              </motion.button>
                            </div>

                            {/* Compact Reply Form */}
                            <AnimatePresence>
                              {replyTo === comment.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0, y: -10 }}
                                  animate={{ opacity: 1, height: "auto", y: 0 }}
                                  exit={{ opacity: 0, height: 0, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  className="mt-3 sm:mt-4 md:mt-6 pl-3 sm:pl-4 md:pl-6 border-l-2 sm:border-l-3 md:border-l-4 border-gradient-to-b from-blue-500 to-green-500"
                                >
                                  <div className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                                    <Avatar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ring-1 sm:ring-2 ring-green-500 ring-offset-1 sm:ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xs sm:text-sm">
                                        Y
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2 sm:space-y-3 md:space-y-4">
                                      {!authorName && (
                                        <input
                                          type="text"
                                          placeholder={t("Ismingizni kiriting...", "Enter your name...")}
                                          value={authorName}
                                          onChange={(e) => setAuthorName(e.target.value)}
                                          className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 border border-green-200 dark:border-green-700 rounded-md sm:rounded-lg md:rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-md backdrop-blur-sm text-xs sm:text-sm md:text-base"
                                        />
                                      )}
                                      <Textarea
                                        placeholder={t("Javob yozing...", "Write a reply...")}
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="min-h-[50px] sm:min-h-[60px] md:min-h-[100px] resize-none border border-green-200 dark:border-green-700 rounded-md sm:rounded-lg md:rounded-xl bg-white/90 dark:bg-gray-800/90 focus:ring-1 sm:focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-md backdrop-blur-sm text-xs sm:text-sm md:text-base"
                                      />
                                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3">
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-none">
                                          <Button
                                            size="sm"
                                            onClick={() => handleReplySubmit(comment.id)}
                                            disabled={!replyContent.trim() || !authorName.trim() || isSubmitting}
                                            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-md px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base"
                                          >
                                            {isSubmitting
                                              ? t("Yuborilmoqda...", "Sending...")
                                              : t("Javob yuborish", "Send reply")}
                                          </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-none">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              setReplyTo(null)
                                              setReplyContent("")
                                            }}
                                            className="w-full sm:w-auto border border-gray-300 hover:border-gray-400 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base"
                                          >
                                            {t("Bekor qilish", "Cancel")}
                                          </Button>
                                        </motion.div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Compact Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="mt-4 sm:mt-6 md:mt-8 pl-3 sm:pl-4 md:pl-6 border-l-2 sm:border-l-3 md:border-l-4 border-gradient-to-b from-blue-300 to-green-300 space-y-3 sm:space-y-4 md:space-y-6">
                                {comment.replies.map((reply) => (
                                  <motion.div
                                    key={reply.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-start space-x-2 sm:space-x-3 md:space-x-4"
                                  >
                                    <Avatar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ring-1 sm:ring-2 ring-cyan-500 ring-offset-1 sm:ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                                      <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.author} />
                                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xs sm:text-sm">
                                        {reply.author?.charAt(0) || "U"}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 mb-1 sm:mb-1.5 md:mb-2">
                                        <h5 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">
                                          {reply.author || "Anonim"}
                                        </h5>
                                        <span className="text-xs sm:text-xs md:text-xs text-gray-500 font-medium">{reply.date}</span>
                                      </div>
                                      <p className="text-gray-700 dark:text-gray-300 mb-2 sm:mb-2.5 md:mb-3 leading-relaxed text-xs sm:text-sm md:text-base">
                                        {language === "uz" ? reply.content : reply.contentEn}
                                      </p>
                                      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                                        <motion.button
                                          whileHover={{ scale: 1.02 }}
                                          whileTap={{ scale: 0.98 }}
                                          onClick={(e) => handleCommentLike(reply.id, e)}
                                          disabled={likedComments.has(reply.id) || likingComments.has(reply.id)}
                                          className={`flex items-center space-x-1 text-xs transition-colors font-medium ${
                                            likedComments.has(reply.id)
                                              ? "text-red-600"
                                              : likingComments.has(reply.id)
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-500 hover:text-red-600"
                                          }`}
                                        >
                                          <Heart
                                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                                            fill={likedComments.has(reply.id) ? "red" : "none"}
                                          />
                                          <span>{reply.likes}</span>
                                        </motion.button>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Compact Load More Comments */}
            {comments.length > 0 && (
              <div className="text-center mt-6 sm:mt-8 md:mt-12">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    className="px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-4 border border-blue-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 text-sm sm:text-base md:text-lg font-semibold shadow-md bg-transparent"
                  >
                    {t("Ko'proq izohlar", "Load more comments")}
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.section>

          {/* Compact Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <motion.section {...fadeInUp} transition={{ delay: 0.6 }}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg sm:text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-10"
              >
                {t("O'xshash maqolalar", "Related articles")}
              </motion.h3>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
              >
                {relatedPosts.slice(0, 2).map((relatedPost, index) => (
                  <motion.div key={relatedPost.id} variants={fadeInUp}>
                    <Link href={`/post/${relatedPost.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.01, y: -2, rotateY: 1 }}
                        whileTap={{ scale: 0.99 }}
                        className="group"
                      >
                        <Card className="overflow-hidden hover:shadow-lg sm:hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 border border-blue-200 dark:border-blue-700 shadow-md sm:shadow-lg md:shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500">
                          <div className="relative">
                            <Image
                              src={relatedPost.featured_image || "/placeholder.svg?height=200&width=400"}
                              alt={language === "uz" ? relatedPost.title_uz : relatedPost.title_en}
                              width={400}
                              height={200}
                              className="w-full h-32 sm:h-36 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 sm:top-2.5 md:top-3 left-2 sm:left-2.5 md:left-3">
                              <Badge className="bg-white/95 text-gray-900 shadow-md backdrop-blur-sm font-semibold text-xs sm:text-xs md:text-sm px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-0.5 md:py-1">
                                {language === "uz" ? relatedPost.category_name : relatedPost.category_name_en}
                              </Badge>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                          </div>
                          <CardContent className="p-3 sm:p-4 md:p-6">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4 line-clamp-2 text-sm sm:text-base md:text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {language === "uz" ? relatedPost.title_uz : relatedPost.title_en}
                            </h4>
                            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 text-xs sm:text-sm md:text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                <span>{formatDate(relatedPost.created_at)}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                <span>{relatedPost.views || 0}</span>
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )}
        </div>
      </main>

      {/* Compact Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-8 sm:py-12 md:py-20 mt-8 sm:mt-12 md:mt-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 mb-4 sm:mb-6 md:mb-8"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-lg sm:shadow-xl md:shadow-2xl">
                <span className="text-white font-bold text-sm sm:text-base md:text-2xl">M</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  Mansurbek Qazaqov
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-lg">{t("Shaxsiy blog", "Personal blog")}</p>
              </div>
            </motion.div>
            <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-6 mb-4 sm:mb-6 md:mb-8">
              <motion.a
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:mansurbekqazaqov27@gmail.com"
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-xs sm:text-sm md:text-lg flex items-center justify-center space-x-2 sm:space-x-2.5 md:space-x-3"
              >
                <span className="text-sm sm:text-base md:text-2xl">📧</span>
                <span className="break-all">mansurbekqazaqov27@gmail.com</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+998972112008"
                className="text-gray-300 hover:text-green-400 transition-all duration-300 text-xs sm:text-sm md:text-lg flex items-center justify-center space-x-2 sm:space-x-2.5 md:space-x-3"
              >
                <span className="text-sm sm:text-base md:text-2xl">📞</span>
                <span>+998 97 211 20 08</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                href="https://t.me/Mansurbek_Qazaqov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 text-xs sm:text-sm md:text-lg flex items-center justify-center space-x-2 sm:space-x-2.5 md:space-x-3"
              >
                <span className="text-sm sm:text-base md:text-2xl">📱</span>
                <span>@Mansurbek_Qazaqov</span>
              </motion.a>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              horizontal={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 text-xs sm:text-sm md:text-lg px-2"
            >
              © 2025 Mansurbek Qazaqov. {t("Barcha huquqlar himoyalangan.", "All rights reserved.")}
            </motion.p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}