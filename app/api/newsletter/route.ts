import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, source = "email" } = await request.json()

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
      // Mavjud obunachini tekshirish
      const existingSubscriber = await checkExistingSubscriber(email)

      if (existingSubscriber) {
        return NextResponse.json(
          {
            success: false,
            message: "Bu email allaqachon obuna bo'lgan",
          },
          { status: 409 },
        )
      }

      // Yangi obunachi qo'shish
      await insertSubscriber(email)

      return NextResponse.json(
        {
          success: true,
          message: "Muvaffaqiyatli obuna bo'ldingiz!",
        },
        { status: 201 },
      )
    } catch (dbError: any) {
      console.error("Database error:", dbError)
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

// Real database functions
async function checkExistingSubscriber(email: string) {
  try {
    const query = `
      SELECT id, email, is_active
      FROM newsletter_subscribers
      WHERE email = $1 AND is_active = true
    `
    const result = await pool.query(query, [email.toLowerCase()])
    return result.rows.length > 0 ? result.rows[0] : null
  } catch (error) {
    console.error("Error checking existing subscriber:", error)
    throw error
  }
}

async function insertSubscriber(email: string) {
  try {
    // Avval jadval mavjudligini tekshirish va yaratish (source ustunisiz)
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

    // Yangi obunachi qo'shish (source ustunisiz)
    const insertQuery = `
      INSERT INTO newsletter_subscribers (email, is_active, subscribed_at)
      VALUES ($1, true, CURRENT_TIMESTAMP)
      RETURNING id, email
    `
    const result = await pool.query(insertQuery, [email.toLowerCase()])

    console.log(`✅ New subscriber added: ${email}`)
    return result.rows[0]
  } catch (error: any) {
    // Agar email allaqachon mavjud bo'lsa
    if (error.code === "23505") {
      throw new Error("Email already exists")
    }
    console.error("Error inserting subscriber:", error)
    throw error
  }
}

// GET method - test uchun
export async function GET() {
  try {
    // Avval jadval yaratish (source ustunisiz)
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

    // Barcha obunachilarnni ko'rsatish
    const allSubscribersQuery = `
      SELECT id, email, subscribed_at
      FROM newsletter_subscribers
      WHERE is_active = true
      ORDER BY subscribed_at DESC
      LIMIT 10
    `
    const allResult = await pool.query(allSubscribersQuery)

    return NextResponse.json({
      success: true,
      message: "Newsletter API ishlayapti",
      data: {
        total_subscribers: result.rows[0].total_subscribers,
        recent_subscribers: allResult.rows,
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
