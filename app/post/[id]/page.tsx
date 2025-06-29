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
import { YouTubeEmbed } from "@/components/youtube-embed" // YouTube component import

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const floatingLaptop = {
  animate: {
    y: [0, -25, 0],
    rotate: [0, 8, -8, 0],
    scale: [1, 1.08, 1],
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

// Enhanced Floating Background Component
const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Enhanced Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-32 left-32 w-80 h-80 bg-gradient-to-r from-blue-400/25 to-cyan-400/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 28,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-r from-green-400/25 to-emerald-400/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
      />

      {/* 6 Enhanced Floating Laptops with different sizes and animations */}
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 0, duration: 10 }}
        className="absolute top-40 left-20 opacity-18"
      >
        <Laptop className="w-24 h-24 text-blue-500 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 1.5, duration: 12 }}
        className="absolute top-80 right-40 opacity-22"
      >
        <Laptop className="w-20 h-20 text-blue-600 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 3, duration: 14 }}
        className="absolute bottom-60 left-1/4 opacity-15"
      >
        <Laptop className="w-28 h-28 text-cyan-500 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 4.5, duration: 9 }}
        className="absolute top-[450px] right-1/3 opacity-20"
      >
        <Laptop className="w-18 h-18 text-blue-400 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 6, duration: 11 }}
        className="absolute bottom-40 right-20 opacity-16"
      >
        <Laptop className="w-22 h-22 text-cyan-600 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 7.5, duration: 13 }}
        className="absolute top-[550px] left-1/3 opacity-12"
      >
        <Laptop className="w-19 h-19 text-blue-300 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>

      {/* Enhanced Sparkles */}
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 0 }}
        className="absolute top-60 left-1/2 opacity-35"
      >
        <Sparkles className="w-7 h-7 text-cyan-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 1 }}
        className="absolute bottom-80 right-1/4 opacity-30"
      >
        <Star className="w-5 h-5 text-blue-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 2 }}
        className="absolute top-96 left-1/4 opacity-25"
      >
        <Sparkles className="w-6 h-6 text-green-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 3 }}
        className="absolute bottom-[450px] right-1/3 opacity-28"
      >
        <Star className="w-4 h-4 text-cyan-500" />
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
        // Faqat liked state ni o'zgartiramiz, count ni emas
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

  // Ulashish funksiyasi
  const handleShare = async () => {
    try {
      const currentUrl = window.location.href

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2000)
      } else {
        // Fallback for older browsers
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

  // Loading state
  if (!isLoaded || postLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
        <FloatingBackground />
        <div className="text-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6 shadow-2xl"
          />
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            {t("Maqola yuklanmoqda...", "Loading article...")}
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (postError || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
        <FloatingBackground />
        <div className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <span className="text-white text-3xl">❌</span>
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
            {t("Maqola topilmadi", "Article not found")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            {t(
              "Kechirasiz, bu maqola mavjud emas yoki o'chirilgan.",
              "Sorry, this article doesn't exist or has been deleted.",
            )}
          </p>
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-3 text-lg shadow-xl">
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

      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-gray-900/85 border-b border-blue-200/50 dark:border-blue-700/50 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/" className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold text-lg">M</span>
                </motion.div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Mansurbek Qazaqov
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-800 dark:to-cyan-800 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-700 dark:hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-semibold">{language.toUpperCase()}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-3 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 text-green-700 dark:text-green-300 hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-700 dark:hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Article Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Article Header */}
          <motion.div {...fadeInUp} className="mb-12">
            <div className="mb-8">
              <motion.div whileHover={{ scale: 1.05 }} className="inline-block mb-6">
                <Badge className="px-6 py-2 text-lg bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900 dark:to-cyan-900 dark:text-blue-200 shadow-lg">
                  {language === "uz" ? post.category_name : post.category_name_en}
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent mb-8 leading-tight drop-shadow-lg"
              >
                {language === "uz" ? post.title_uz : post.title_en}
              </motion.h1>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-wrap items-center gap-8 text-gray-600 dark:text-gray-400 mb-8"
            >
              <motion.div variants={fadeInUp} className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                  <AvatarImage src={post.author_avatar || "/placeholder.svg?height=48&width=48"} alt={post.author} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold">
                    {post.author?.charAt(0) || "M"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">{post.author}</p>
                  <p className="text-sm">{t("Muallif", "Author")}</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{formatDate(post.created_at)}</span>
              </motion.div>
              {/* O'qish vaqti faqat mavjud bo'lsa ko'rsatiladi */}
              {post.read_time && (
                <motion.div variants={fadeInUp} className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <span className="font-medium">
                    {post.read_time} {t("daqiqa", "min read")}
                  </span>
                </motion.div>
              )}
              <motion.div variants={fadeInUp} className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-cyan-500" />
                <span className="font-medium">
                  {post.views || 0} {t("ko'rishlar", "views")}
                </span>
              </motion.div>
            </motion.div>

            {/* Enhanced Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex flex-wrap gap-3 mb-10"
              >
                {(language === "uz" ? post.tags : post.tags_en || post.tags).map((tag, index) => (
                  <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -2 }}>
                    <Badge
                      variant="secondary"
                      className="text-sm px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 text-gray-700 dark:from-blue-900 dark:to-green-900 dark:text-gray-300 shadow-md"
                    >
                      #{typeof tag === "object" ? (language === "uz" ? tag.name : tag.name_en) : tag}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* YouTube Video Section - Yangi qo'shildi */}
          {post.youtube_url && (
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <Youtube className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    {t("Video", "Video")}
                  </h2>
                </div>
                <YouTubeEmbed
                  url={post.youtube_url}
                  title={language === "uz" ? post.title_uz : post.title_en}
                  className="shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Featured Image */}
          {post.featured_image && (
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="mb-16">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <Image
                  src={post.featured_image || "/placeholder.svg"}
                  alt={language === "uz" ? post.title_uz : post.title_en}
                  width={1200}
                  height={600}
                  className="w-full h-96 md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Article Content */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="prose prose-xl max-w-none dark:prose-invert mb-16 prose-headings:bg-gradient-to-r prose-headings:from-blue-600 prose-headings:to-green-600 prose-headings:bg-clip-text prose-headings:text-transparent prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg"
          >
            <div
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-200/50 dark:border-blue-700/50"
              dangerouslySetInnerHTML={{
                __html: language === "uz" ? post.content_uz : post.content_en,
              }}
            />
          </motion.div>

          {/* Enhanced Reactions */}
          <motion.section {...fadeInUp} transition={{ delay: 0.8 }} className="mb-16">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="flex items-center justify-between p-8 bg-gradient-to-r from-blue-50/80 via-cyan-50/80 to-green-50/80 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-green-900/30 rounded-3xl shadow-xl backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50"
            >
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
            </motion.div>
          </motion.section>

          {/* Enhanced Comments Section */}
          <motion.section {...fadeInUp} transition={{ delay: 1.0 }} className="mb-16">
            <div className="flex items-center justify-between mb-10">
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center space-x-3"
              >
                <MessageCircle className="w-8 h-8 text-blue-500" />
                <span>
                  {t("Izohlar", "Comments")} ({comments.length})
                </span>
              </motion.h3>
            </div>

            {/* Enhanced Add Comment */}
            <motion.div whileHover={{ scale: 1.01, y: -2 }}>
              <Card className="mb-10 shadow-2xl border-2 border-blue-200 dark:border-blue-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <Avatar className="w-12 h-12 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="You" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold">
                        Y
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-6">
                      <input
                        type="text"
                        placeholder={t("Ismingizni kiriting...", "Enter your name...")}
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-700 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg backdrop-blur-sm text-lg"
                      />
                      <Textarea
                        placeholder={t("Izoh yozing...", "Write a comment...")}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[120px] resize-none border-2 border-blue-200 dark:border-blue-700 rounded-xl bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg backdrop-blur-sm text-lg"
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">
                          {t(
                            "Hurmatli muloqot qoidalariga rioya qiling",
                            "Please follow respectful communication rules",
                          )}
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={handleCommentSubmit}
                            disabled={!newComment.trim() || !authorName.trim() || isSubmitting}
                            className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-xl font-semibold text-lg"
                          >
                            <Send className="w-5 h-5" />
                            <span>{isSubmitting ? t("Yuborilmoqda...", "Sending...") : t("Yuborish", "Send")}</span>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Comments List */}
            {commentsLoading ? (
              <div className="text-center py-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6 shadow-2xl"
                />
                <p className="text-gray-500 text-xl font-medium">
                  {t("Izohlar yuklanmoqda...", "Loading comments...")}
                </p>
              </div>
            ) : comments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-gray-500" />
                </div>
                <p className="text-gray-500 text-xl font-medium">{t("Hozircha izohlar yo'q", "No comments yet")}</p>
              </motion.div>
            ) : (
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.01, y: -2 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="shadow-xl border-2 border-blue-200 dark:border-blue-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                          <Avatar className="w-12 h-12 ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                            <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold">
                              {comment.author?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                                {comment.author || "Anonim"}
                              </h4>
                              <span className="text-sm text-gray-500 font-medium">{comment.date}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                              {language === "uz" ? comment.content : comment.contentEn}
                            </p>
                            <div className="flex items-center space-x-6">
                              <motion.button
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => handleCommentLike(comment.id, e)}
                                disabled={likedComments.has(comment.id) || likingComments.has(comment.id)}
                                className={`flex items-center space-x-2 text-sm transition-colors font-medium ${
                                  likedComments.has(comment.id)
                                    ? "text-red-600"
                                    : likingComments.has(comment.id)
                                      ? "text-gray-400 cursor-not-allowed"
                                      : "text-gray-500 hover:text-red-600"
                                }`}
                              >
                                <Heart className="w-5 h-5" fill={likedComments.has(comment.id) ? "red" : "none"} />
                                <span>{comment.likes}</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setReplyTo(comment.id)}
                                className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium"
                              >
                                <Reply className="w-5 h-5" />
                                <span>{t("Javob berish", "Reply")}</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                              >
                                <MoreHorizontal className="w-5 h-5" />
                              </motion.button>
                            </div>

                            {/* Enhanced Reply Form */}
                            <AnimatePresence>
                              {replyTo === comment.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0, y: -20 }}
                                  animate={{ opacity: 1, height: "auto", y: 0 }}
                                  exit={{ opacity: 0, height: 0, y: -20 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-6 pl-6 border-l-4 border-gradient-to-b from-blue-500 to-green-500"
                                >
                                  <div className="flex items-start space-x-4">
                                    <Avatar className="w-10 h-10 ring-2 ring-green-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold">
                                        Y
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-4">
                                      {!authorName && (
                                        <input
                                          type="text"
                                          placeholder={t("Ismingizni kiriting...", "Enter your name...")}
                                          value={authorName}
                                          onChange={(e) => setAuthorName(e.target.value)}
                                          className="w-full px-4 py-3 border-2 border-green-200 dark:border-green-700 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-lg backdrop-blur-sm"
                                        />
                                      )}
                                      <Textarea
                                        placeholder={t("Javob yozing...", "Write a reply...")}
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="min-h-[100px] resize-none border-2 border-green-200 dark:border-green-700 rounded-xl bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-lg backdrop-blur-sm"
                                      />
                                      <div className="flex items-center space-x-3">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button
                                            size="sm"
                                            onClick={() => handleReplySubmit(comment.id)}
                                            disabled={!replyContent.trim() || !authorName.trim() || isSubmitting}
                                            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg px-6 py-2"
                                          >
                                            {isSubmitting
                                              ? t("Yuborilmoqda...", "Sending...")
                                              : t("Javob yuborish", "Send reply")}
                                          </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              setReplyTo(null)
                                              setReplyContent("")
                                            }}
                                            className="border-2 border-gray-300 hover:border-gray-400 px-6 py-2"
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

                            {/* Enhanced Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="mt-8 pl-6 border-l-4 border-gradient-to-b from-blue-300 to-green-300 space-y-6">
                                {comment.replies.map((reply) => (
                                  <motion.div
                                    key={reply.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-start space-x-4"
                                  >
                                    <Avatar className="w-10 h-10 ring-2 ring-cyan-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                                      <AvatarImage src={reply.avatar || "/placeholder.svg"} alt={reply.author} />
                                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold">
                                        {reply.author?.charAt(0) || "U"}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-3 mb-2">
                                        <h5 className="font-semibold text-gray-900 dark:text-white">
                                          {reply.author || "Anonim"}
                                        </h5>
                                        <span className="text-xs text-gray-500 font-medium">{reply.date}</span>
                                      </div>
                                      <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                                        {language === "uz" ? reply.content : reply.contentEn}
                                      </p>
                                      <div className="flex items-center space-x-4">
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
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
                                            className="w-4 h-4"
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

            {/* Enhanced Load More Comments */}
            {comments.length > 0 && (
              <div className="text-center mt-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="px-12 py-4 border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 text-lg font-semibold shadow-lg bg-transparent"
                  >
                    {t("Ko'proq izohlarni yuklash", "Load more comments")}
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.section>

          {/* Enhanced Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <motion.section {...fadeInUp} transition={{ delay: 1.2 }}>
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-10"
              >
                {t("O'xshash maqolalar", "Related articles")}
              </motion.h3>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid md:grid-cols-2 gap-8"
              >
                {relatedPosts.slice(0, 2).map((relatedPost, index) => (
                  <motion.div key={relatedPost.id} variants={fadeInUp}>
                    <Link href={`/post/${relatedPost.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.03, y: -5, rotateY: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group"
                      >
                        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 dark:border-blue-700 shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500">
                          <div className="relative">
                            <Image
                              src={relatedPost.featured_image || "/placeholder.svg?height=200&width=400"}
                              alt={language === "uz" ? relatedPost.title_uz : relatedPost.title_en}
                              width={400}
                              height={200}
                              className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-white/95 text-gray-900 shadow-lg backdrop-blur-sm font-semibold">
                                {language === "uz" ? relatedPost.category_name : relatedPost.category_name_en}
                              </Badge>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                          <CardContent className="p-6">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {language === "uz" ? relatedPost.title_uz : relatedPost.title_en}
                            </h4>
                            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(relatedPost.created_at)}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
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

      {/* Enhanced Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-20 mt-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="flex items-center justify-center space-x-4 mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  Mansurbek Qazaqov
                </h3>
                <p className="text-gray-400 text-lg">{t("Shaxsiy blog", "Personal blog")}</p>
              </div>
            </motion.div>
            <div className="flex justify-center space-x-12 mb-8">
              <div className="flex flex-col space-y-6">
                <motion.a
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="mailto:mansurbekqazaqov27@gmail.com"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-lg flex items-center space-x-3"
                >
                  <span className="text-2xl">📧</span>
                  <span>mansurbekqazaqov27@gmail.com</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="tel:+998972112008"
                  className="text-gray-300 hover:text-green-400 transition-all duration-300 text-lg flex items-center space-x-3"
                >
                  <span className="text-2xl">📞</span>
                  <span>+998 97 211 20 08</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://t.me/Mansurbek_Qazaqov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-all duration-300 text-lg flex items-center space-x-3"
                >
                  <span className="text-2xl">📱</span>
                  <span>@Mansurbek_Qazaqov</span>
                </motion.a>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-gray-400 text-lg"
            >
              © 2025 Mansurbek Qazaqov. {t("Barcha huquqlar himoyalangan.", "All rights reserved.")}
            </motion.p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
