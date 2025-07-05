"use client"
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
  Laptop,
  Sparkles,
  Star,
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

const skills = [
  { name: "Power BI", level: 40 },
  { name: "Matlab", level: 50 },
  { name: "Next.js", level: 60 },
  { name: "SQL", level: 55 },
  { name: "C++", level: 80 },
  { name: "Python", level: 75 },
]

const experiences = [
  {
    title: "Junior Backend Developer",
    company: "Occupy myself",
    period: "2024 - Hozir",
    description: "React va Next.js yordamida zamonaviy veb-ilovalar yaratish",
  },
  {
    title: "Learning SQL, Web programming",
    company: "UBTUIT",
    period: "2022 - 2024",
    description: "To'liq tizimlar va API'lar yaratish",
  },
  {
    title: "Start of IT interest",
    company: "general school",
    period: "2021 - 2022",
    description: "Office dasturlari bilan ishlash",
  },
]

export default function AboutPage() {
  const { language, darkMode, isLoaded, toggleLanguage, toggleDarkMode, t } = useGlobalSettings()

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
              <Avatar className="w-40 h-40 mx-auto mb-8 ring-4 ring-blue-500 ring-offset-8 ring-offset-white dark:ring-offset-gray-900 shadow-2xl">
                <AvatarImage src="/men.jpg" alt="Mansurbek Qazaqov" />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  MQ
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent mb-8 drop-shadow-lg"
            >
              {t("Men haqimda", "About Me")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed"
            >
              {t(
                "IT mutaxassisi, matematik. Til o'rganish sevimli hobbim",
                "IT specialist, mathematician, language learning enthusiast",
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-6 mb-10"
            >
              <motion.div whileHover={{ scale: 1.05, y: -3 }}>
                <Badge className="flex items-center space-x-3 px-6 py-3 text-lg bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 dark:from-blue-900 dark:to-cyan-900 dark:text-blue-200 shadow-lg">
                  <MapPin className="w-5 h-5" />
                  <span>{t("Urganch, O'zbekiston", "Urgench, Uzbekistan")}</span>
                </Badge>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -3 }}>
                <Badge className="flex items-center space-x-3 px-6 py-3 text-lg bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900 dark:to-emerald-900 dark:text-green-200 shadow-lg">
                  <Calendar className="w-5 h-5" />
                  <span>{t("3+ yil tajriba", "3+ years experience")}</span>
                </Badge>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -3 }}>
                <Badge className="flex items-center space-x-3 px-6 py-3 text-lg bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 dark:from-cyan-900 dark:to-blue-900 dark:text-cyan-200 shadow-lg">
                  <Briefcase className="w-5 h-5" />
                  <span>{t("Junior Developer", "Junior Developer")}</span>
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Main Content */}
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Bio Section */}
          <motion.section {...fadeInUp} className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-12 text-center"
            >
              {t("Mening hikoyam", "My Story")}
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid md:grid-cols-2 gap-8"
            >
              <motion.div variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.03, y: -5, rotateY: 5 }} whileTap={{ scale: 0.98 }}>
                  <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 dark:border-blue-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                        >
                          <Code className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {t("Dasturlash", "Programming")}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {t(
                          "3 yildan ortiq vaqt davomida zamonaviy veb-texnologiyalar bilan ishlayapman. Python-Django, Python-Flask, React, Next.js, TypeScript va boshqa texnologiyalar yordamida kichik loyihalar yarataman.",
                          "I have been working with modern web technologies for over 3 years. I create small projects using Python-Django, Python-Flask, React, Next.js, TypeScript and other technologies.",
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.03, y: -5, rotateY: 5 }} whileTap={{ scale: 0.98 }}>
                  <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-green-200 dark:border-green-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:border-green-400 dark:hover:border-green-500">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                        >
                          <Plane className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t("Sayohat", "Travel")}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {t(
                          "Yangi tillarni o'rganishni va doimiy o'rganishda rivojlanishni yoqtiraman. Turli mamlakatlar va shaharlarni o'zim uchun kashf etish asosiy maqsadlarimdan biri.",
                          "I enjoy learning new languages and continuously growing through lifelong learning. Discovering different countries and cities is one of my main goals.",
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.03, y: -5, rotateY: 5 }} whileTap={{ scale: 0.98 }}>
                  <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-cyan-200 dark:border-cyan-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:border-cyan-400 dark:hover:border-cyan-500">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                        >
                          <Camera className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {t("Muloqot mahoratlari", "Communicating skills")}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {t(
                          "Ingliz tilida erkin muloqot qilish va akademik hujjatlar tayyorlash, native speakerlar bilan doimiy suhbatlar o'tkazish va til o'rgatishda volontyorlik ishlari bilan shug'ullanaman",
                          "I actively engage in fluent English communication and academic document preparation, regularly hold conversations with native speakers, and participate in volunteer work focused on language teaching.",
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.03, y: -5, rotateY: 5 }} whileTap={{ scale: 0.98 }}>
                  <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-emerald-200 dark:border-emerald-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:border-emerald-400 dark:hover:border-emerald-500">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg"
                        >
                          <Heart className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {t("Blog yozish", "Blogging")}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {t(
                          "O'z tajribalarim va bilimlarimni boshqalar bilan bo'lishish uchun blog yozaman. IT, sayohat va hayot haqida maqolalar yozish menga katta zavq beradi.",
                          "I write a blog to share my experiences and knowledge with others. Writing articles about IT, travel and life gives me great pleasure.",
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Enhanced Skills Section */}
          <motion.section {...fadeInUp} transition={{ delay: 0.2 }} className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-12 text-center"
            >
              {t("Ko'nikmalar", "Skills")}
            </motion.h2>
            <motion.div whileHover={{ scale: 1.02, y: -5 }}>
              <Card className="shadow-2xl border-2 border-blue-200 dark:border-blue-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                <CardContent className="p-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-4"
                      >
                        <div className="flex justify-between">
                          <span className="font-bold text-gray-900 dark:text-white text-lg">{skill.name}</span>
                          <span className="text-gray-600 dark:text-gray-400 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                            className="bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 h-3 rounded-full shadow-lg"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>

          {/* Enhanced Experience Section */}
          <motion.section {...fadeInUp} transition={{ delay: 0.4 }} className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-12 text-center"
            >
              {t("Ish tajribasi", "Work Experience")}
            </motion.h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div whileHover={{ scale: 1.02, x: 10 }} whileTap={{ scale: 0.98 }}>
                    <Card className="shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 dark:border-blue-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                          >
                            <Briefcase className="w-8 h-8 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{exp.title}</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3 text-lg">{exp.company}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 font-medium">{exp.period}</p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Enhanced Contact Section */}
          <motion.section {...fadeInUp} transition={{ delay: 0.6 }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-12 text-center"
            >
              {t("Bog'lanish", "Get in Touch")}
            </motion.h2>
            <motion.div whileHover={{ scale: 1.02, y: -5 }}>
              <Card className="shadow-2xl border-2 border-green-200 dark:border-green-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-10 text-xl leading-relaxed">
                    {t(
                      "Agar sizda savollar bo'lsa yoki hamkorlik qilishni istasangiz, men bilan bog'laning!",
                      "If you have questions or want to collaborate, feel free to contact me!",
                    )}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <motion.a
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      href="mailto:mansurbekqazaqov27@gmail.com"
                      className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
                    >
                      <Mail className="w-6 h-6" />
                      <span>{t("Email yuborish", "Send Email")}</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://t.me/Mansurbek_Qazaqov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span>{t("Telegram", "Telegram")}</span>
                    </motion.a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
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
