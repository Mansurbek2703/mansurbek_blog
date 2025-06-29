"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Eye, Youtube, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NewPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
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
    youtube_url: "",
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (field === "title_uz" && value) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }))
    }
  }

  const validateForm = () => {
    const errors = []

    if (!formData.title_uz.trim()) errors.push("O'zbek tilidagi sarlavha")
    if (!formData.title_en.trim()) errors.push("Ingliz tilidagi sarlavha")
    if (!formData.slug.trim()) errors.push("Slug")
    if (!formData.content_uz.trim()) errors.push("O'zbek tilidagi matn")
    if (!formData.content_en.trim()) errors.push("Ingliz tilidagi matn")

    if (errors.length > 0) {
      setError(`Quyidagi maydonlar to'ldirilishi shart: ${errors.join(", ")}`)
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      console.log("📤 Yuborilayotgan ma'lumotlar:", formData)

      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log("📥 Server javobi:", data)

      if (data.success) {
        alert("Post muvaffaqiyatli yaratildi!")
        router.push("/admin/posts")
      } else {
        setError(data.error || "Noma'lum xatolik yuz berdi")
        if (data.details) {
          console.error("Xatolik tafsilotlari:", data.details)
        }
      }
    } catch (error) {
      console.error("❌ Post yaratishda xatolik:", error)
      setError("Tarmoq xatoligi yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          featured_image: data.url,
        }))
        alert("Rasm muvaffaqiyatli yuklandi")
      } else {
        alert("Yuklashda xatolik: " + data.error)
      }
    } catch (error) {
      alert("Rasm yuklashda xatolik")
    }
  }

  const isValidYouTubeUrl = (url: string) => {
    if (!url) return true
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    return youtubeRegex.test(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yangi Post Yaratish</h1>
                <p className="text-gray-600 dark:text-gray-400">Yangi blog post yarating</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => handleInputChange("is_published", false)} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                Qoralama saqla
              </Button>
              <Button onClick={() => handleInputChange("is_published", true)} disabled={loading}>
                <Eye className="w-4 h-4 mr-2" />
                Nashr qilish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800">Xatolik yuz berdi</h3>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
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
                  <p className="text-xs text-gray-500 mt-1">URL manzili uchun ishlatiladi</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <Youtube className="w-5 h-5" />
                  <span>YouTube Video</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    YouTube Video URL
                  </label>
                  <Input
                    value={formData.youtube_url}
                    onChange={(e) => handleInputChange("youtube_url", e.target.value)}
                    placeholder="https://youtu.be/WKYz4ZLLolc?si=zOpPMetTOm0qefXL"
                    className={!isValidYouTubeUrl(formData.youtube_url) ? "border-red-500" : ""}
                  />
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500">
                      YouTube video URL ni kiriting. Masalan: https://youtu.be/VIDEO_ID yoki
                      https://youtube.com/watch?v=VIDEO_ID
                    </p>
                    {formData.youtube_url && !isValidYouTubeUrl(formData.youtube_url) && (
                      <p className="text-xs text-red-500">❌ Noto'g'ri YouTube URL formati</p>
                    )}
                    {formData.youtube_url && isValidYouTubeUrl(formData.youtube_url) && (
                      <p className="text-xs text-green-600">✅ To'g'ri YouTube URL</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    placeholder="Post matni o'zbek tilida (HTML qo'llab-quvvatlanadi)"
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
                    placeholder="Post matni ingliz tilida (HTML qo'llab-quvvatlanadi)"
                    rows={10}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Qisqacha Mazmun</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Qisqacha (O'zbek)
                  </label>
                  <Textarea
                    value={formData.excerpt_uz}
                    onChange={(e) => handleInputChange("excerpt_uz", e.target.value)}
                    placeholder="Post qisqachasi o'zbek tilida"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Qisqacha (Ingliz)
                  </label>
                  <Textarea
                    value={formData.excerpt_en}
                    onChange={(e) => handleInputChange("excerpt_en", e.target.value)}
                    placeholder="Post qisqachasi ingliz tilida"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
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
                    Darhol nashr qilish
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
                    Asosiy post sifatida belgilash
                  </label>
                </div>
              </CardContent>
            </Card>

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

            <Card>
              <CardHeader>
                <CardTitle>Asosiy Rasm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Input
                    value={formData.featured_image}
                    onChange={(e) => handleInputChange("featured_image", e.target.value)}
                    placeholder="Rasm URL manzili"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) await handleFileUpload(file)
                    }}
                  />
                </div>
              </CardContent>
            </Card>

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
                <p className="text-xs text-gray-500 mt-1">Vergul bilan ajrating</p>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saqlanmoqda..." : formData.is_published ? "Nashr qilish" : "Qoralama saqlash"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
