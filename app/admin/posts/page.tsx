"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye, EyeOff, Calendar, MessageCircle, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/database"

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = posts.filter(
        (post) =>
          post.title_uz.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.title_en.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(posts)
    }
  }, [searchQuery, posts])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/posts")
      const data = await response.json()
      if (data.success) {
        setPosts(data.data)
        setFilteredPosts(data.data)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (postId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/posts/${postId}/toggle`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_published: !currentStatus }),
      })

      if (response.ok) {
        fetchPosts()
      }
    } catch (error) {
      console.error("Error toggling post status:", error)
    }
  }

  const deletePost = async (postId: number) => {
    if (!confirm("Bu postni o'chirishga ishonchingiz komilmi?")) return

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchPosts()
      }
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Postlar yuklanmoqda...</p>
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Postlarni Boshqarish</h1>
                <p className="text-gray-600 dark:text-gray-400">Barcha postlarni ko'rish va boshqarish</p>
              </div>
            </div>
            <Link href="/admin/posts/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Yangi Post
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Postlarni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={post.featured_image || "/placeholder.svg?height=100&width=150"}
                        alt={post.title_uz}
                        width={150}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={post.is_published ? "default" : "secondary"}>
                              {post.is_published ? "Nashr qilingan" : "Qoralama"}
                            </Badge>
                            {post.is_featured && <Badge variant="outline">Asosiy</Badge>}
                            <Badge variant="outline">{post.category_name}</Badge>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                            {post.title_uz}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">{post.title_en}</p>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.excerpt_uz}</p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(post.published_at || post.created_at).toLocaleDateString("uz-UZ")}
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {post.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments_count || 0}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePublished(post.id, post.is_published)}
                          >
                            {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Link href={`/admin/posts/${post.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" onClick={() => deletePost(post.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Postlar topilmadi</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery ? "Qidiruv bo'yicha natija topilmadi" : "Hali postlar mavjud emas"}
              </p>
              <Link href="/admin/posts/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Birinchi postni yarating
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
