"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Globe,
  Moon,
  Sun,
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  Clock,
  User,
  Laptop,
  Sparkles,
  Star,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useGlobalSettings } from "@/hooks/useGlobalSettings"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const floatingLaptop = {
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

const sparkleAnimation = {
  animate: {
    scale: [0, 1, 0],
    rotate: [0, 180, 360],
    opacity: [0, 1, 0],
  },
  transition: {
    duration: 2.5,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

// Enhanced Floating Background Component
const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Enhanced Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
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
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 28,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-r from-green-400/25 to-emerald-400/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
      />

      {/* 6 Enhanced Floating Laptops with different sizes and animations */}
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 0, duration: 10 }}
        className="absolute top-40 left-20 opacity-18"
      >
        <Laptop className="w-24 h-24 text-blue-500 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 1.5, duration: 12 }}
        className="absolute top-80 right-40 opacity-22"
      >
        <Laptop className="w-20 h-20 text-blue-600 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 3, duration: 14 }}
        className="absolute bottom-60 left-1/4 opacity-15"
      >
        <Laptop className="w-28 h-28 text-cyan-500 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 4.5, duration: 9 }}
        className="absolute top-[450px] right-1/3 opacity-20"
      >
        <Laptop className="w-18 h-18 text-blue-400 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 6, duration: 11 }}
        className="absolute bottom-40 right-20 opacity-16"
      >
        <Laptop className="w-22 h-22 text-cyan-600 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>
      <motion.div
        {...floatingLaptop}
        transition={{ ...floatingLaptop.transition, delay: 7.5, duration: 13 }}
        className="absolute top-[550px] left-1/3 opacity-12"
      >
        <Laptop className="w-19 h-19 text-blue-300 drop-shadow-2xl filter blur-[0.3px]" />
      </motion.div>

      {/* Enhanced Sparkles */}
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 0 }}
        className="absolute top-60 left-1/2 opacity-35"
      >
        <Sparkles className="w-7 h-7 text-cyan-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 1 }}
        className="absolute bottom-80 right-1/4 opacity-30"
      >
        <Star className="w-5 h-5 text-blue-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 2 }}
        className="absolute top-96 left-1/4 opacity-25"
      >
        <Sparkles className="w-6 h-6 text-green-400" />
      </motion.div>
      <motion.div
        {...sparkleAnimation}
        transition={{ ...sparkleAnimation.transition, delay: 3 }}
        className="absolute bottom-[450px] right-1/3 opacity-28"
      >
        <Star className="w-4 h-4 text-cyan-500" />
      </motion.div>
    </div>
  )
}

