"use client"

import { useState, useEffect } from "react"

export type Language = "uz" | "en"

export function useGlobalSettings() {
  const [language, setLanguage] = useState<Language>("uz")
  const [darkMode, setDarkMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Sozlamalarni localStorage dan yuklash
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("blog-language") as Language
      const savedDarkMode = localStorage.getItem("blog-dark-mode")

      if (savedLanguage && (savedLanguage === "uz" || savedLanguage === "en")) {
        setLanguage(savedLanguage)
      }

      if (savedDarkMode) {
        const isDark = savedDarkMode === "true"
        setDarkMode(isDark)
        // Dark mode ni darhol qo'llash
        document.documentElement.classList.toggle("dark", isDark)
      }

      setIsLoaded(true)
    }
  }, [])

  // Tilni o'zgartirish
  const toggleLanguage = () => {
    const newLanguage: Language = language === "uz" ? "en" : "uz"
    setLanguage(newLanguage)
    if (typeof window !== "undefined") {
      localStorage.setItem("blog-language", newLanguage)
    }
  }

  // Tungi rejimni o'zgartirish
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    if (typeof window !== "undefined") {
      localStorage.setItem("blog-dark-mode", newDarkMode.toString())
      document.documentElement.classList.toggle("dark", newDarkMode)
    }
  }

  // Til tarjimasi uchun helper funksiya
  const t = (uz: string, en: string) => (language === "uz" ? uz : en)

  return {
    language,
    darkMode,
    isLoaded,
    toggleLanguage,
    toggleDarkMode,
    t,
  }
}
