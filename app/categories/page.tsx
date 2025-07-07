"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Calendar,
  Eye,
  MessageCircle,
  Globe,
  Moon,
  Sun,
  ArrowLeft,
  Filter,
  Grid,
  List,
  ImageIcon,
  BookOpen,
  Heart,
  Laptop,
  Sparkles,
  Youtube,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useGlobalSettings } from "@/hooks/useGlobalSettings"
import { YouTubeEmbed } from "@/components/youtube-embed"

// Enhanced Animation variants
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
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    scale: [1, 1.05, 1],
  },
  transition: {
    duration: 6,
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
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

// Floating Background Component
const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
      />

      {/* 6 Floating Laptops with different sizes */}
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 0 }}
        className="absolute top-32 left-16 opacity-15"
      >
        <Laptop className="w-24 h-24 text-blue-500 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 1, duration: 8 }}
        className="absolute top-64 right-32 opacity-20"
      >
        <Laptop className="w-20 h-20 text-blue-600 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 2, duration: 10 }}
        className="absolute bottom-48 left-1/4 opacity-12"
      >
        <Laptop className="w-28 h-28 text-cyan-500 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 3, duration: 7 }}
        className="absolute top-96 right-1/3 opacity-18"
      >
        <Laptop className="w-16 h-16 text-blue-400 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 4, duration: 9 }}
        className="absolute bottom-32 right-16 opacity-15"
      >
        <Laptop className="w-22 h-22 text-cyan-600 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 5, duration: 11 }}
        className="absolute top-80 left-1/3 opacity-10"
      >
        <Laptop className="w-18 h-18 text-blue-300 drop-shadow-2xl" />
      </motion.div>

      {/* Sparkles */}
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 0 }}
        className="absolute top-40 left-1/2 opacity-30"
      >
        <Sparkles className="w-6 h-6 text-cyan-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 1 }}
        className="absolute bottom-60 right-1/4 opacity-25"
      >
        <Sparkles className="w-4 h-4 text-blue-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 2 }}
        className="absolute top-72 left-1/4 opacity-20"
      >
        <Sparkles className="w-5 h-5 text-green-400" />
      </motion.div>
    </div>
  )
}

// Types
interface Post {
  id: string
  title_uz: string
  title_en: string
  excerpt_uz: string
  excerpt_en: string
  category_name: string
  category_name_en: string
  featured_image?: string
  youtube_url?: string // YouTube URL qo'shildi
  created_at: string
  views?: number
  comments_count?: number
  likes_count?: number
}

interface Category {
  name_uz: string
  name_en: string
}

