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
      {/* Gradient Orbs - Mobile optimized */}
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
        className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
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
        className="absolute bottom-10 right-10 w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
      />

      {/* Floating Laptops - Mobile optimized */}
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 0 }}
        className="absolute top-20 left-8 opacity-8 sm:opacity-10 md:opacity-15"
      >
        <Laptop className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-blue-500 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 1, duration: 8 }}
        className="absolute top-40 right-16 opacity-10 sm:opacity-15 md:opacity-20"
      >
        <Laptop className="w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 text-blue-600 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 2, duration: 10 }}
        className="absolute bottom-32 left-1/4 opacity-6 sm:opacity-8 md:opacity-12"
      >
        <Laptop className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-28 lg:h-28 text-cyan-500 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 3, duration: 7 }}
        className="absolute top-60 right-1/3 opacity-8 sm:opacity-12 md:opacity-18"
      >
        <Laptop className="w-5 h-5 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-blue-400 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 4, duration: 9 }}
        className="absolute bottom-20 right-8 opacity-8 sm:opacity-10 md:opacity-15"
      >
        <Laptop className="w-7 h-7 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-22 lg:h-22 text-cyan-600 drop-shadow-2xl" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 5, duration: 11 }}
        className="absolute top-52 left-1/3 opacity-6 sm:opacity-8 md:opacity-10"
      >
        <Laptop className="w-6 h-6 sm:w-9 sm:h-9 md:w-14 md:h-14 lg:w-18 lg:h-18 text-blue-300 drop-shadow-2xl" />
      </motion.div>

      {/* Sparkles - Mobile optimized */}
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 0 }}
        className="absolute top-32 left-1/2 opacity-15 sm:opacity-20 md:opacity-30"
      >
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-cyan-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 1 }}
        className="absolute bottom-40 right-1/4 opacity-10 sm:opacity-15 md:opacity-25"
      >
        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 2 }}
        className="absolute top-48 left-1/4 opacity-8 sm:opacity-12 md:opacity-20"
      >
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 text-green-400" />
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
        <div className="text-center relative z-10 px-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-2 sm:border-3 md:border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg"
          />
          <p className="text-gray-600 dark:text-gray-300 font-medium text-xs sm:text-sm md:text-base">{t("Yuklanmoqda...", "Loading...")}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode ? "dark bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" : "bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50"}`}
    >
      <FloatingBackground />

      {/* Header - Compact Mobile */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-blue-200/50 dark:border-blue-700/50 shadow-xl"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </motion.button>
            </Link>
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-lg"
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
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-800 dark:to-cyan-800 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-700 dark:hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              <span className="text-xs sm:text-xs md:text-sm font-semibold">{language.toUpperCase()}</span>
            </motion.button>

            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 text-green-700 dark:text-green-300 hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-700 dark:hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {darkMode ? <Sun className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Compact */}
      <motion.section
        {...fadeInUp}
        className="relative py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-100/50 via-cyan-100/50 to-green-100/50 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-green-900/30 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center max-w-4xl relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 drop-shadow-lg"
          >
            {t("Kategoriyalar", "Categories")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-relaxed px-2"
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
            className="flex flex-col gap-2 sm:gap-3 md:gap-4 max-w-3xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-2.5 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <Input
                type="text"
                placeholder={t("Maqola qidirish...", "Search articles...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 sm:pl-10 md:pl-12 h-10 sm:h-12 md:h-14 bg-white/90 dark:bg-gray-800/90 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-lg sm:rounded-xl shadow-lg backdrop-blur-sm text-sm sm:text-base md:text-lg"
              />
            </div>

            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setViewMode("grid")}
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="lg"
                  className={`h-10 sm:h-12 md:h-14 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      : "border-2 border-blue-300 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setViewMode("list")}
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="lg"
                  className={`h-10 sm:h-12 md:h-14 px-3 sm:px-4 md:px-6 rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      : "border-2 border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
                  }`}
                >
                  <List className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Cards - Compact */}
      <motion.section {...fadeInUp} className="container mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-12 md:mb-16 lg:mb-20 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
        >
          {categories.map((category, index) => {
            const categoryName = language === "uz" ? category.name_uz : category.name_en
            const isSelected = selectedCategory === categoryName

            return (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(isSelected ? null : categoryName)}
                  className={`p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer transition-all duration-500 shadow-xl hover:shadow-2xl border-2 backdrop-blur-sm ${
                    isSelected
                      ? "bg-gradient-to-br from-blue-500 via-cyan-500 to-green-500 text-white border-blue-300 shadow-blue-500/25"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500"
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 lg:mb-6 shadow-lg ${
                      isSelected
                        ? "bg-white/20 backdrop-blur-sm"
                        : "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900"
                    }`}
                  >
                    <BookOpen
                      className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 ${isSelected ? "text-white" : "text-blue-600 dark:text-blue-400"}`}
                    />
                  </motion.div>

                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold mb-1 sm:mb-2 md:mb-3 line-clamp-2">{categoryName}</h3>

                  <p className={`text-xs sm:text-xs md:text-sm mb-1 sm:mb-2 md:mb-3 ${isSelected ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>
                    {isSelected ? t("Tanlangan", "Selected") : t("Bo'limni tanlang", "Select category")}
                  </p>

                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
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
            className="text-center mt-4 sm:mt-6 md:mt-8 lg:mt-10"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg border-2 border-blue-400 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2 md:mr-3" />
                {t("Barcha kategoriyalar", "All categories")}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.section>

      {/* Posts Section - Compact */}
      <motion.section {...fadeInUp} className="container mx-auto px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16 lg:pb-20 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8 lg:mb-10 gap-2 sm:gap-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            {selectedCategory
              ? `${selectedCategory} ${t("kategoriyasi", "category")}`
              : t("Barcha maqolalar", "All articles")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-medium">
            {filteredPosts.length} {t("maqola topildi", "articles found")}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8 sm:py-12 md:py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 sm:border-3 md:border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg"
            />
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">{t("Yuklanmoqda...", "Loading...")}</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-8 sm:py-12 md:py-16">
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">{t("Postlar topilmadi.", "No posts found.")}</p>
          </div>
        ) : viewMode === "grid" ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <Link href={`/post/${post.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 dark:border-blue-700 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500">
                      <div className="relative">
                        {/* YouTube Video Preview yoki Featured Image - Compact */}
                        {post.youtube_url ? (
                          <div className="relative">
                            <YouTubeEmbed
                              url={post.youtube_url}
                              title={language === "uz" ? post.title_uz : post.title_en}
                              className="h-32 sm:h-36 md:h-40 lg:h-48 xl:h-52"
                              showExternalLink={false}
                            />
                            <div className="absolute top-1.5 sm:top-2 md:top-4 left-1.5 sm:left-2 md:left-4">
                              <Badge className="bg-red-600 text-white shadow-lg backdrop-blur-sm font-semibold flex items-center space-x-0.5 sm:space-x-1 text-xs">
                                <Youtube className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
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
                            className="w-full h-32 sm:h-36 md:h-40 lg:h-48 xl:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-32 sm:h-36 md:h-40 lg:h-48 xl:h-52 bg-gradient-to-br from-blue-200 via-cyan-200 to-green-200 dark:from-blue-800 dark:via-cyan-800 dark:to-green-800 flex items-center justify-center">
                            <ImageIcon className="text-blue-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16" />
                          </div>
                        )}

                        {!post.youtube_url && (
                          <div className="absolute top-1.5 sm:top-2 md:top-4 left-1.5 sm:left-2 md:left-4">
                            <Badge className="bg-white/95 text-blue-800 hover:bg-white shadow-lg backdrop-blur-sm font-semibold text-xs">
                              {language === "uz" ? post.category_name : post.category_name_en}
                            </Badge>
                          </div>
                        )}

                        <div className="absolute top-1.5 sm:top-2 md:top-4 right-1.5 sm:right-2 md:right-4">
                          <motion.button
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleLike(post.id, e)}
                            className="p-1.5 sm:p-2 md:p-3 bg-white/95 rounded-full hover:bg-white transition-all duration-300 shadow-lg backdrop-blur-sm"
                          >
                            <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-500" />
                          </motion.button>
                        </div>
                      </div>

                      <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
                        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 md:mb-4">
                          <span className="flex items-center">
                            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                            {formatDate(post.created_at)}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                            {post.views || 0}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                            {post.comments_count || 0}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                            {post.likes_count || 0}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {language === "uz" ? post.title_uz : post.title_en}
                        </h3>

                        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 md:mb-4 line-clamp-3 leading-relaxed">
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
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <Link href={`/post/${post.id}`}>
                  <motion.div whileHover={{ scale: 1.01, x: 5 }} whileTap={{ scale: 0.99 }} className="group">
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 dark:border-blue-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500">
                      <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 lg:space-x-6 xl:space-x-8">
                          {/* YouTube Video Preview yoki Featured Image - Compact */}
                          {post.youtube_url ? (
                            <div className="relative w-full sm:w-32 md:w-40 lg:w-48 xl:w-56 h-24 sm:h-20 md:h-24 lg:h-28 xl:h-36 flex-shrink-0">
                              <YouTubeEmbed
                                url={post.youtube_url}
                                title={language === "uz" ? post.title_uz : post.title_en}
                                className="w-full h-full rounded-lg sm:rounded-xl"
                                showExternalLink={false}
                              />
                              <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 md:top-2 md:left-2">
                                <Badge className="bg-red-600 text-white shadow-lg backdrop-blur-sm font-semibold flex items-center space-x-0.5 sm:space-x-1 text-xs">
                                  <Youtube className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
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
                              className="w-full sm:w-32 md:w-40 lg:w-48 xl:w-56 h-24 sm:h-20 md:h-24 lg:h-28 xl:h-36 object-cover rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-lg flex-shrink-0"
                            />
                          ) : (
                            <div className="w-full sm:w-32 md:w-40 lg:w-48 xl:w-56 h-24 sm:h-20 md:h-24 lg:h-28 xl:h-36 flex items-center justify-center bg-gradient-to-br from-blue-200 via-cyan-200 to-green-200 dark:from-blue-800 dark:via-cyan-800 dark:to-green-800 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                              <ImageIcon className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 md:mb-4 gap-2 sm:gap-4">
                              <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900 dark:to-cyan-900 dark:text-blue-200 font-semibold px-2 sm:px-3 py-0.5 sm:py-1 text-xs w-fit">
                                {language === "uz" ? post.category_name : post.category_name_en}
                              </Badge>

                              <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 text-xs text-gray-600 dark:text-gray-400">
                                <span className="flex items-center">
                                  <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                                  {formatDate(post.created_at)}
                                </span>
                                <span className="flex items-center">
                                  <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                                  {post.views || 0}
                                </span>
                                <span className="flex items-center">
                                  <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1" />
                                  {post.comments_count || 0}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => handleLike(post.id, e)}
                                  className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                                >
                                  <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                                  <span>{post.likes_count || 0}</span>
                                </motion.button>
                              </div>
                            </div>

                            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {language === "uz" ? post.title_uz : post.title_en}
                            </h3>

                            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
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

      {/* Enhanced Footer - Compact */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-8 sm:py-12 md:py-16 lg:py-20 mt-8 sm:mt-12 md:mt-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 mb-4 sm:mb-6 md:mb-8"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl">M</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  Mansurbek Qazaqov
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg">{t("Shaxsiy blog", "Personal blog")}</p>
              </div>
            </motion.div>

            <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-6 mb-4 sm:mb-6 md:mb-8">
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:mansurbekqazaqov27@gmail.com"
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center space-x-1.5 sm:space-x-2 md:space-x-3"
              >
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl">📧</span>
                <span className="break-all">mansurbekqazaqov27@gmail.com</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.9 }}
                href="tel:+998972112008"
                className="text-gray-300 hover:text-green-400 transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center space-x-1.5 sm:space-x-2 md:space-x-3"
              >
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl">📞</span>
                <span>+998 97 211 20 08</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://t.me/Mansurbek_Qazaqov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center space-x-1.5 sm:space-x-2 md:space-x-3"
              >
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl">📱</span>
                <span>@Mansurbek_Qazaqov</span>
              </motion.a>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg px-4"
            >
              © 2025 Mansurbek Qazaqov. {t("Barcha huquqlar himoyalangan.", "All rights reserved.")}
            </motion.p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}