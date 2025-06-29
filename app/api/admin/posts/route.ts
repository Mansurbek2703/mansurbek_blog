import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("📝 Creating new post with data:", body)

    const {
      title_uz,
      title_en,
      slug,
      content_uz,
      content_en,
      excerpt_uz,
      excerpt_en,
      category_id,
      featured_image,
      youtube_url,
      tags,
      is_published,
      is_featured,
    } = body

    // Majburiy maydonlarni tekshirish
    if (!title_uz || !title_en || !slug || !content_uz || !content_en) {
      return NextResponse.json(
        {
          success: false,
          error: "Majburiy maydonlar to'ldirilmagan",
          missing_fields: {
            title_uz: !title_uz,
            title_en: !title_en,
            slug: !slug,
            content_uz: !content_uz,
            content_en: !content_en,
          },
        },
        { status: 400 },
      )
    }

    // Slug unique ekanligini tekshirish
    const slugCheck = await pool.query("SELECT id FROM posts WHERE slug = $1", [slug])
    if (slugCheck.rows.length > 0) {
      return NextResponse.json({ success: false, error: "Bu slug allaqachon mavjud" }, { status: 400 })
    }

    // Post yaratish
    const query = `
      INSERT INTO posts (
        title_uz, title_en, slug, content_uz, content_en,
        excerpt_uz, excerpt_en, category_id, featured_image, youtube_url,
        is_published, is_featured, published_at, views, likes, dislikes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING id, title_uz, slug
    `

    const values = [
      title_uz,
      title_en,
      slug,
      content_uz,
      content_en,
      excerpt_uz || null,
      excerpt_en || null,
      category_id || 1, // Default category
      featured_image || null,
      youtube_url || null,
      Boolean(is_published),
      Boolean(is_featured),
      is_published ? new Date() : null,
      0, // views
      0, // likes
      0, // dislikes
    ]

    console.log("🔄 Executing query with values:", values)
    const result = await pool.query(query, values)
    const newPost = result.rows[0]
    console.log("✅ Post created:", newPost)

    // Teglarni qo'shish
    if (tags && typeof tags === "string" && tags.trim()) {
      console.log("🏷️ Adding tags:", tags)
      const tagNames = tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter(Boolean)

      for (const tagName of tagNames) {
        try {
          // Tag yaratish yoki olish
          let tagResult = await pool.query(
            "INSERT INTO tags (name, name_en) VALUES ($1, $1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id",
            [tagName],
          )

          if (tagResult.rows.length === 0) {
            tagResult = await pool.query("SELECT id FROM tags WHERE name = $1", [tagName])
          }

          if (tagResult.rows.length > 0) {
            const tagId = tagResult.rows[0].id

            // Post-tag bog'lanishini yaratish
            await pool.query(
              "INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2) ON CONFLICT (post_id, tag_id) DO NOTHING",
              [newPost.id, tagId],
            )
          }
        } catch (tagError) {
          console.error(`Tag qo'shishda xatolik (${tagName}):`, tagError)
          // Tag xatoligi butun jarayonni to'xtatmasin
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: newPost,
      message: "Post muvaffaqiyatli yaratildi",
    })
  } catch (error) {
    console.error("❌ Post yaratishda xatolik:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Post yaratishda xatolik yuz berdi",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    console.log(`📖 Fetching posts: page ${page}, limit ${limit}`)

    // Postlarni olish
    const query = `
      SELECT
        p.id, p.title_uz, p.title_en, p.slug, p.excerpt_uz, p.excerpt_en,
        p.featured_image, p.youtube_url, p.is_published, p.is_featured,
        p.views, p.likes, p.dislikes, p.created_at, p.updated_at, p.published_at,
        c.name as category_name,
        c.name_en as category_name_en
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
      LIMIT $1 OFFSET $2
    `

    const result = await pool.query(query, [limit, offset])
    console.log(`✅ Found ${result.rows.length} posts`)

    // Har bir post uchun teglarni olish
    const postsWithTags = await Promise.all(
      result.rows.map(async (post) => {
        try {
          const tagsQuery = `
            SELECT t.id, t.name, t.name_en
            FROM tags t
            JOIN post_tags pt ON t.id = pt.tag_id
            WHERE pt.post_id = $1
          `
          const tagsResult = await pool.query(tagsQuery, [post.id])

          return {
            ...post,
            tags: tagsResult.rows || [],
          }
        } catch (tagError) {
          console.error(`Teglarni olishda xatolik (post ${post.id}):`, tagError)
          return {
            ...post,
            tags: [],
          }
        }
      }),
    )

    // Jami postlar sonini olish
    const countResult = await pool.query("SELECT COUNT(*) FROM posts")
    const totalPosts = Number.parseInt(countResult.rows[0].count)

    return NextResponse.json({
      success: true,
      data: postsWithTags,
      pagination: {
        page,
        limit,
        total: totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
      },
    })
  } catch (error) {
    console.error("❌ Postlarni olishda xatolik:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Postlarni olishda xatolik yuz berdi",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
