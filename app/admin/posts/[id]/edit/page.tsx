"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [formData, setFormData] = useState({
    title_uz: "",
    title_en: "",
    slug: "",
    content_uz: "",
    content_en: "",
    excerpt_uz: "",
    excerpt_en: "",
    category_id: 1,
    featured_image: "",
    tags: "",
    is_published: false,
    is_featured: false,
  })

  const categories = [
    { id: 1, name: "Ta'lim", name_en: "Education" },
    { id: 2, name: "Sayohatlar", name_en: "Travel" },
    { id: 3, name: "Shaxsiy", name_en: "Personal" },
    { id: 4, name: "Do'stlar", name_en: "Friends" },
  ]

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${params.id}`)
      const data = await response.json()

      if (data.success) {
        const post = data.data
        setFormData({
          title_uz: post.title_uz,
          title_en: post.title_en,
          slug: post.slug,
          content_uz: post.content_uz,
          content_en: post.content_en,
          excerpt_uz: post.excerpt_uz || "",
          excerpt_en: post.excerpt_en || "",
          category_id: post.category_id,
          featured_image: post.featured_image || "",
          tags: post.tags?.map((tag: any) => tag.name).join(", ") || "",
          is_published: post.is_published,
          is_featured: post.is_featured,
        })
      }
    } catch (error) {
      console.error("Error fetching post:", error)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/posts/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/admin/posts")
      } else {
        alert("Xato: " + data.error)
      }
    } catch (error) {
      console.error("Error updating post:", error)
      alert("Post yangilashda xato yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Post yuklanmoqda...</p>
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
              <Link href="/admin/posts">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Orqaga
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post Tahrirlash</h1>
                <p className="text-gray-600 dark:text-gray-400">Mavjud postni tahrirlash</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => handleInputChange("is_published", false)}>
                <Save className="w-4 h-4 mr-2" />
                Qoralama saqlash
              </Button>
              <Button onClick={() => handleInputChange("is_published", true)}>
                <Eye className="w-4 h-4 mr-2" />
                Nashr qilish
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Asosiy Ma'lumotlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sarlavha (O'zbek) *
                  </label>
                  <Input
                    value={formData.title_uz}
                    onChange={(e) => handleInputChange("title_uz", e.target.value)}
                    placeholder="Post sarlavhasi o'zbek tilida"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sarlavha (Ingliz) *
                  </label>
                  <Input
                    value={formData.title_en}
                    onChange={(e) => handleInputChange("title_en", e.target.value)}
                    placeholder="Post sarlavhasi ingliz tilida"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug *</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="post-slug-url"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Post Matni</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Matn (O'zbek) *
                  </label>
                  <Textarea
                    value={formData.content_uz}
                    onChange={(e) => handleInputChange("content_uz", e.target.value)}
                    placeholder="Post matni o'zbek tilida"
                    rows={10}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Matn (Ingliz) *
                  </label>
                  <Textarea
                    value={formData.content_en}
                    onChange={(e) => handleInputChange("content_en", e.target.value)}
                    placeholder="Post matni ingliz tilida"
                    rows={10}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Nashr Sozlamalari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => handleInputChange("is_published", e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="is_published" className="text-sm font-medium">
                    Nashr qilingan
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => handleInputChange("is_featured", e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="is_featured" className="text-sm font-medium">
                    Asosiy post
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle>Kategoriya</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={formData.category_id}
                  onChange={(e) => handleInputChange("category_id", Number.parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} / {category.name_en}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Asosiy Rasm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="file"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    const formDataData = new FormData()
                    formDataData.append("file", file)

                    const res = await fetch("/api/admin/uploads", {
                      method: "POST",
                      body: formDataData,
                    })

                    const data = await res.json()
                    if (data.success) {
                      setFormData((prev) => ({
                        ...prev,
                        featured_image: data.url,
                      }))
                    } else {
                      alert("Rasm yuklanmadi")
                    }
                  }}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />

                {formData.featured_image && (
                  <img
                    src={formData.featured_image}
                    alt="Yuklangan rasm"
                    className="rounded w-full h-auto"
                  />
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Teglar</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="IT, Texnologiya, Dasturlash"
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
