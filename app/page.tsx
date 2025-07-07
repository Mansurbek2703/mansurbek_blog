"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Calendar,
  Eye,
  MessageCircle,
  Heart,
  Globe,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  BookOpen,
  User,
  MapPin,
  Users,
  Laptop,
  Mail,
  Youtube,
  Home,
  Grid3X3,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useGlobalSettings } from "@/hooks/useGlobalSettings"
import { YouTubeEmbed } from "@/components/youtube-embed"

// Animation variants
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

const scaleOnHover = {
  whileHover: {
    scale: 1.08,
    transition: { duration: 0.2 },
    backgroundColor: "rgba(34, 197, 94, 0.1)",
  },
  whileTap: { scale: 0.95 },
}

const floatingAnimation = {
  animate: {
    y: [0, -30, 0],
    rotate: [0, 10, -10, 0],
    scale: [1, 1.1, 1],
  },
  transition: {
    duration: 8,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

// Enhanced navigation menu animations
const navItemVariants = {
  initial: { opacity: 0, y: -20, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    y: -3,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  tap: { scale: 0.95 },
}

const searchVariants = {
  initial: { opacity: 0, scale: 0.9, x: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  focus: {
    scale: 1.02,
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    transition: { duration: 0.2 },
  },
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
  youtube_url?: string
  created_at: string
  views?: number
  comments_count?: number
  likes_count?: number
  read_time?: number
  tags?: string[]
  tags_en?: string[]
}

interface Category {
  name_uz: string
  name_en: string
  count: number
  icon: string
  color: string
}

interface SearchResult {
  id: string
  title_uz: string
  title_en: string
  excerpt_uz: string
  excerpt_en: string
  category_name: string
  category_name_en: string
  views: number
}

export default function HomePage() {
  // Global settings hook
  const { language, darkMode, isLoaded, toggleLanguage, toggleDarkMode, t } = useGlobalSettings()

  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const [activeTab, setActiveTab] = useState("latest")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/posts?published=true&limit=20")
      const data = await response.json()
      if (data.success && Array.isArray(data.data)) {
        setPosts(data.data)
      }
    } catch (error) {
      console.error("Posts fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data)
        }
      } catch (error) {
        console.error("Categories fetch error:", error)
        // Fallback categories
        setCategories([
          {
            name_uz: "Ta'lim",
            name_en: "Education",
            count: 0,
            icon: "BookOpen",
            color: "bg-gradient-to-r from-blue-400 to-cyan-500",
          },
          {
            name_uz: "Sayohatlar",
            name_en: "Travel",
            count: 0,
            icon: "MapPin",
            color: "bg-gradient-to-r from-green-400 to-emerald-500",
          },
          {
            name_uz: "Shaxsiy",
            name_en: "Personal",
            count: 0,
            icon: "User",
            color: "bg-gradient-to-r from-purple-400 to-pink-500",
          },
          {
            name_uz: "Do'stlar",
            name_en: "Friends",
            count: 0,
            icon: "Users",
            color: "bg-gradient-to-r from-orange-400 to-red-500",
          },
        ])
      }
    }

    fetchCategories()
  }, [])

  // Helper functions
  const featuredPosts = useMemo(() => {
    if (!posts || !Array.isArray(posts)) return []
    return posts.slice(0, 6)
  }, [posts])

  const popularPosts = useMemo(() => {
    if (!posts || !Array.isArray(posts)) return []
    return [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
  }, [posts])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === "uz" ? "uz-UZ" : "en-US")
  }

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      BookOpen,
      MapPin,
      User,
      Users,
    }
    return icons[iconName] || BookOpen
  }

  // Event handlers
  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    setSearching(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`)
      const data = await response.json()
      if (data.success) {
        setSearchResults(data.data)
      }
    } catch (error) {
      console.error("Search error:", error)
      // Fallback search in local posts
      const filtered = posts
        .filter((post) => {
          const title_uz = post.title_uz || ""
          const title_en = post.title_en || ""
          const excerpt_uz = post.excerpt_uz || ""
          const excerpt_en = post.excerpt_en || ""

          const title = (language === "uz" ? title_uz : title_en).toLowerCase()
          const excerpt = (language === "uz" ? excerpt_uz : excerpt_en).toLowerCase()
          return title.includes(query.toLowerCase()) || excerpt.includes(query.toLowerCase())
        })
        .slice(0, 5)

      setSearchResults(
        filtered.map((post) => ({
          id: post.id,
          title_uz: post.title_uz || "",
          title_en: post.title_en || "",
          excerpt_uz: post.excerpt_uz || "",
          excerpt_en: post.excerpt_en || "",
          category_name: post.category_name || "",
          category_name_en: post.category_name_en || "",
          views: post.views || 0,
        })),
      )
    } finally {
      setSearching(false)
    }
  }

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
          setPosts((prevPosts) =>
            prevPosts.map((post) => (post.id === postId ? { ...post, likes_count: data.data.likes_count } : post)),
          )
        }
      }
    } catch (error) {
      console.error("Like error:", error)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setSubscribing(true)
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (data.success) {
        setEmail("")
        alert(t("Muvaffaqiyatli obuna bo'ldingiz!", "Successfully subscribed!"))
      } else {
        alert(data.message || t("Xatolik yuz berdi", "An error occurred"))
      }
    } catch (error) {
      console.error("Subscribe error:", error)
      alert(t("Xatolik yuz berdi", "An error occurred"))
    } finally {
      setSubscribing(false)
    }
  }

  // Loading check
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
        <div className="text-center">
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
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "dark bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50"
      }`}
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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

        <motion.div
          {...floatingAnimation}
          transition={{ ...floatingAnimation.transition, delay: 0 }}
          className="absolute top-32 left-16 opacity-15"
        >
          <Laptop className="w-24 h-24 text-blue-500 drop-shadow-2xl" />
        </motion.div>
        <motion.div
          {...floatingAnimation}
          transition={{ ...floatingAnimation.transition, delay: 2, duration: 10 }}
          className="absolute top-64 right-32 opacity-20"
        >
          <Laptop className="w-20 h-20 text-blue-600 drop-shadow-2xl" />
        </motion.div>
        <motion.div
          {...floatingAnimation}
          transition={{ ...floatingAnimation.transition, delay: 4, duration: 12 }}
          className="absolute bottom-48 left-1/4 opacity-12"
        >
          <Laptop className="w-28 h-28 text-cyan-500 drop-shadow-2xl" />
        </motion.div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-blue-200/50 dark:border-blue-700/50 shadow-xl"
      >
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-sm md:text-xl">M</span>
              </motion.div>
              <div>
                <h1 className="text-base sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Mansurbek Qazaqov
                </h1>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {t("Shaxsiy blog", "Personal blog")}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden md:flex items-center space-x-2"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
                <Link href="/">
                  <div className="group relative px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-800/50 dark:hover:to-cyan-800/50 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="p-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md"
                      >
                        <Home className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {t("Bosh sahifa", "Home")}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
                <Link href="/categories">
                  <div className="group relative px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-800/50 dark:hover:to-green-800/50 transition-all duration-300 shadow-lg hover:shadow-xl border border-emerald-200/50 dark:border-emerald-700/50 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="p-1.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg shadow-md"
                      >
                        <Grid3X3 className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {t("Kategoriyalar", "Categories")}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
                <Link href="/contact">
                  <div className="group relative px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-800/50 dark:hover:to-blue-800/50 transition-all duration-300 shadow-lg hover:shadow-xl border border-cyan-200/50 dark:border-cyan-700/50 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="p-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-md"
                      >
                        <Phone className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {t("Aloqa", "Contact")}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.nav>

            {/* Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search */}
              <motion.div
                className="relative hidden lg:block"
                variants={searchVariants}
                initial="initial"
                animate="animate"
                whileFocus="focus"
              >
                <div className="relative group">
                  <motion.div
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Search
                      className={`w-5 h-5 transition-colors duration-300 ${
                        searchFocused ? "text-blue-500" : "text-gray-400 group-hover:text-blue-500"
                      }`}
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }} className="relative">
                    <Input
                      type="text"
                      placeholder={t("Qidirish...", "Search...")}
                      value={searchQuery}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        handleSearch(e.target.value)
                      }}
                      className={`pl-12 pr-4 py-3 w-72 rounded-2xl border-2 transition-all duration-300 shadow-lg backdrop-blur-sm font-medium ${
                        searchFocused
                          ? "bg-white/95 dark:bg-gray-800/95 border-blue-400 dark:border-blue-500 shadow-blue-500/25 dark:shadow-blue-400/25"
                          : "bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-900/40 dark:to-cyan-900/40 border-blue-200/60 dark:border-blue-700/60 hover:border-blue-300 dark:hover:border-blue-600"
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Search Results */}
                <AnimatePresence>
                  {searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl border-2 border-blue-200/50 dark:border-blue-700/50 backdrop-blur-xl z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="p-2">
                        {searching ? (
                          <motion.div className="p-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"
                            />
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                              {t("Qidirilmoqda...", "Searching...")}
                            </p>
                          </motion.div>
                        ) : searchResults.length > 0 ? (
                          <div className="space-y-1">
                            {searchResults.map((result, index) => (
                              <Link key={result.id} href={`/post/${result.id}`}>
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{
                                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                                    x: 5,
                                    transition: { duration: 0.2 },
                                  }}
                                  className="px-4 py-3 cursor-pointer rounded-xl border border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200"
                                  onClick={() => {
                                    setSearchQuery("")
                                    setSearchResults([])
                                  }}
                                >
                                  <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">
                                    {language === "uz" ? result.title_uz : result.title_en}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">
                                    {language === "uz" ? result.excerpt_uz : result.excerpt_en}
                                  </p>
                                  <div className="flex items-center space-x-4 text-xs">
                                    <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
                                      {language === "uz" ? result.category_name : result.category_name_en}
                                    </span>
                                    <span className="flex items-center text-gray-500">
                                      <Eye className="w-3 h-3 mr-1" />
                                      {result.views}
                                    </span>
                                  </div>
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <motion.div className="p-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Search className="w-6 h-6 text-gray-500" />
                            </div>
                            <p className="text-sm text-gray-500 font-medium">
                              {t("Natija topilmadi", "No results found")}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 px-2 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-800 dark:to-cyan-800 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-700 dark:hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Globe className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-semibold">{language.toUpperCase()}</span>
              </motion.button>

              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 text-green-700 dark:text-green-300 hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-700 dark:hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {darkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 shadow-lg"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden mt-4 py-4 border-t border-blue-200 dark:border-blue-700"
              >
                <motion.nav
                  className="flex flex-col space-y-3"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div variants={navItemVariants}>
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-800/50 dark:hover:to-cyan-800/50 transition-all duration-300 shadow-lg border border-blue-200/50 dark:border-blue-700/50"
                    >
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md">
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {t("Bosh sahifa", "Home")}
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div variants={navItemVariants}>
                    <Link
                      href="/categories"
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-800/50 dark:hover:to-green-800/50 transition-all duration-300 shadow-lg border border-emerald-200/50 dark:border-emerald-700/50"
                    >
                      <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg shadow-md">
                        <Grid3X3 className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {t("Kategoriyalar", "Categories")}
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div variants={navItemVariants}>
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-800/50 dark:hover:to-blue-800/50 transition-all duration-300 shadow-lg border border-cyan-200/50 dark:border-cyan-700/50"
                    >
                      <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-md">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {t("Aloqa", "Contact")}
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div variants={navItemVariants} className="pt-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 z-10" />
                      <Input
                        type="text"
                        placeholder={t("Qidirish...", "Search...")}
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value)
                          handleSearch(e.target.value)
                        }}
                        className="pl-12 pr-4 py-4 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-900/40 dark:to-cyan-900/40 border-2 border-blue-200/60 dark:border-blue-700/60 focus:border-blue-400 dark:focus:border-blue-500 rounded-2xl shadow-lg backdrop-blur-sm font-medium transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section className="relative py-8 md:py-20 bg-gradient-to-br from-blue-100/50 via-cyan-100/50 to-green-100/50 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-green-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 mx-auto mb-6 ring-2 md:ring-4 ring-blue-500 ring-offset-2 md:ring-offset-4 ring-offset-white dark:ring-offset-gray-900 shadow-2xl">
              <AvatarImage src="/men.jpg" alt="Mansurbek Qazaqov" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-4xl font-bold">
                M
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent mb-6 drop-shadow-lg"
          >
            {t("Salom, men Mansurbek", "Hello, I'm Mansurbek")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base md:text-2xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed max-w-4xl mx-auto"
          >
            {t(
              "Texnologiya, ta'lim va hayot haqida yozaman. Mening maqolalarim orqali yangi bilimlar oling va o'z tajribalaringiz bilan bo'lishing.",
              "I write about technology, education, and life. Gain new knowledge through my articles and share your experiences.",
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/categories">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-base md:text-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl rounded-xl">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                  {t("Maqolalarni ko'rish", "View Articles")}
                </Button>
              </motion.div>
            </Link>

            <Link href="/about">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-base md:text-lg border-2 border-green-400 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 shadow-xl rounded-xl bg-transparent"
                >
                  <User className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                  {t("Men haqimda", "About Me")}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-2 md:px-4 py-8 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Featured Posts Section */}
            <motion.section {...fadeInUp} className="mb-16">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  {t("So'nggi maqolalar", "Latest Articles")}
                </h2>
                <Link href="/categories">
                  <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-xl shadow-lg bg-transparent"
                    >
                      {t("Barchasini ko'rish", "View All")}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
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
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="grid md:grid-cols-2 gap-8"
                >
                  {featuredPosts.map((post, index) => (
                    <motion.div key={post.id} variants={fadeInUp}>
                      <Link href={`/post/${post.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.03, y: -5, rotateY: 2 }}
                          whileTap={{ scale: 0.98 }}
                          className="group"
                        >
                          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 dark:border-blue-700 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500">
                            <div className="relative">
                              {post.youtube_url ? (
                                <div className="relative">
                                  <YouTubeEmbed
                                    url={post.youtube_url}
                                    title={language === "uz" ? post.title_uz || "" : post.title_en || ""}
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
                                  alt={language === "uz" ? post.title_uz || "" : post.title_en || ""}
                                  width={400}
                                  height={250}
                                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-52 bg-gradient-to-br from-blue-200 via-cyan-200 to-green-200 dark:from-blue-800 dark:via-cyan-800 dark:to-green-800 flex items-center justify-center">
                                  <BookOpen className="text-blue-500 w-16 h-16" />
                                </div>
                              )}

                              {!post.youtube_url && (
                                <div className="absolute top-4 left-4">
                                  <Badge className="bg-white/95 text-blue-800 hover:bg-white shadow-lg backdrop-blur-sm font-semibold">
                                    {language === "uz" ? post.category_name || "" : post.category_name_en || ""}
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

                            <CardContent className="p-3 sm:p-4 md:p-6">
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

                              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {language === "uz" ? post.title_uz || "" : post.title_en || ""}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                                {language === "uz" ? post.excerpt_uz || "" : post.excerpt_en || ""}
                              </p>

                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {(language === "uz" ? post.tags : post.tags_en || post.tags)
                                    .slice(0, 3)
                                    .map((tag, tagIndex) => (
                                      <Badge
                                        key={tagIndex}
                                        variant="secondary"
                                        className="text-xs bg-gradient-to-r from-blue-100 to-green-100 text-gray-700 dark:from-blue-900 dark:to-green-900 dark:text-gray-300"
                                      >
                                        #
                                        {typeof tag === "object"
                                          ? language === "uz"
                                            ? tag.name || ""
                                            : tag.name_en || ""
                                          : tag || ""}
                                      </Badge>
                                    ))}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.section>

            {/* Categories Section */}
            <motion.section {...fadeInUp} className="mb-16">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-10">
                {t("Kategoriyalar", "Categories")}
              </h2>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {categories.map((category, index) => {
                  const IconComponent = getIconComponent(category.icon)
                  return (
                    <motion.div key={index} variants={fadeInUp}>
                      <Link
                        href={`/categories?category=${encodeURIComponent(
                          language === "uz" ? category.name_uz : category.name_en,
                        )}`}
                      >
                        <motion.div
                          {...scaleOnHover}
                          className="p-6 rounded-2xl cursor-pointer transition-all duration-500 shadow-xl hover:shadow-2xl border-2 border-blue-200 dark:border-blue-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500"
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${category.color}`}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </motion.div>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {language === "uz" ? category.name_uz : category.name_en}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {category.count} {t("maqola", "articles")}
                          </p>
                        </motion.div>
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Popular Posts */}
              <motion.div {...fadeInUp}>
                <Card className="shadow-xl border-2 border-blue-200 dark:border-blue-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-blue-500" />
                      {t("Mashhur maqolalar", "Popular Articles")}
                    </h3>

                    <div className="space-y-4">
                      {popularPosts.slice(0, 5).map((post, index) => (
                        <Link key={post.id} href={`/post/${post.id}`}>
                          <motion.div
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="flex items-start space-x-3 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-300 cursor-pointer"
                          >
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm">
                                {language === "uz" ? post.title_uz || "" : post.title_en || ""}
                              </h4>
                              <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Eye className="w-3 h-3 mr-1" />
                                  {post.views || 0}
                                </span>
                                <span className="flex items-center">
                                  <Heart className="w-3 h-3 mr-1" />
                                  {post.likes_count || 0}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Newsletter Subscription */}
              <motion.div {...fadeInUp}>
                <Card className="shadow-xl border-2 border-green-200 dark:border-green-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-sm">
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 flex items-center">
                      <Mail className="w-6 h-6 mr-3 text-green-500" />
                      {t("Newsletter", "Newsletter")}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {t(
                        "Yangi maqolalar haqida birinchi bo'lib xabar oling!",
                        "Be the first to know about new articles!",
                      )}
                    </p>

                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <Input
                        type="email"
                        placeholder={t("Email manzilingiz", "Your email address")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/90 dark:bg-gray-800/90 border-green-200 dark:border-green-700 focus:border-green-500 dark:focus:border-green-400 rounded-xl shadow-lg backdrop-blur-sm"
                      />

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          disabled={subscribing}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl rounded-xl py-3"
                        >
                          {subscribing ? t("Yuborilmoqda...", "Subscribing...") : t("Obuna bo'lish", "Subscribe")}
                        </Button>
                      </motion.div>
                    </form>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                      {t("Istalgan vaqtda obunani bekor qilishingiz mumkin.", "Unsubscribe anytime.")}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* About Card */}
              <motion.div {...fadeInUp}>
                <Card className="shadow-xl border-2 border-purple-200 dark:border-purple-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm">
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                      {t("Men haqimda", "About Me")}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {t(
                        "Men Mansurbek Qazaqov. Texnologiya va ta'lim sohasida faoliyat yuritaman. Mening maqsadim - bilimlarni boshqalar bilan bo'lishish.",
                        "I'm Mansurbek Qazaqov. I work in technology and education. My goal is to share knowledge with others.",
                      )}
                    </p>

                    <Link href="/about">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900 rounded-xl py-3 bg-transparent"
                        >
                          {t("Batafsil", "Learn More")}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-20 mt-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12">
              {/* Brand */}
              <div className="md:col-span-2">
                <motion.div whileHover={{ scale: 1.05, rotate: 2 }} className="flex items-center space-x-4 mb-6">
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

                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  {t(
                    "Texnologiya, ta'lim va hayot haqida maqolalar. Bilimlarni bo'lishish va yangi narsalarni o'rganish.",
                    "Articles about technology, education, and life. Sharing knowledge and learning new things.",
                  )}
                </p>

                <div className="flex space-x-6">
                  <motion.a
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href="mailto:mansurbekqazaqov27@gmail.com"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300"
                  >
                    <Mail className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://t.me/Mansurbek_Qazaqov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </motion.a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6">{t("Tezkor havolalar", "Quick Links")}</h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>{t("Bosh sahifa", "Home")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories"
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>{t("Kategoriyalar", "Categories")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>{t("Men haqimda", "About")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>{t("Aloqa", "Contact")}</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6">{t("Aloqa", "Contact")}</h4>
                <div className="space-y-4">
                  <motion.a
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="mailto:mansurbekqazaqov27@gmail.com"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center space-x-3"
                  >
                    <Mail className="w-5 h-5" />
                    <span>mansurbekqazaqov27@gmail.com</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="tel:+998972112008"
                    className="text-gray-400 hover:text-green-400 transition-all duration-300 flex items-center space-x-3"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    <span>+998 97 211 20 08</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://t.me/Mansurbek_Qazaqov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center space-x-3"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    <span>@Mansurbek_Qazaqov</span>
                  </motion.a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-gray-400 text-lg"
              >
                © 2025 Mansurbek Qazaqov. {t("Barcha huquqlar himoyalangan.", "All rights reserved.")}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
