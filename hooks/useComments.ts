"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface Comment {
  id: number
  author: string
  author_email?: string
  content: string
  contentEn: string
  date: string
  likes: number
  avatar?: string
  replies?: Comment[]
}

interface NewComment {
  author: string
  content: string
  content_en: string
  parent_id?: number
}

export function useComments(postId: number) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())
  const [likingComments, setLikingComments] = useState<Set<number>>(new Set())

  const mockComments: Comment[] = [
    {
      id: 1,
      author: "Aziz Karimov",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2024-01-16",
      content: "Juda foydali maqola! IT sohasiga kirishni rejalashtirgan yoshlar uchun ajoyib maslahatlar.",
      contentEn: "Very useful article! Great advice for young people planning to enter the IT field.",
      likes: 12,
      replies: [
        {
          id: 11,
          author: "Mansurbek Qazaqov",
          avatar: "/placeholder.svg?height=40&width=40",
          date: "2024-01-16",
          content: "Rahmat! Yana qanday mavzularda maqola yozishimni istaysiz?",
          contentEn: "Thank you! What other topics would you like me to write articles about?",
          likes: 5,
        },
      ],
    },
    {
      id: 2,
      author: "Malika Tosheva",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2024-01-17",
      content: "Men ham IT sohasida ishlayapman. Sizning tajribangiz juda qimmatli!",
      contentEn: "I also work in the IT field. Your experience is very valuable!",
      likes: 8,
      replies: [],
    },
  ]

  // Real API call to fetch comments
  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/comments?post_id=${postId}`)
      const result = await response.json()

      if (result.success && result.data) {
        // Convert API data to match our interface
        const formattedComments = result.data.map((comment: any) => ({
          id: comment.id,
          author: comment.author_name,
          author_email: comment.author_email,
          content: comment.content,
          contentEn: comment.content_en || comment.content,
          date: new Date(comment.created_at).toLocaleDateString("uz-UZ"),
          likes: comment.likes || 0,
          avatar: comment.author_avatar || "/placeholder.svg?height=40&width=40",
          replies:
            comment.replies?.map((reply: any) => ({
              id: reply.id,
              author: reply.author_name,
              author_email: reply.author_email,
              content: reply.content,
              contentEn: reply.content_en || reply.content,
              date: new Date(reply.created_at).toLocaleDateString("uz-UZ"),
              likes: reply.likes || 0,
              avatar: reply.author_avatar || "/placeholder.svg?height=32&width=32",
            })) || [],
        }))
        setComments(formattedComments)
      } else {
        // Fallback to mock data if API fails
        setComments(mockComments)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
      // Fallback to mock data on error
      setComments(mockComments)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  const handleCommentLike = async (commentId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Agar allaqachon like qilingan bo'lsa yoki hozir like qilinayotgan bo'lsa, to'xtatamiz
    if (likedComments.has(commentId) || likingComments.has(commentId)) {
      console.warn(`Comment ${commentId} already liked or being liked.`)
      return
    }

    try {
      // Like qilish jarayonini boshlash
      setLikingComments((prev) => new Set(prev).add(commentId))

      const response = await fetch(`/api/comments/${commentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "like" }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Like qilingan commentni belgilash
          setLikedComments((prev) => new Set(prev).add(commentId))

          // Comments state'ini yangilash
          setComments((prevComments) =>
            prevComments.map((comment) => {
              if (comment.id === commentId) {
                return { ...comment, likes: data.data.likes_count }
              }
              // Replies ichida ham qidirish
              if (comment.replies) {
                return {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply.id === commentId ? { ...reply, likes: data.data.likes_count } : reply,
                  ),
                }
              }
              return comment
            }),
          )
        } else {
          console.error("Comment like failed:", data.error)
        }
      }
    } catch (error) {
      console.error("Comment like error:", error)
    } finally {
      // Like qilish jarayonini tugatish
      setLikingComments((prev) => {
        const newSet = new Set(prev)
        newSet.delete(commentId)
        return newSet
      })
    }
  }

  const addComment = async (newComment: NewComment) => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: postId,
          parent_id: newComment.parent_id || null,
          author_name: newComment.author,
          content: newComment.content,
          content_en: newComment.content_en,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Refresh comments after adding new one
        await fetchComments()
      } else {
        throw new Error(result.error || "Failed to add comment")
      }
    } catch (error) {
      console.error("Error adding comment:", error)
      throw error
    }
  }

  return {
    comments,
    loading,
    addComment,
    handleCommentLike,
    likedComments,
    likingComments,
  }
}
