"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Globe,
  Moon,
  Sun,
  ArrowLeft,
  MapPin,
  Calendar,
  Briefcase,
  Code,
  Camera,
  Plane,
  Heart,
  Mail,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const skills = [
  { name: "JavaScript", level: 95 },
  { name: "React", level: 90 },
  { name: "Next.js", level: 88 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
]

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Company",
    period: "2022 - Hozir",
    description: "React va Next.js yordamida zamonaviy veb-ilovalar yaratish",
  },
  {
    title: "Full Stack Developer",
    company: "Startup",
    period: "2020 - 2022",
    description: "To'liq stack yechimlar va API'lar yaratish",
  },
  {
    title: "Junior Developer",
    company: "IT Agency",
    period: "2019 - 2020",
    description: "Veb-saytlar va kichik ilovalar yaratish",
  },
]

export default function AboutPage() {
  const [language, setLanguage] = useState("uz")
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleLanguage = () => {
    setLanguage(language === "uz" ? "en" : "uz")
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const t = (uz: string, en: string) => (language === "uz" ? uz : en)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">Mansurbek Qazaqov</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        {...fadeInUp}
        className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-blue-500 ring-offset-4 ring-offset-white dark:ring-offset-gray-900">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Mansurbek Qazaqov" />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  MQ
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("Men haqimda", "About Me")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t("IT mutaxassisi, sayohatchi va hayot haqida yozuvchi", "IT specialist, traveler and life writer")}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="flex items-center space-x-2 px-4 py-2">
                <MapPin className="w-4 h-4" />
                <span>{t("Toshkent, O'zbekiston", "Tashkent, Uzbekistan")}</span>
              </Badge>
              <Badge className="flex items-center space-x-2 px-4 py-2">
                <Calendar className="w-4 h-4" />
                <span>{t("5+ yil tajriba", "5+ years experience")}</span>
              </Badge>
              <Badge className="flex items-center space-x-2 px-4 py-2">
                <Briefcase className="w-4 h-4" />
                <span>{t("Senior Developer", "Senior Developer")}</span>
              </Badge>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Bio Section */}
          <motion.section {...fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t("Mening hikoyam", "My Story")}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t("Dasturlash", "Programming")}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(
                      "5 yildan ortiq vaqt davomida zamonaviy veb-texnologiyalar bilan ishlayapman. React, Next.js, TypeScript va boshqa texnologiyalar yordamida professional loyihalar yarataman.",
                      "I have been working with modern web technologies for over 5 years. I create professional projects using React, Next.js, TypeScript and other technologies.",
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Plane className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t("Sayohat", "Travel")}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(
                      "Sayohat qilishni juda yaxshi ko'raman. Turli mamlakatlar va shaharlarni kashf etish, yangi madaniyatlar bilan tanishish mening sevimli mashg'ulotlarimdan biri.",
                      "I love traveling very much. Exploring different countries and cities, getting acquainted with new cultures is one of my favorite activities.",
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t("Fotografiya", "Photography")}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(
                      "Fotografiya orqali go'zal lahzalarni saqlab qolishni yaxshi ko'raman. Tabiat, arxitektura va odamlar suratini olish mening sevimli hobbim.",
                      "I love capturing beautiful moments through photography. Taking pictures of nature, architecture and people is my favorite hobby.",
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t("Blog yozish", "Blogging")}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(
                      "O'z tajribalarim va bilimlarimni boshqalar bilan bo'lishish uchun blog yozaman. IT, sayohat va hayot haqida maqolalar yozish menga katta zavq beradi.",
                      "I write a blog to share my experiences and knowledge with others. Writing articles about IT, travel and life gives me great pleasure.",
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section {...fadeInUp} transition={{ delay: 0.2 }} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t("Ko'nikmalar", "Skills")}
            </h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                        <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Experience Section */}
          <motion.section {...fadeInUp} transition={{ delay: 0.4 }} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t("Ish tajribasi", "Work Experience")}
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{exp.title}</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{exp.company}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{exp.period}</p>
                          <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section {...fadeInUp} transition={{ delay: 0.6 }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t("Bog'lanish", "Get in Touch")}
            </h2>
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {t(
                    "Agar sizda savollar bo'lsa yoki hamkorlik qilishni istasangiz, men bilan bog'laning!",
                    "If you have questions or want to collaborate, feel free to contact me!",
                  )}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:mansurbekqazaqov27@gmail.com"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{t("Email yuborish", "Send Email")}</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://t.me/Mansurbek_Qazaqov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{t("Telegram", "Telegram")}</span>
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-900 text-white py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Mansurbek Qazaqov</h3>
                <p className="text-gray-400">{t("Shaxsiy blog", "Personal blog")}</p>
              </div>
            </div>
            <p className="text-gray-400">
              © 2024 Mansurbek Qazaqov. {t("Barcha huquqlar himoyalangan.", "All rights reserved.")}
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
