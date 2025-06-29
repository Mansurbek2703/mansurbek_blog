import { type NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ success: false, error: "Invalid post ID" }, { status: 400 })
    }

    // Asosiy post ma'lumotlarini olish
    const query = `
      SELECT
        p.*,
        c.name as category_name,
        c.name_en as category_name_en
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
    `

    const result = await pool.query(query, [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
    }

    const post = result.rows[0]

    // Teglarni alohida olish
    try {
      const tagsQuery = `
        SELECT t.id, t.name, t.name_en
        FROM tags t
        JOIN post_tags pt ON t.id = pt.tag_id
        WHERE pt.post_id = $1
      `
      const tagsResult = await pool.query(tagsQuery, [id])
      post.tags = tagsResult.rows || []
    } catch (tagError) {
      console.error(`Error fetching tags for post ${id}:`, tagError)
      post.tags = []
    }

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch post",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
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
      youtube_url, // YouTube URL qo'shildi
      tags,
      is_published,
      is_featured,
    } = body

    // Update post with YouTube URL
    const query = `
      UPDATE posts SET
        title_uz = $1, title_en = $2, slug = $3, content_uz = $4, content_en = $5,
        excerpt_uz = $6, excerpt_en = $7, category_id = $8, featured_image = $9,
        youtube_url = $10, is_published = $11, is_featured = $12, updated_at = CURRENT_TIMESTAMP,
        published_at = CASE WHEN $11 = true AND published_at IS NULL THEN CURRENT_TIMESTAMP ELSE published_at END
      WHERE id = $13
    `

    const values = [
      title_uz,
      title_en,
      slug,
      content_uz,
      content_en,
      excerpt_uz,
      excerpt_en,
      category_id,
      featured_image,
      youtube_url || null, // YouTube URL (null bo'lishi mumkin)
      is_published,
      is_featured,
      id,
    ]

    await pool.query(query, values)

    // Update tags
    if (tags !== undefined) {
      // Delete existing tags
      await pool.query("DELETE FROM post_tags WHERE post_id = $1", [id])

      // Add new tags
      if (tags && tags.trim()) {
        const tagNames = tags.split(",").map((tag: string) => tag.trim())

        for (const tagName of tagNames) {
          // Insert tag if not exists
          const tagQuery = `
            INSERT INTO tags (name, name_en) 
            VALUES ($1, $1) 
            ON CONFLICT (name) DO NOTHING
            RETURNING id
          `
          let tagResult = await pool.query(tagQuery, [tagName])

          if (tagResult.rows.length === 0) {
            const getTagQuery = `SELECT id FROM tags WHERE name = $1`
            tagResult = await pool.query(getTagQuery, [tagName])
          }

          const tagId = tagResult.rows[0].id

          // Link post with tag
          const postTagQuery = `
            INSERT INTO post_tags (post_id, tag_id) 
            VALUES ($1, $2) 
            ON CONFLICT (post_id, tag_id) DO NOTHING
          `
          await pool.query(postTagQuery, [id, tagId])
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Post muvaffaqiyatli yangilandi",
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    const query = `DELETE FROM posts WHERE id = $1`
    await pool.query(query, [id])

    return NextResponse.json({
      success: true,
      message: "Post muvaffaqiyatli o'chirildi",
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 })
  }
}
