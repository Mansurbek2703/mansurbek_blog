"use client"

import { useState, useEffect } from "react"
import type { Post } from "@/lib/database"

export function usePosts(limit?: number, category?: string, search?: string) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (limit) params.append("limit", limit.toString())
        if (category) params.append("category", category)
        if (search) params.append("search", search)

        const response = await fetch(`/api/posts?${params}`)
        const data = await response.json()

        if (data.success) {
          setPosts(data.data)
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError("Failed to fetch posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [limit, category, search])

  return { posts, loading, error }
}
