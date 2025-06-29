import pool from "./db"
import type { QueryResult } from "pg"

// Types
export interface Post {
  id: number
  title_uz: string
  title_en: string
  slug: string
  content_uz: string
  content_en: string
  excerpt_uz: string
  excerpt_en: string
  category_id: number
  category_name?: string
  category_name_en?: string
  author: string
  featured_image: string
  views: number
  likes: number
  dislikes: number
  is_published: boolean
  is_featured: boolean
  published_at: string
  created_at: string
  updated_at: string
  tags?: Tag[]
  media?: MediaItem[]
  comments_count?: number
}

export interface Category {
  id: number
  name: string
  name_en: string
  description: string
  description_en: string
  color: string
  icon: string
  post_count?: number
}

export interface Tag {
  id: number
  name: string
  name_en: string
}

export interface MediaItem {
  id: number
  post_id: number
  type: "image" | "video" | "pdf" | "audio"
  url: string
  thumbnail?: string
  filename?: string
  original_name?: string
  file_size?: number
  duration?: string
  caption?: string
  caption_en?: string
  description?: string
  description_en?: string
  sort_order: number
}

export interface Comment {
  id: number
  post_id: number
  parent_id?: number
  author_name: string
  author_email?: string
  author_avatar?: string
  content: string
  content_en?: string
  likes: number
  is_approved: boolean
  created_at: string
  replies?: Comment[]
}

// Database functions
export async function getPosts(
  options: {
    limit?: number
    offset?: number
    category?: string
    search?: string
    featured?: boolean
    published?: boolean
  } = {},
): Promise<Post[]> {
  const { limit, offset = 0, category, search, featured, published = true } = options

  let query = `
    SELECT
      p.*,
      c.name as category_name,
      c.name_en as category_name_en,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id AND is_approved = true) as comments_count
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `

  const params: any[] = []
  let paramCount = 0

  if (published !== undefined) {
    paramCount++
    query += ` AND p.is_published = $${paramCount}`
    params.push(published)
  }

  if (featured !== undefined) {
    paramCount++
    query += ` AND p.is_featured = $${paramCount}`
    params.push(featured)
  }

  if (category) {
    paramCount++
    query += ` AND (c.name ILIKE $${paramCount} OR c.name_en ILIKE $${paramCount})`
    params.push(`%${category}%`)
  }

  if (search) {
    paramCount++
    query += ` AND (
      p.title_uz ILIKE $${paramCount} OR
      p.title_en ILIKE $${paramCount} OR
      p.content_uz ILIKE $${paramCount} OR
      p.content_en ILIKE $${paramCount}
    )`
    params.push(`%${search}%`)
  }

  query += ` ORDER BY p.published_at DESC, p.created_at DESC`

  if (limit) {
    paramCount++
    query += ` LIMIT $${paramCount}`
    params.push(limit)
  }

  if (offset > 0) {
    paramCount++
    query += ` OFFSET $${paramCount}`
    params.push(offset)
  }

  try {
    const result: QueryResult = await pool.query(query, params)
    return result.rows
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  }
}