export default function ContactPage() {
  const { language, darkMode, isLoaded, toggleLanguage, toggleDarkMode, t } = useGlobalSettings()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Loading check qo'shing:
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
        <FloatingBackground />
        <div className="text-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6 shadow-2xl"
          />
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">{t("Yuklanmoqda...", "Loading...")}</p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSuccess(false), 5000)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "dark bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50"
      }`}
    >
      <FloatingBackground />

      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-gray-900/85 border-b border-blue-200/50 dark:border-blue-700/50 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/" className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold text-lg">M</span>
                </motion.div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Mansurbek Qazaqov
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-800 dark:to-cyan-800 text-blue-700 dark:text-blue-300 hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-700 dark:hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-semibold">{language.toUpperCase()}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-3 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 text-green-700 dark:text-green-300 hover:from-green-200 hover:to-emerald-200 dark:hover:from-green-700 dark:hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Hero Section */}
      <motion.section
        {...fadeInUp}
        className="relative py-24 bg-gradient-to-br from-blue-100/60 via-cyan-100/60 to-green-100/60 dark:from-blue-900/40 dark:via-cyan-900/40 dark:to-green-900/40 overflow-hidden backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-10"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Mail className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent mb-8 drop-shadow-lg"
            >
              {t("Aloqa", "Contact")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed"
            >
              {t(
                "Men bilan bog'lanish uchun quyidagi ma'lumotlardan foydalaning",
                "Use the following information to contact me",
              )}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Info */}
            <motion.div {...fadeInUp} className="space-y-10">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-8"
                >
                  {t("Bog'lanish ma'lumotlari", "Contact Information")}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 dark:text-gray-300 mb-10 text-lg leading-relaxed"
                >
                  {t(
                    "Agar sizda savollar bo'lsa yoki hamkorlik qilishni istasangiz, quyidagi usullar orqali men bilan bog'laning.",
                    "If you have questions or want to collaborate, contact me through the following methods.",
                  )}
                </motion.p>
              </div>

              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                <motion.div variants={fadeInUp}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5, rotateY: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-6 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 dark:border-blue-700 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <Mail className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">Email</h3>
                      <a
                        href="mailto:mansurbekqazaqov27@gmail.com"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-lg"
                      >
                        mansurbekqazaqov27@gmail.com
                      </a>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5, rotateY: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-6 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-green-200 dark:border-green-700 backdrop-blur-sm hover:border-green-400 dark:hover:border-green-500"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <Phone className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">{t("Telefon", "Phone")}</h3>
                      <a
                        href="tel:+998972112008"
                        className="text-green-600 dark:text-green-400 hover:underline text-lg"
                      >
                        +998 97 211 20 08
                      </a>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5, rotateY: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-6 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-cyan-200 dark:border-cyan-700 backdrop-blur-sm hover:border-cyan-400 dark:hover:border-cyan-500"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <MessageCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">Telegram</h3>
                      <a
                        href="https://t.me/Mansurbek_Qazaqov"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-600 dark:text-cyan-400 hover:underline text-lg"
                      >
                        @Mansurbek_Qazaqov
                      </a>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5, rotateY: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-6 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-emerald-200 dark:border-emerald-700 backdrop-blur-sm hover:border-emerald-400 dark:hover:border-emerald-500"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <MapPin className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">{t("Manzil", "Address")}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {t("Urganch, O'zbekiston", "Urgench, Uzbekistan")}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5, rotateY: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-6 p-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 dark:border-blue-700 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <Clock className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">
                        {t("Ish vaqti", "Working Hours")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {t("Dushanba - Juma: 9:00 - 18:00", "Monday - Friday: 9:00 - 18:00")}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Enhanced Contact Form */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <motion.div whileHover={{ scale: 1.02, y: -5 }}>
                <Card className="shadow-2xl border-2 border-blue-200 dark:border-blue-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent text-center">
                      {t("Xabar yuborish", "Send Message")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/50 dark:to-emerald-900/50 border-2 border-green-200 dark:border-green-700 rounded-2xl shadow-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                          <p className="text-green-700 dark:text-green-300 font-semibold text-lg">
                            {t("Xabaringiz muvaffaqiyatli yuborildi!", "Your message has been sent successfully!")}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            {t("Ism", "Name")} *
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder={t("Ismingizni kiriting", "Enter your name")}
                              className="pl-12 h-14 bg-white/90 dark:bg-gray-800/90 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl shadow-lg backdrop-blur-sm text-lg"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Email *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder={t("Email manzilingizni kiriting", "Enter your email address")}
                              className="pl-12 h-14 bg-white/90 dark:bg-gray-800/90 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl shadow-lg backdrop-blur-sm text-lg"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          {t("Mavzu", "Subject")} *
                        </label>
                        <Input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          placeholder={t("Xabar mavzusini kiriting", "Enter message subject")}
                          className="h-14 bg-white/90 dark:bg-gray-800/90 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl shadow-lg backdrop-blur-sm text-lg"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          {t("Xabar", "Message")} *
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder={t("Xabaringizni yozing...", "Write your message...")}
                          rows={6}
                          className="bg-white/90 dark:bg-gray-800/90 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl shadow-lg backdrop-blur-sm text-lg resize-none"
                          required
                        />
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          className="w-full h-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 hover:from-blue-600 hover:via-cyan-600 hover:to-green-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="flex items-center space-x-3">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                              />
                              <span>{t("Yuborilmoqda...", "Sending...")}</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-3">
                              <Send className="w-6 h-6" />
                              <span>{t("Xabar yuborish", "Send Message")}</span>
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="flex items-center justify-center space-x-4 mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  Mansurbek Qazaqov
                </h3>
                <p className="text-gray-400 text-lg">{t("Shaxsiy blog", "Personal blog")}</p>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-400 text-lg"
            >
              © 2025 Mansurbek Qazaqov. {t("Barcha huquqlar himoyalangan.", "All rights reserved.")}
            </motion.p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
