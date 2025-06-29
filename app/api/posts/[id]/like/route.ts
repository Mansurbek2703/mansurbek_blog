import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const { type } = await request.json()

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid post ID" }, { status: 400 })
    }

    if (!["like", "dislike"].includes(type)) {
      return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 })
    }

    // Check if post exists
    const checkQuery = `SELECT id FROM posts WHERE id = $1 AND is_published = true`
    const checkResult = await pool.query(checkQuery, [id])

    if (checkResult.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
    }

    // Update likes/dislikes
    const field = type === "like" ? "likes" : "dislikes"
    const updateQuery = `UPDATE posts SET ${field} = ${field} + 1 WHERE id = $1`
    await pool.query(updateQuery, [id])

    return NextResponse.json({
      success: true,
      message: `Post ${type}d successfully`,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 })
  }
}