export async function getPostById(id: number): Promise<Post | null> {
  try {
    const query = `
      SELECT
        p.*,
        c.name as category_name,
        c.name_en as category_name_en,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id AND is_approved = true) as comments_count
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1 AND p.is_published = true
    `

    const result: QueryResult = await pool.query(query, [id])

    if (result.rows.length === 0) {
      return null
    }

    const post = result.rows[0]

    // Get tags
    const tagsQuery = `
      SELECT t.id, t.name, t.name_en
      FROM tags t
      JOIN post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = $1
    `
    const tagsResult: QueryResult = await pool.query(tagsQuery, [id])
    post.tags = tagsResult.rows

    // Get media
    const mediaQuery = `
      SELECT * FROM media
      WHERE post_id = $1
      ORDER BY sort_order ASC, created_at ASC
    `
    const mediaResult: QueryResult = await pool.query(mediaQuery, [id])
    post.media = mediaResult.rows

    return post
  } catch (error) {
    console.error("Error fetching post by ID:", error)
    throw error
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const query = `
      SELECT
        p.*,
        c.name as category_name,
        c.name_en as category_name_en,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id AND is_approved = true) as comments_count
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = $1 AND p.is_published = true
    `

    const result: QueryResult = await pool.query(query, [slug])

    if (result.rows.length === 0) {
      return null
    }

    const post = result.rows[0]

    // Get tags
    const tagsQuery = `
      SELECT t.id, t.name, t.name_en
      FROM tags t
      JOIN post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = $1
    `
    const tagsResult: QueryResult = await pool.query(tagsQuery, [post.id])
    post.tags = tagsResult.rows

    // Get media
    const mediaQuery = `
      SELECT * FROM media
      WHERE post_id = $1
      ORDER BY sort_order ASC, created_at ASC
    `
    const mediaResult: QueryResult = await pool.query(mediaQuery, [post.id])
    post.media = mediaResult.rows

    return post
  } catch (error) {
    console.error("Error fetching post by slug:", error)
    throw error
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const query = `
      SELECT
        c.*,
        COUNT(p.id) as post_count
      FROM categories c
      LEFT JOIN posts p ON c.id = p.category_id AND p.is_published = true
      GROUP BY c.id
      ORDER BY c.name
    `

    const result: QueryResult = await pool.query(query)
    return result.rows
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  try {
    const query = `
      SELECT * FROM comments
      WHERE post_id = $1 AND parent_id IS NULL AND is_approved = true
      ORDER BY created_at DESC
    `

    const result: QueryResult = await pool.query(query, [postId])
    const comments = result.rows

    // Get replies for each comment
    for (const comment of comments) {
      const repliesQuery = `
        SELECT * FROM comments
        WHERE parent_id = $1 AND is_approved = true
        ORDER BY created_at ASC
      `
      const repliesResult: QueryResult = await pool.query(repliesQuery, [comment.id])
      comment.replies = repliesResult.rows
    }

    return comments
  } catch (error) {
    console.error("Error fetching comments:", error)
    throw error
  }
}

export async function addComment(commentData: {
  post_id: number
  parent_id?: number
  author_name: string
  author_email?: string
  content: string
  content_en?: string
  ip_address?: string
  user_agent?: string
}): Promise<Comment> {
  try {
    const query = `
      INSERT INTO comments (
        post_id, parent_id, author_name, author_email,
        content, content_en, ip_address, user_agent
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `

    const values = [
      commentData.post_id,
      commentData.parent_id || null,
      commentData.author_name,
      commentData.author_email || null,
      commentData.content,
      commentData.content_en || commentData.content,
      commentData.ip_address || null,
      commentData.user_agent || null,
    ]

    const result: QueryResult = await pool.query(query, values)
    return result.rows[0]
  } catch (error) {
    console.error("Error adding comment:", error)
    throw error
  }
}

export async function updatePostViews(id: number): Promise<void> {
  try {
    const query = `UPDATE posts SET views = views + 1 WHERE id = $1`
    await pool.query(query, [id])
  } catch (error) {
    console.error("Error updating post views:", error)
    throw error
  }
}

export async function updatePostLikes(id: number, type: "like" | "dislike"): Promise<void> {
  try {
    const field = type === "like" ? "likes" : "dislikes"
    const query = `UPDATE posts SET ${field} = ${field} + 1 WHERE id = $1`
    await pool.query(query, [id])
  } catch (error) {
    console.error("Error updating post likes:", error)
    throw error
  }
}

export async function addNewsletterSubscriber(email: string): Promise<void> {
  try {
    const query = `
      INSERT INTO newsletter_subscribers (email)
      VALUES ($1)
      ON CONFLICT (email) DO UPDATE SET
        is_active = true,
        subscribed_at = CURRENT_TIMESTAMP
    `
    await pool.query(query, [email])
  } catch (error) {
    console.error("Error adding newsletter subscriber:", error)
    throw error
  }
}

export async function trackPageView(data: {
  post_id: number
  ip_address?: string
  user_agent?: string
  referrer?: string
}): Promise<void> {
  try {
    const query = `
      INSERT INTO page_views (post_id, ip_address, user_agent, referrer)
      VALUES ($1, $2, $3, $4)
    `

    const values = [data.post_id, data.ip_address || null, data.user_agent || null, data.referrer || null]

    await pool.query(query, values)
  } catch (error) {
    console.error("Error tracking page view:", error)
    throw error
  }
}
export async function likeComment(commentId: number): Promise<number> {
  try {
    const query = `
      UPDATE comments
      SET likes = likes + 1
      WHERE id = $1
      RETURNING likes
    `;

    const result: QueryResult = await pool.query(query, [commentId]);

    if (result.rowCount === 0) {
      throw new Error("Comment not found");
    }

    return result.rows[0].likes;
  } catch (error) {
    console.error("Error updating comment likes:", error);
    throw error;
  }
}