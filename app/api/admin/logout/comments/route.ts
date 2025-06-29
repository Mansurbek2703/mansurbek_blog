import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
  try {
    const query = `
      SELECT 
        c.*,
        p.title_uz as post_title,
        (SELECT COUNT(*) FROM comments WHERE parent_id = c.id) as replies_count
      FROM comments c
      LEFT JOIN posts p ON c.post_id = p.id
      WHERE c.parent_id IS NULL
      ORDER BY c.created_at DESC
    `

    const result = await pool.query(query)

    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch comments" }, { status: 500 })
  }
}
