"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Users, Search, Mail, Calendar, Download, UserCheck, UserX } from "lucide-react"
import Link from "next/link"

interface Subscriber {
  id: number
  email: string
  is_active: boolean
  subscribed_at: string
  unsubscribed_at?: string
}

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all")

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/admin/subscribers")
      const data = await response.json()
      if (data.success) {
        setSubscribers(data.data)
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && subscriber.is_active) ||
      (filter === "inactive" && !subscriber.is_active)

    return matchesSearch && matchesFilter
  })

  const exportSubscribers = () => {
    const csvContent = [
      ["Email", "Status", "Subscribed Date", "Unsubscribed Date"],
      ...filteredSubscribers.map((sub) => [
        sub.email,
        sub.is_active ? "Active" : "Inactive",
        new Date(sub.subscribed_at).toLocaleDateString("uz-UZ"),
        sub.unsubscribed_at ? new Date(sub.unsubscribed_at).toLocaleDateString("uz-UZ") : "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `subscribers_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Obunachi ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  const activeCount = subscribers.filter((s) => s.is_active).length
  const inactiveCount = subscribers.filter((s) => !s.is_active).length

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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Newsletter Obunachilari</h1>
                <p className="text-gray-600 dark:text-gray-400">Barcha obunachi ma'lumotlarini ko'rish</p>
              </div>
            </div>
            <Button onClick={exportSubscribers} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              CSV Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jami Obunachi</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribers.length}</div>
              <p className="text-xs text-muted-foreground">Barcha vaqt davomida</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faol Obunachi</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeCount}</div>
              <p className="text-xs text-muted-foreground">
                {subscribers.length > 0 ? Math.round((activeCount / subscribers.length) * 100) : 0}% jami obunachidan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Obunani Bekor Qilgan</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{inactiveCount}</div>
              <p className="text-xs text-muted-foreground">
                {subscribers.length > 0 ? Math.round((inactiveCount / subscribers.length) * 100) : 0}% jami obunachidan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Email bo'yicha qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
                  Barchasi ({subscribers.length})
                </Button>
                <Button
                  variant={filter === "active" ? "default" : "outline"}
                  onClick={() => setFilter("active")}
                  size="sm"
                >
                  Faol ({activeCount})
                </Button>
                <Button
                  variant={filter === "inactive" ? "default" : "outline"}
                  onClick={() => setFilter("inactive")}
                  size="sm"
                >
                  Nofaol ({inactiveCount})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscribers List */}
        <div className="space-y-4">
          {filteredSubscribers.map((subscriber) => (
            <motion.div
              key={subscriber.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{subscriber.email}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Obuna: {new Date(subscriber.subscribed_at).toLocaleDateString("uz-UZ")}
                          </span>
                          {subscriber.unsubscribed_at && (
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Bekor qilgan: {new Date(subscriber.unsubscribed_at).toLocaleDateString("uz-UZ")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={subscriber.is_active ? "default" : "secondary"}>
                        {subscriber.is_active ? "Faol" : "Nofaol"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredSubscribers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {searchQuery ? "Qidiruv natijasi topilmadi" : "Obunachi topilmadi"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery
                  ? `"${searchQuery}" bo'yicha qidiruv natijasi yo'q`
                  : filter === "all"
                    ? "Hali hech kim newsletter ga obuna bo'lmagan"
                    : filter === "active"
                      ? "Faol obunachi mavjud emas"
                      : "Obunani bekor qilgan foydalanuvchi mavjud emas"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
