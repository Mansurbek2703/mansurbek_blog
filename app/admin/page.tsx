"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  FileText,
  MessageCircle,
  Eye,
  Heart,
  Plus,
  Users,
  Laptop,
  Code,
  Terminal,
  Cpu,
  Database,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

// Floating hacker/laptop animation
const floatingAnimation = {
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

// Background floating elements
const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Enhanced Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50"></div>

      {/* Floating gradient orbs */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
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
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 28,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-r from-emerald-400/25 to-green-400/25 rounded-full blur-3xl"
      />

      {/* 5 Floating Hacker/Tech Icons */}
      <motion.div
        {...floatingAnimation}
        transition={{ ...floatingAnimation.transition, delay: 0, duration: 10 }}
        className="absolute top-40 left-20 opacity-15"
      >
        <Laptop className="w-20 h-20 text-blue-500 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>

      <motion.div
        {...floatingAnimation}
        transition={{ ...floatingAnimation.transition, delay: 2, duration: 12 }}
        className="absolute top-80 right-40 opacity-18"
      >
        <Code className="w-16 h-16 text-blue-600 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>

      <motion.div
        {...floatingAnimation}
        transition={{ ...floatingAnimation.transition, delay: 4, duration: 14 }}
        className="absolute bottom-60 left-1/4 opacity-12"
      >
        <Terminal className="w-24 h-24 text-cyan-500 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>

      <motion.div
        {...floatingAnimation}
        transition={{ ...floatingAnimation.transition, delay: 6, duration: 9 }}
        className="absolute top-[450px] right-1/3 opacity-20"
      >
        <Database className="w-14 h-14 text-blue-400 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>

      <motion.div
        {...floatingAnimation}
        transition={{ ...floatingAnimation.transition, delay: 8, duration: 11 }}
        className="absolute bottom-40 right-20 opacity-16"
      >
        <Cpu className="w-18 h-18 text-emerald-600 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalComments: 0,
    totalLikes: 0,
    activeSubscribers: 0,
    publishedPosts: 0,
    draftPosts: 0,
    averageViews: 0,
    engagementRate: 0,
    recentGrowth: {
      posts: 0,
      views: 0,
      comments: 0,
      likes: 0,
    },
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch from existing analytics API
        const response = await fetch("/api/admin/analytics")
        const data = await response.json()

        if (data.success) {
          setStats(data.data)
        } else {
          setError(data.error)
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error)
        setError("Ma'lumotlarni yuklashda xatolik")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 flex items-center justify-center">
        <FloatingBackground />
        <div className="text-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6 shadow-2xl"
          />
          <p className="text-gray-600 text-xl font-medium">PostgreSQL ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 flex items-center justify-center">
        <FloatingBackground />
        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Database className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Database xatoligi</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-blue-500 hover:bg-blue-600">
            Qayta urinish
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 relative">
      <FloatingBackground />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white/90 backdrop-blur-xl shadow-xl border-b border-blue-200/50"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent"
              >
                Admin Panel
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-lg flex items-center"
              >
                <Database className="w-5 h-5 mr-2 text-blue-500" />
                Mansurbek Qazaqov Blog - PostgreSQL Dashboard
              </motion.p>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/admin/analytics">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 shadow-lg"
                  >
                    <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
                    Statistika
                  </Button>
                </motion.div>
              </Link>
              <Link href="/admin/comments">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
                    Izohlar
                  </Button>
                </motion.div>
              </Link>
              <Link href="/admin/posts">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-300 shadow-lg"
                  >
                    <Eye className="w-4 h-4 mr-2 text-cyan-600" />
                    Ko'rish
                  </Button>
                </motion.div>
              </Link>
              <Link href="/admin/subscribers">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 shadow-lg"
                  >
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    Subscribers
                  </Button>
                </motion.div>
              </Link>
              <Link href="/admin/posts/new">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white shadow-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Yangi Post
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                >
                  Chiqish
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Statistics Cards */}
        <motion.section {...fadeInUp} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Jami postlar</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats.totalPosts}</div>
                  <p className="text-xs text-emerald-600 font-medium">+{stats.recentGrowth.posts} oxirgi oyda</p>
                  <div className="text-xs text-gray-500 mt-2">
                    {stats.publishedPosts} nashr qilingan, {stats.draftPosts} qoralama
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-cyan-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Jami ko'rishlar</CardTitle>
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Eye className="h-5 w-5 text-cyan-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</div>
                  <p className="text-xs text-emerald-600 font-medium">
                    +{stats.recentGrowth.views.toLocaleString()} oxirgi oyda
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Jami izohlar</CardTitle>
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats.totalComments}</div>
                  <p className="text-xs text-emerald-600 font-medium">+{stats.recentGrowth.comments} oxirgi oyda</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-red-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Jami yoqtirishlar</CardTitle>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Heart className="h-5 w-5 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats.totalLikes}</div>
                  <p className="text-xs text-emerald-600 font-medium">+{stats.recentGrowth.likes} oxirgi oyda</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Additional Stats */}
        <motion.section {...fadeInUp} transition={{ delay: 0.2 }} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Faol obunachi</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats.activeSubscribers}</div>
                  <p className="text-xs text-gray-500">Newsletter obunachilari</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">O'rtacha ko'rishlar</CardTitle>
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats.averageViews}</div>
                  <p className="text-xs text-gray-500">Har bir post uchun</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-cyan-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Faollik darajasi</CardTitle>
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Heart className="h-5 w-5 text-cyan-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{stats.engagementRate}%</div>
                  <p className="text-xs text-gray-500">Izoh/Ko'rishlar nisbati</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
