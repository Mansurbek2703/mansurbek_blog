"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, TrendingDown, Eye, MessageCircle, Heart, BarChart3 } from "lucide-react"
import Link from "next/link"

interface AnalyticsData {
  totalViews: number
  totalPosts: number
  totalComments: number
  totalLikes: number
  viewsGrowth: number
  postsGrowth: number
  commentsGrowth: number
  likesGrowth: number
  topPosts: Array<{
    id: number
    title: string
    views: number
    comments: number
    likes: number
  }>
  recentActivity: Array<{
    type: string
    description: string
    time: string
  }>
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`)
      const data = await response.json()
      if (data.success) {
        setAnalytics(data.data)
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Analitika yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Analitika ma'lumotlari yuklanmadi</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Orqaga
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analitika</h1>
                <p className="text-gray-600 dark:text-gray-400">Blog statistikasi va hisobotlar</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant={timeRange === "7d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("7d")}>
                7 kun
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("30d")}
              >
                30 kun
              </Button>
              <Button
                variant={timeRange === "90d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("90d")}
              >
                90 kun
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jami Ko'rishlar</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {analytics.viewsGrowth >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                  )}
                  <span className={analytics.viewsGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(analytics.viewsGrowth)}%
                  </span>
                  <span className="ml-1">
                    oxirgi {timeRange === "7d" ? "hafta" : timeRange === "30d" ? "oy" : "3 oy"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jami Postlar</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalPosts}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {analytics.postsGrowth >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                  )}
                  <span className={analytics.postsGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                    +{analytics.postsGrowth}
                  </span>
                  <span className="ml-1">yangi post</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jami Izohlar</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalComments}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {analytics.commentsGrowth >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                  )}
                  <span className={analytics.commentsGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                    +{analytics.commentsGrowth}
                  </span>
                  <span className="ml-1">yangi izoh</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jami Yoqtirishlar</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalLikes}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {analytics.likesGrowth >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                  )}
                  <span className={analytics.likesGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                    +{analytics.likesGrowth}
                  </span>
                  <span className="ml-1">yangi yoqtirish</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Posts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Eng Mashhur Postlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{post.title}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {post.views}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {post.comments}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle>So'nggi Faollik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
