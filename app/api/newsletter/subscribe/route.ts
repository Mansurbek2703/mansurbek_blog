import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          message: "Noto'g'ri email manzil",
        },
        { status: 400 },
      )
    }

    // Email formatini tekshirish
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Email format noto'g'ri",
        },
        { status: 400 },
      )
    }

    try {
      // Avval jadval yaratish (agar yo'q bo'lsa)
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          is_active BOOLEAN DEFAULT true,
          subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `
      await pool.query(createTableQuery)

      // Mavjud obunachini tekshirish
      const existingQuery = `
        SELECT id, email, is_active
        FROM newsletter_subscribers
        WHERE email = $1 AND is_active = true
      `
      const existingResult = await pool.query(existingQuery, [email.toLowerCase()])

      if (existingResult.rows.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Bu email allaqachon obuna bo'lgan",
          },
          { status: 409 },
        )
      }

      // Yangi obunachi qo'shish
      const insertQuery = `
        INSERT INTO newsletter_subscribers (email, is_active, subscribed_at)
        VALUES ($1, true, CURRENT_TIMESTAMP)
        RETURNING id, email
      `
      const insertResult = await pool.query(insertQuery, [email.toLowerCase()])

      console.log(`✅ New subscriber added: ${email}`)

      return NextResponse.json(
        {
          success: true,
          message: "Muvaffaqiyatli obuna bo'ldingiz!",
        },
        { status: 201 },
      )
    } catch (dbError: any) {
      console.error("Database error:", dbError)

      // Agar email allaqachon mavjud bo'lsa
      if (dbError.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            message: "Bu email allaqachon obuna bo'lgan",
          },
          { status: 409 },
        )
      }

      return NextResponse.json(
        {
          success: false,
          message: "Database xatoligi yuz berdi",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Server xatoligi",
      },
      { status: 500 },
    )
  }
}

// GET method - test uchun
export async function GET() {
  try {
    // Avval jadval yaratish
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        is_active BOOLEAN DEFAULT true,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
    await pool.query(createTableQuery)

    const query = `
      SELECT COUNT(*) as total_subscribers
      FROM newsletter_subscribers
      WHERE is_active = true
    `
    const result = await pool.query(query)

    return NextResponse.json({
      success: true,
      message: "Newsletter API ishlayapti",
      data: {
        total_subscribers: result.rows[0].total_subscribers,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error("GET error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Database bilan bog'lanishda xatolik",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
