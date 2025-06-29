import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const { is_published } = await request.json()

    const query = `
      UPDATE posts 
      SET is_published = $1, published_at = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
    `

    const values = [is_published, is_published ? new Date().toISOString() : null, id]

    await pool.query(query, values)

    return NextResponse.json({
      success: true,
      message: `Post ${is_published ? "nashr qilindi" : "yashirildi"}`,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 })
  }
}
