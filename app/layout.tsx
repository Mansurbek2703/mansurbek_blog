import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mansurbek Qazaqov - Shaxsiy Blog",
  description:
    "IT, sayohat va hayot haqida maqolalar. Bilim almashish va tajriba bo'lishish uchun yaratilgan platforma.",
  keywords: "IT, blog, sayohat, texnologiya, dasturlash, Mansurbek Qazaqov",
  authors: [{ name: "Mansurbek Qazaqov" }],
  openGraph: {
    title: "Mansurbek Qazaqov - Shaxsiy Blog",
    description: "IT, sayohat va hayot haqida maqolalar",
    url: "https://mansurbekqazaqov.uz",
    siteName: "Mansurbek Qazaqov Blog",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mansurbek Qazaqov Blog",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mansurbek Qazaqov - Shaxsiy Blog",
    description: "IT, sayohat va hayot haqida maqolalar",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
