"use client"

import { useState, useEffect } from "react"
import type { Post } from "@/lib/database"

export function usePost(id: number) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/posts/${id}`)
        const data = await response.json()

        if (data.success) {
          setPost(data.data)
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError("Failed to fetch post")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  return { post, loading, error }
}
