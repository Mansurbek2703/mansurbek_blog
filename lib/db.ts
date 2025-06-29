import { Pool } from "pg"

// Database connection configuration
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "mansurbek_blog",
  password: process.env.DB_PASSWORD || "root",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Test database connection
pool.on("connect", () => {
  console.log("✅ PostgreSQL database connected successfully")
})

pool.on("error", (err) => {
  console.error("❌ PostgreSQL connection error:", err)
})

// Graceful shutdown
process.on("SIGINT", () => {
  pool.end(() => {
    console.log("🔌 PostgreSQL connection pool closed")
    process.exit(0)
  })
})

process.on("SIGTERM", () => {
  pool.end(() => {
    console.log("🔌 PostgreSQL connection pool closed")
    process.exit(0)
  })
})

export default pool
