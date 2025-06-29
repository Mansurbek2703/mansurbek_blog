import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import pool from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email va parol talab qilinadi" }, { status: 400 })
    }

    // Database dan admin foydalanuvchini olish
    const result = await pool.query("SELECT * FROM admin_users WHERE email = $1", [email])

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Noto'g'ri email yoki parol" }, { status: 401 })
    }

    const admin = result.rows[0]

    // Parolni tekshirish
    const isValidPassword = await bcrypt.compare(password, admin.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ success: false, error: "Noto'g'ri email yoki parol" }, { status: 401 })
    }

    // JWT token yaratish
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        name: admin.full_name,
        role: admin.role,
      },
      process.env.NEXTAUTH_SECRET || "secret-key",
      { expiresIn: "7d" },
    )

    // Response yaratish
    const response = NextResponse.json({
      success: true,
      message: "Muvaffaqiyatli kirildi",
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.full_name,
        role: admin.role,
      },
    })

    // HTTP-only cookie o'rnatish
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 kun
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Server xatosi" }, { status: 500 })
  }
}
