"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Check, Eye, Trash2, MessageCircle } from "lucide-react"
import Link from "next/link"

interface Comment {
  id: number
  post_id: number
  post_title: string
  author_name: string
  author_email: string
  author_avatar?: string
  content: string
  likes: number
  is_approved: boolean
  created_at: string
  replies_count: number
}

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all")

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/admin/comments")
      const data = await response.json()
      if (data.success) {
        setComments(data.data)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
    } finally {
      setLoading(false)
    }
  }

  const approveComment = async (commentId: number) => {
    try {
      const response = await fetch(`/api/admin/comments/${commentId}/approve`, {
        method: "PATCH",
      })
      if (response.ok) {
        fetchComments()
      }
    } catch (error) {
      console.error("Error approving comment:", error)
    }
  }

  const deleteComment = async (commentId: number) => {
    if (!confirm("Bu izohni o'chirishga ishonchingiz komilmi?")) return

    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        fetchComments()
      }
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  const filteredComments = comments.filter((comment) => {
    if (filter === "approved") return comment.is_approved
    if (filter === "pending") return !comment.is_approved
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Izohlar yuklanmoqda...</p>
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Izohlarni Boshqarish</h1>
                <p className="text-gray-600 dark:text-gray-400">Barcha izohlarni ko'rish va moderatsiya qilish</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Barchasi ({comments.length})</span>
              </Button>
              <Button
                variant={filter === "approved" ? "default" : "outline"}
                onClick={() => setFilter("approved")}
                className="flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Tasdiqlangan ({comments.filter((c) => c.is_approved).length})</span>
              </Button>
              <Button
                variant={filter === "pending" ? "default" : "outline"}
                onClick={() => setFilter("pending")}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Kutilmoqda ({comments.filter((c) => !c.is_approved).length})</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={comment.author_avatar || "/placeholder.svg"} alt={comment.author_name} />
                      <AvatarFallback>{comment.author_name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{comment.author_name}</h4>
                          <Badge variant={comment.is_approved ? "default" : "secondary"}>
                            {comment.is_approved ? "Tasdiqlangan" : "Kutilmoqda"}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString("uz-UZ")}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{comment.author_email}</p>

                      <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.content}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Post: {comment.post_title}</span>
                          <span>{comment.likes} yoqtirishlar</span>
                          {comment.replies_count > 0 && <span>{comment.replies_count} javob</span>}
                        </div>

                        <div className="flex items-center space-x-2">
                          {!comment.is_approved && (
                            <Button size="sm" onClick={() => approveComment(comment.id)}>
                              <Check className="w-4 h-4 mr-1" />
                              Tasdiqlash
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => deleteComment(comment.id)}>
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

        {filteredComments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Izohlar topilmadi</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filter === "all"
                  ? "Hali izohlar mavjud emas"
                  : filter === "approved"
                    ? "Tasdiqlangan izohlar mavjud emas"
                    : "Tasdiqlanishi kutilayotgan izohlar mavjud emas"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
