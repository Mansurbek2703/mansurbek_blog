import { type NextRequest, NextResponse } from "next/server"
import { getPosts } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
    const offset = searchParams.get("offset") ? Number.parseInt(searchParams.get("offset")!) : 0
    const category = searchParams.get("category") || undefined
    const search = searchParams.get("search") || undefined
    const featured = searchParams.get("featured") === "true" ? true : undefined

    const posts = await getPosts({
      limit,
      offset,
      category,
      search,
      featured,
      published: true,
    })

    return NextResponse.json({
      success: true,
      data: posts,
      total: posts.length,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 })
  }
}
