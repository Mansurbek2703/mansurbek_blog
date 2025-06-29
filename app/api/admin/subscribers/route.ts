import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const query = `
      SELECT
        id,
        email,
        is_active,
        subscribed_at,
        unsubscribed_at
      FROM newsletter_subscribers
      ORDER BY subscribed_at DESC
    `

    const result = await pool.query(query)

    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch subscribers" }, { status: 500 })
  }
}
