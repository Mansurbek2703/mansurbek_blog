import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Agar action "like" bo'lsa, comment like qilish
    if (body.action === "like") {
      const commentId = Number.parseInt(params.id)

      if (!commentId || isNaN(commentId)) {
        return NextResponse.json({ success: false, error: "Invalid comment ID" }, { status: 400 })
      }

      // Update comment likes
      const query = `
        UPDATE comments
        SET likes = likes + 1
        WHERE id = $1
        RETURNING likes
      `

      const result = await pool.query(query, [commentId])

      if (result.rowCount === 0) {
        return NextResponse.json({ success: false, error: "Comment not found" }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        data: {
          likes_count: result.rows[0].likes,
        },
      })
    }

    // Eski kod - comment qo'shish uchun
    const { post_id, parent_id, author_name, author_email, content, content_en } = body

    if (!post_id || !author_name || !content) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    const query = `
      INSERT INTO comments (
        post_id, parent_id, author_name, author_email,
        content, content_en, ip_address, user_agent, is_approved, likes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `

    const values = [
      Number.parseInt(post_id),
      parent_id ? Number.parseInt(parent_id) : null,
      author_name,
      author_email || null,
      content,
      content_en || content,
      ip,
      userAgent,
      true, // Auto-approve comments for transparency
      0, // Initial likes count
    ]

    const result = await pool.query(query, values)

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("post_id")

    if (!postId) {
      return NextResponse.json({ success: false, error: "Post ID is required" }, { status: 400 })
    }

    // Get main comments
    const query = `
      SELECT * FROM comments
      WHERE post_id = $1 AND parent_id IS NULL AND is_approved = true
      ORDER BY created_at DESC
    `

    const result = await pool.query(query, [Number.parseInt(postId)])
    const comments = result.rows

    // Get replies for each comment
    for (const comment of comments) {
      const repliesQuery = `
        SELECT * FROM comments
        WHERE parent_id = $1 AND is_approved = true
        ORDER BY created_at ASC
      `
      const repliesResult = await pool.query(repliesQuery, [comment.id])
      comment.replies = repliesResult.rows
    }

    return NextResponse.json({
      success: true,
      data: comments,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch comments" }, { status: 500 })
  }
}
