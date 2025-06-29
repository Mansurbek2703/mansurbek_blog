import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    const query = `
      UPDATE comments 
      SET is_approved = true, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `

    await pool.query(query, [id])

    return NextResponse.json({
      success: true,
      message: "Izoh tasdiqlandi",
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to approve comment" }, { status: 500 })
  }
}
