import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    const query = `DELETE FROM comments WHERE id = $1`
    await pool.query(query, [id])

    return NextResponse.json({
      success: true,
      message: "Izoh o'chirildi",
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete comment" }, { status: 500 })
  }
}