export default function CategoriesPage() {
  // 1. Birinchi navbatda global settings hook
  const { language, darkMode, isLoaded, toggleLanguage, toggleDarkMode, t } = useGlobalSettings()

  // 2. Keyin barcha boshqa state lar
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  // 3. Barcha useEffect lar
  // Fetch posts
  useEffect(() => {
    setLoading(true)
    fetch("/api/posts?published=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data)
        } else {
          console.error("API Error:", data.error)
          // Fallback: bo'sh array
          setPosts([])
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error)
        // Fallback: bo'sh array
        setPosts([])
      })
      .finally(() => setLoading(false))
  }, [])

  // 4. useMemo hook larni useEffect dan keyin qo'ying
  // Get unique categories
  const categories = useMemo(() => {
    const map = new Map<string, Category>()
    posts.forEach((post) => {
      const key = post.category_name || post.category_name_en || ""
      if (!map.has(key)) {
        map.set(key, {
          name_uz: post.category_name || "",
          name_en: post.category_name_en || "",
        })
      }
    })
    return Array.from(map.values())
  }, [posts])

  // Filter posts based on search and category - XATO TUZATILDI
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      const matchCategory = selectedCategory
        ? language === "uz"
          ? (post.category_name || "") === selectedCategory
          : (post.category_name_en || "") === selectedCategory
        : true

      // Search filter
      if (!searchQuery.trim()) {
        return matchCategory
      }

      const term = searchQuery.toLowerCase()

      // Null-safe text extraction
      const titleText = language === "uz" ? post.title_uz || "" : post.title_en || ""
      const excerptText = language === "uz" ? post.excerpt_uz || "" : post.excerpt_en || ""

      // Safe toLowerCase calls
      const title = titleText.toLowerCase()
      const excerpt = excerptText.toLowerCase()

      const matchesSearch = title.includes(term) || excerpt.includes(term)

      return matchCategory && matchesSearch
    })
  }, [posts, selectedCategory, searchQuery, language])

  // 5. Helper function lar
  const formatDate = (dateString: string) => dateString.split("T")[0]

  const getPostCount = (categoryName: string) => {
    return posts.filter((post) =>
      language === "uz" ? post.category_name === categoryName : post.category_name_en === categoryName,
    ).length
  }

  // Like handler qo'shing
  const handleLike = async (postId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "like" }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Update local state
          setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === postId ? { ...post, likes_count: data.data.likes_count } : post)),
          )
        }
      }
    } catch (error) {
      console.error("Like error:", error)
    }
  }

  // 6. Loading check ni eng oxirida qo'ying
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
        <FloatingBackground />
        <div className="text-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4 shadow-lg"
          />
          <p className="text-gray-600 dark:text-gray-300 font-medium">{t("Yuklanmoqda...", "Loading...")}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode ? "dark bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" : "bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50"}`}
    >
      <FloatingBackground />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-blue-200/50 dark:border-blue-700/50 shadow-xl"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-800 dark:to-cyan-800 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-700 dark:hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">{language.toUpperCase()}</span>
            </motion.button>

            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 text-green-700 dark:text-green-300 hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-700 dark:hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        {...fadeInUp}
        className="relative py-20 bg-gradient-to-br from-blue-100/50 via-cyan-100/50 to-green-100/50 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-green-900/30 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent mb-6 drop-shadow-lg"
          >
            {t("Kategoriyalar", "Categories")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed"
          >
            {t(
              "Turli mavzulardagi maqolalarni kategoriyalar bo'yicha ko'rib chiqing",
              "Browse articles by categories on various topics",
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <Input
                type="text"
                placeholder={t("Maqola qidirish...", "Search articles...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/90 dark:bg-gray-800/90 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl shadow-lg backdrop-blur-sm text-lg"
              />
            </div>

            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setViewMode("grid")}
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="lg"
                  className={`h-14 px-6 rounded-xl shadow-lg transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      : "border-2 border-blue-300 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setViewMode("list")}
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="lg"
                  className={`h-14 px-6 rounded-xl shadow-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      : "border-2 border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
                  }`}
                >
                  <List className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Cards */}
      <motion.section {...fadeInUp} className="container mx-auto px-4 mb-20 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {categories.map((category, index) => {
            const categoryName = language === "uz" ? category.name_uz : category.name_en
            const isSelected = selectedCategory === categoryName

            return (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div
                  whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(isSelected ? null : categoryName)}
                  className={`p-8 rounded-2xl cursor-pointer transition-all duration-500 shadow-xl hover:shadow-2xl border-2 backdrop-blur-sm ${
                    isSelected
                      ? "bg-gradient-to-br from-blue-500 via-cyan-500 to-green-500 text-white border-blue-300 shadow-blue-500/25"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500"
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                      isSelected
                        ? "bg-white/20 backdrop-blur-sm"
                        : "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900"
                    }`}
                  >
                    <BookOpen
                      className={`w-10 h-10 ${isSelected ? "text-white" : "text-blue-600 dark:text-blue-400"}`}
                    />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3">{categoryName}</h3>

                  <p className={`text-sm mb-3 ${isSelected ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>
                    {isSelected ? t("Tanlangan", "Selected") : t("Bo'limni tanlang", "Select category")}
                  </p>

                  <p className="text-lg font-semibold">
                    {getPostCount(categoryName)} {t("maqola", "posts")}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-center mt-10"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="px-8 py-4 text-lg border-2 border-blue-400 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Filter className="w-5 h-5 mr-3" />
                {t("Barcha kategoriyalar", "All categories")}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.section>

      {/* Posts Section */}
      <motion.section {...fadeInUp} className="container mx-auto px-4 pb-20 relative z-10">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            {selectedCategory
              ? `${selectedCategory} ${t("kategoriyasi", "category")}`
              : t("Barcha maqolalar", "All articles")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
            {filteredPosts.length} {t("maqola topildi", "articles found")}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6 shadow-lg"
            />
            <p className="text-gray-500 text-lg">{t("Yuklanmoqda...", "Loading...")}</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t("Postlar topilmadi.", "No posts found.")}</p>
          </div>
        ) : viewMode === "grid" ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <Link href={`/post/${post.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 dark:border-blue-700 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500">
                      <div className="relative">
                        {/* YouTube Video Preview yoki Featured Image */}
                        {post.youtube_url ? (
                          <div className="relative">
                            <YouTubeEmbed
                              url={post.youtube_url}
                              title={language === "uz" ? post.title_uz : post.title_en}
                              className="h-52"
                              showExternalLink={false}
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-red-600 text-white shadow-lg backdrop-blur-sm font-semibold flex items-center space-x-1">
                                <Youtube className="w-3 h-3" />
                                <span>Video</span>
                              </Badge>
                            </div>
                          </div>
                        ) : post.featured_image ? (
                          <Image
                            src={post.featured_image || "/placeholder.svg"}
                            alt={language === "uz" ? post.title_uz : post.title_en}
                            width={400}
                            height={300}
                            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-52 bg-gradient-to-br from-blue-200 via-cyan-200 to-green-200 dark:from-blue-800 dark:via-cyan-800 dark:to-green-800 flex items-center justify-center">
                            <ImageIcon className="text-blue-500 w-16 h-16" />
                          </div>
                        )}

                        {!post.youtube_url && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-white/95 text-blue-800 hover:bg-white shadow-lg backdrop-blur-sm font-semibold">
                              {language === "uz" ? post.category_name : post.category_name_en}
                            </Badge>
                          </div>
                        )}

                        <div className="absolute top-4 right-4">
                          <motion.button
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleLike(post.id, e)}
                            className="p-3 bg-white/95 rounded-full hover:bg-white transition-all duration-300 shadow-lg backdrop-blur-sm"
                          >
                            <Heart className="w-5 h-5 text-red-500" />
                          </motion.button>
                        </div>
                      </div>

                      <CardContent className="p-8">
                        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(post.created_at)}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-2" />
                            {post.views || 0}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {post.comments_count || 0}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-2" />
                            {post.likes_count || 0}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {language === "uz" ? post.title_uz : post.title_en}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                          {language === "uz" ? post.excerpt_uz : post.excerpt_en}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <Link href={`/post/${post.id}`}>
                  <motion.div whileHover={{ scale: 1.02, x: 15 }} whileTap={{ scale: 0.99 }} className="group">
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 dark:border-blue-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-8">
                          {/* YouTube Video Preview yoki Featured Image */}
                          {post.youtube_url ? (
                            <div className="relative w-56 h-36">
                              <YouTubeEmbed
                                url={post.youtube_url}
                                title={language === "uz" ? post.title_uz : post.title_en}
                                className="w-full h-full"
                                showExternalLink={false}
                              />
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-red-600 text-white shadow-lg backdrop-blur-sm font-semibold flex items-center space-x-1 text-xs">
                                  <Youtube className="w-3 h-3" />
                                  <span>Video</span>
                                </Badge>
                              </div>
                            </div>
                          ) : post.featured_image ? (
                            <Image
                              src={post.featured_image || "/placeholder.svg"}
                              alt={language === "uz" ? post.title_uz : post.title_en}
                              width={200}
                              height={150}
                              className="w-56 h-36 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-lg"
                            />
                          ) : (
                            <div className="w-56 h-36 flex items-center justify-center bg-gradient-to-br from-blue-200 via-cyan-200 to-green-200 dark:from-blue-800 dark:via-cyan-800 dark:to-green-800 rounded-xl shadow-lg">
                              <ImageIcon className="text-blue-500 w-12 h-12" />
                            </div>
                          )}

                          <div className="flex-1">
                            <div className="flex items-center space-x-6 mb-4">
                              <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900 dark:to-cyan-900 dark:text-blue-200 font-semibold px-4 py-2">
                                {language === "uz" ? post.category_name : post.category_name_en}
                              </Badge>

                              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {formatDate(post.created_at)}
                                </span>
                                <span className="flex items-center">
                                  <Eye className="w-4 h-4 mr-2" />
                                  {post.views || 0}
                                </span>
                                <span className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-2" />
                                  {post.comments_count || 0}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => handleLike(post.id, e)}
                                  className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
                                >
                                  <Heart className="w-4 h-4" />
                                  <span>{post.likes_count || 0}</span>
                                </motion.button>
                              </div>
                            </div>

                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {language === "uz" ? post.title_uz : post.title_en}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-lg leading-relaxed">
                              {language === "uz" ? post.excerpt_uz : post.excerpt_en}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>

      {/* Enhanced Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-20 mt-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
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

            <div className="flex flex-col space-y-6 mb-8">
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:mansurbekqazaqov27@gmail.com"
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-lg flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">📧</span>
                <span>mansurbekqazaqov27@gmail.com</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.9 }}
                href="tel:+998972112008"
                className="text-gray-300 hover:text-green-400 transition-all duration-300 text-lg flex items-center justify-center space-x-3"
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
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 text-lg flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">📱</span>
                <span>@Mansurbek_Qazaqov</span>
              </motion.a>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
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
