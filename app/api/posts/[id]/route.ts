import { type NextRequest, NextResponse } from "next/server"
import { getPostById, updatePostViews, trackPageView } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid post ID" }, { status: 400 })
    }

    const post = await getPostById(id)

    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
    }

    // Update view count
    await updatePostViews(id)

    // Track page view
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    const referrer = request.headers.get("referer") || undefined

    await trackPageView({
      post_id: id,
      ip_address: ip,
      user_agent: userAgent,
      referrer,
    })

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch post" }, { status: 500 })
  }
}
