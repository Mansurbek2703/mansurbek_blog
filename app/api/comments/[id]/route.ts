import { NextResponse, type NextRequest } from "next/server";
import pool from "@/lib/db";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const commentId = Number.parseInt(params.id);

    if (isNaN(commentId)) {
      return NextResponse.json({ success: false, error: "Invalid comment ID" }, { status: 400 });
    }

    const updateResult = await pool.query(
      `UPDATE comments SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING likes`,
      [commentId]
    );

    if (updateResult.rowCount === 0) {
      return NextResponse.json({ success: false, error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { likes_count: updateResult.rows[0].likes },
    });
  } catch (error) {
    console.error("Error updating comment like:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
