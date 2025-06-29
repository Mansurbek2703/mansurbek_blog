const { Pool } = require("pg")

// PostgreSQL connection konfiguratsiyasini sizning .env.local ga moslashtirish
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "mansurbek_blog",
  password: process.env.DB_PASSWORD || "root",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
})

// Mavjud posts jadvaliga faqat youtube_url maydonini qo'shish
async function addYouTubeField() {
  try {
    console.log("🚀 Adding YouTube URL field to existing posts table...")

    // Avval youtube_url maydoni mavjudligini tekshirish
    const checkColumnQuery = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'posts' AND column_name = 'youtube_url'
    `

    const columnExists = await pool.query(checkColumnQuery)

    if (columnExists.rows.length > 0) {
      console.log("ℹ️  YouTube URL field already exists, skipping...")
      await pool.end()
      return
    }

    // Mavjud posts jadvaliga youtube_url maydonini qo'shish
    const addColumnQuery = `
      ALTER TABLE posts
      ADD COLUMN youtube_url VARCHAR(500)
    `

    await pool.query(addColumnQuery)

    // Maydon uchun izoh qo'shish
    const addCommentQuery = `
      COMMENT ON COLUMN posts.youtube_url IS 'YouTube video URL for the post'
    `

    await pool.query(addCommentQuery)

    // YouTube URL lar uchun indeks yaratish (performance uchun)
    const createIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_posts_youtube
      ON posts(youtube_url)
      WHERE youtube_url IS NOT NULL
    `

    await pool.query(createIndexQuery)

    // Birinchi postga namuna YouTube URL qo'shish (ixtiyoriy)
    const updateSampleQuery = `
      UPDATE posts
      SET youtube_url = 'https://youtu.be/WKYz4ZLLolc?si=zOpPMetTOm0qefXL'
      WHERE id = 1 AND youtube_url IS NULL
    `

    const updateResult = await pool.query(updateSampleQuery)

    console.log("✅ YouTube URL field successfully added to existing posts table")
    console.log(`📝 Updated ${updateResult.rowCount} existing post with sample YouTube URL`)

    await pool.end()
  } catch (error) {
    console.error("❌ Failed to add YouTube field:", error)
    process.exit(1)
  }
}

addYouTubeField()
