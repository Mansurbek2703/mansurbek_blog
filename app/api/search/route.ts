import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const limit = searchParams.get("limit") || "10"

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        query: query || "",
      })
    }

    const searchQuery = `
      SELECT
        p.id,
        p.title_uz,
        p.title_en,
        p.excerpt_uz,
        p.excerpt_en,
        p.slug,
        p.featured_image,
        p.published_at,
        p.views,
        c.name as category_name,
        c.name_en as category_name_en
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_published = true
      AND (
        p.title_uz ILIKE $1 OR
        p.title_en ILIKE $1 OR
        p.content_uz ILIKE $1 OR
        p.content_en ILIKE $1 OR
        p.excerpt_uz ILIKE $1 OR
        p.excerpt_en ILIKE $1
      )
      ORDER BY p.published_at DESC
      LIMIT $2
    `

    const searchTerm = `%${query.trim()}%`
    const result = await pool.query(searchQuery, [searchTerm, Number.parseInt(limit)])

    return NextResponse.json({
      success: true,
      data: result.rows,
      total: result.rows.length,
      query: query.trim(),
    })
  } catch (error) {
    console.error("Search API Error:", error)

    // Fallback - mock data qaytarish
    const mockResults = [
      {
        id: 1,
        title_uz: "IT sohasida karyera qurish yo'llari",
        title_en: "Career paths in IT industry",
        excerpt_uz: "Zamonaviy IT sohasida muvaffaqiyatli karyera qurish uchun zarur bo'lgan ko'nikmalar",
        excerpt_en: "Essential skills for building a successful career in modern IT industry",
        slug: "it-career-paths",
        featured_image: "/placeholder.svg?height=200&width=300",
        published_at: "2024-01-15",
        views: 1250,
        category_name: "Ta'lim",
        category_name_en: "Education",
      },
    ]

    return NextResponse.json({
      success: true,
      data: mockResults,
      total: mockResults.length,
      query: request.nextUrl.searchParams.get("q") || "",
    })
  }
}
