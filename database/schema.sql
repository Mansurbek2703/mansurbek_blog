-- PostgreSQL Database Schema for Mansurbek Blog

-- Create database (run this separately)
-- CREATE DATABASE mansurbek_blog;

-- Use the database
-- \c mansurbek_blog;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    description TEXT,
    description_en TEXT,
    color VARCHAR(50) DEFAULT 'bg-blue-500',
    icon VARCHAR(50) DEFAULT 'BookOpen',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title_uz VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content_uz TEXT NOT NULL,
    content_en TEXT NOT NULL,
    excerpt_uz TEXT,
    excerpt_en TEXT,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    author VARCHAR(100) DEFAULT 'Mansurbek Qazaqov',
    featured_image VARCHAR(500),
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    name_en VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(post_id, tag_id)
);

-- Media table for post attachments
CREATE TABLE IF NOT EXISTS media (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('image', 'video', 'pdf', 'audio')),
    url VARCHAR(500) NOT NULL,
    thumbnail VARCHAR(500),
    filename VARCHAR(255),
    original_name VARCHAR(255),
    file_size INTEGER,
    duration VARCHAR(20), -- for video/audio
    caption TEXT,
    caption_en TEXT,
    description TEXT,
    description_en TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255),
    author_avatar VARCHAR(500),
    content TEXT NOT NULL,
    content_en TEXT,
    likes INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT true,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stickers/Reactions table
CREATE TABLE IF NOT EXISTS stickers (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    emoji VARCHAR(10) NOT NULL,
    count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP
);

-- Page views tracking
CREATE TABLE IF NOT EXISTS page_views (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    referrer VARCHAR(500),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    avatar VARCHAR(500),
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ✅ Drop indexes if they exist (xatoliklarni oldini olish)
DROP INDEX IF EXISTS idx_posts_published;
DROP INDEX IF EXISTS idx_posts_category;
DROP INDEX IF EXISTS idx_posts_slug;
DROP INDEX IF EXISTS idx_comments_post;
DROP INDEX IF EXISTS idx_comments_approved;
DROP INDEX IF EXISTS idx_media_post;
DROP INDEX IF EXISTS idx_page_views_post;
DROP INDEX IF EXISTS idx_page_views_date;

-- ✅ Create indexes
CREATE INDEX idx_posts_published ON posts(is_published, published_at DESC);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_comments_post ON comments(post_id, created_at DESC);
CREATE INDEX idx_comments_approved ON comments(is_approved);
CREATE INDEX idx_media_post ON media(post_id, sort_order);
CREATE INDEX idx_page_views_post ON page_views(post_id);
CREATE INDEX idx_page_views_date ON page_views(viewed_at);

-- ✅ Create function to update updated_at timestamp (no change needed)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ✅ Drop triggers if they exist to avoid duplicates
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;

-- ✅ Create triggers
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
