const { Pool } = require("pg")
const fs = require("fs")
const path = require("path")

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: "postgres", // Connect to default database first
  password: process.env.DB_PASSWORD || "root",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
})

async function setupDatabase() {
  try {
    console.log("🚀 Setting up database...")

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || "mansurbek_blog"

    try {
      await pool.query(`CREATE DATABASE ${dbName}`)
      console.log(`✅ Database '${dbName}' created successfully`)
    } catch (error) {
      if (error.code === "42P04") {
        console.log(`ℹ️  Database '${dbName}' already exists`)
      } else {
        throw error
      }
    }

    // Connect to the new database
    const appPool = new Pool({
      user: process.env.DB_USER || "postgres",
      host: process.env.DB_HOST || "localhost",
      database: dbName,
      password: process.env.DB_PASSWORD || "root",
      port: Number.parseInt(process.env.DB_PORT || "5432"),
    })

    // Check if tables exist
    const tablesResult = await appPool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `)

    const existingTables = tablesResult.rows.map((row) => row.table_name)

    if (existingTables.length === 0) {
      // Read and execute schema
      const schemaPath = path.join(__dirname, "../database/schema.sql")
      const schema = fs.readFileSync(schemaPath, "utf8")

      await appPool.query(schema)
      console.log("✅ Database schema created successfully")
    } else {
      console.log("ℹ️  Database schema already exists")
    }

    // Check if data exists
    const dataCheck = await appPool.query("SELECT COUNT(*) FROM categories")
    const categoryCount = Number.parseInt(dataCheck.rows[0].count)

    if (categoryCount === 0) {
      // Read and execute seed data
      const seedPath = path.join(__dirname, "../database/seed.sql")
      const seedData = fs.readFileSync(seedPath, "utf8")

      await appPool.query(seedData)
      console.log("✅ Database seeded successfully")
    } else {
      console.log("ℹ️  Database already contains data, skipping seed")
    }

    await appPool.end()
    await pool.end()

    console.log("🎉 Database setup completed!")
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    process.exit(1)
  }
}

setupDatabase()
