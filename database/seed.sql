-- Seed data for Mansurbek Blog

-- Insert categories
INSERT INTO categories (name, name_en, description, description_en, color, icon) VALUES
('Ta''lim', 'Education', 'IT, dasturlash va texnologiya bo''yicha maqolalar', 'Articles about IT, programming and technology', 'bg-blue-500', 'BookOpen'),
('Sayohatlar', 'Travel', 'Sayohat tajribalari va go''zal joylar haqida', 'Travel experiences and beautiful places', 'bg-green-500', 'MapPin'),
('Shaxsiy', 'Personal', 'Shaxsiy rivojlanish va hayot tajribalari', 'Personal development and life experiences', 'bg-purple-500', 'User'),
('Do''stlar', 'Friends', 'Do''stlik va munosabatlar haqida fikrlar', 'Thoughts about friendship and relationships', 'bg-orange-500', 'Users');

-- Insert tags
INSERT INTO tags (name, name_en) VALUES
('IT', 'IT'),
('Karyera', 'Career'),
('Texnologiya', 'Technology'),
('React', 'React'),
('Next.js', 'Next.js'),
('Sayohat', 'Travel'),
('Samarqand', 'Samarkand'),
('Tarix', 'History'),
('Toshkent', 'Tashkent'),
('Rivojlanish', 'Development'),
('Maqsad', 'Goals'),
('Motivatsiya', 'Motivation'),
('Do''stlik', 'Friendship'),
('Munosabatlar', 'Relationships'),
('Hayot', 'Life');

-- Insert sample posts
INSERT INTO posts (
    title_uz, title_en, slug, content_uz, content_en,
    excerpt_uz, excerpt_en, category_id, featured_image,
    is_published, is_featured, published_at
) VALUES
(
    'IT sohasida karyera qurish yo''llari',
    'Career paths in IT industry',
    'it-sohasida-karyera-qurish-yollari',
    '<p>Zamonaviy dunyoda IT soha eng tez rivojlanayotgan va istiqbolli yo''nalishlardan biri hisoblanadi. Bu sohada muvaffaqiyatli karyera qurish uchun bir qator muhim qadamlarni bosish kerak.</p>

<h2>1. Asosiy ko''nikmalarni egallash</h2>
<p>IT sohasida ishlash uchun avvalo texnik ko''nikmalarni egallash zarur. Bu dasturlash tillari, ma''lumotlar bazasi bilan ishlash, tizim administratsiyasi va boshqa ko''nikmalarni o''z ichiga oladi.</p>

<h2>2. Doimiy o''rganish</h2>
<p>Texnologiyalar tez o''zgarib turadi, shuning uchun doimiy o''rganish va yangi bilimlarni egallash muhim ahamiyatga ega.</p>

<h2>3. Amaliy tajriba to''plash</h2>
<p>Nazariy bilimlarni amaliyotda qo''llash orqali haqiqiy tajriba to''plash kerak. Bu loyihalar ustida ishlash, ochiq kodli loyihalarga hissa qo''shish orqali amalga oshiriladi.</p>',
    '<p>In the modern world, the IT field is considered one of the fastest growing and most promising areas. To build a successful career in this field, you need to take a number of important steps.</p>

<h2>1. Master basic skills</h2>
<p>To work in the IT field, you first need to master technical skills. This includes programming languages, database management, system administration and other skills.</p>

<h2>2. Continuous learning</h2>
<p>Technologies change rapidly, so continuous learning and acquiring new knowledge is of great importance.</p>

<h2>3. Gain practical experience</h2>
<p>You need to gain real experience by applying theoretical knowledge in practice. This is done by working on projects and contributing to open source projects.</p>',
    'Zamonaviy IT sohasida muvaffaqiyatli karyera qurish uchun zarur bo''lgan ko''nikmalar va strategiyalar haqida batafsil ma''lumot.',
    'Detailed information about essential skills and strategies for building a successful career in modern IT industry.',
    1,
    '/placeholder.svg?height=600&width=1200',
    true,
    true,
    CURRENT_TIMESTAMP
),
(
    'Samarqand sayohati: Tarixiy joylar',
    'Samarkand journey: Historical places',
    'samarqand-sayohati-tarixiy-joylar',
    '<p>Samarqand - O''zbekistonning eng go''zal va tarixiy shaharlaridan biri. Bu yerda ko''plab ajoyib me''moriy yodgorliklar va tarixiy joylar mavjud.</p>

<h2>Registon maydoni</h2>
<p>Samarqandning markaziy maydoni bo''lib, uch tarafdan ajoyib madrasalar bilan o''ralgan.</p>

<h2>Bibi Xonim masjidi</h2>
<p>XV asrda qurilgan bu masjid o''sha davrning eng katta masjidlaridan biri edi.</p>

<h2>Shohizinda maqbarasi</h2>
<p>Bu yerda ko''plab tarixiy shaxslar dafn etilgan va ajoyib me''moriy bezaklar mavjud.</p>',
    '<p>Samarkand is one of the most beautiful and historical cities of Uzbekistan. There are many wonderful architectural monuments and historical places here.</p>

<h2>Registan Square</h2>
<p>The central square of Samarkand, surrounded on three sides by magnificent madrasas.</p>

<h2>Bibi Khanum Mosque</h2>
<p>Built in the 15th century, this mosque was one of the largest mosques of that era.</p>

<h2>Shah-i-Zinda Mausoleum</h2>
<p>Many historical figures are buried here and there are wonderful architectural decorations.</p>',
    'Samarqandning eng go''zal va tarixiy joylarini kashf etish, mahalliy madaniyat va an''analar bilan tanishish.',
    'Discovering the most beautiful and historical places of Samarkand, getting acquainted with local culture and traditions.',
    2,
    '/placeholder.svg?height=600&width=1200',
    true,
    false,
    CURRENT_TIMESTAMP - INTERVAL '5 days'
),
(
    'Shaxsiy rivojlanish: Maqsadlarga erishish',
    'Personal development: Achieving goals',
    'shaxsiy-rivojlanish-maqsadlarga-erishish',
    '<p>Hayotda muvaffaqiyatga erishish uchun shaxsiy rivojlanish juda muhim. Bu jarayon doimiy o''z-o''zini takomillashtirish va yangi ko''nikmalar egallashni o''z ichiga oladi.</p>

<h2>Maqsad qo''yish</h2>
<p>Aniq va erishish mumkin bo''lgan maqsadlar qo''yish muvaffaqiyatning kaliti hisoblanadi.</p>

<h2>Vaqtni boshqarish</h2>
<p>Vaqtni samarali boshqarish orqali ko''proq narsaga erishish mumkin.</p>

<h2>Doimiy o''rganish</h2>
<p>Yangi bilim va ko''nikmalar egallash shaxsiy rivojlanishning asosiy qismidir.</p>',
    '<p>Personal development is very important for achieving success in life. This process includes continuous self-improvement and acquiring new skills.</p>

<h2>Goal setting</h2>
<p>Setting clear and achievable goals is the key to success.</p>

<h2>Time management</h2>
<p>Effective time management allows you to achieve more.</p>

<h2>Continuous learning</h2>
<p>Acquiring new knowledge and skills is a fundamental part of personal development.</p>',
    'Hayotda muvaffaqiyatga erishish uchun shaxsiy rivojlanish yo''llari va amaliy maslahatlar.',
    'Personal development paths and practical advice for achieving success in life.',
    3,
    '/placeholder.svg?height=600&width=1200',
    true,
    false,
    CURRENT_TIMESTAMP - INTERVAL '10 days'
);

-- Link posts with tags
INSERT INTO post_tags (post_id, tag_id) VALUES
(1, 1), (1, 2), (1, 3), -- IT, Karyera, Texnologiya
(2, 6), (2, 7), (2, 8), -- Sayohat, Samarqand, Tarix
(3, 10), (3, 11), (3, 12); -- Rivojlanish, Maqsad, Motivatsiya

-- Insert sample media
INSERT INTO media (post_id, type, url, caption, caption_en, description, description_en) VALUES
(1, 'image', '/placeholder.svg?height=400&width=600', 'IT sohasida karyera yo''llari infografika', 'IT career paths infographic', 'IT sohasida turli karyera yo''llari ko''rsatilgan infografika', 'Infographic showing various career paths in IT'),
(1, 'pdf', '/sample.pdf', 'IT karyera qo''llanmasi', 'IT career guide', 'IT sohasida karyera qurish bo''yicha to''liq qo''llanma', 'Complete guide to building a career in IT'),
(2, 'image', '/placeholder.svg?height=400&width=600', 'Registon maydoni', 'Registan Square', 'Samarqandning mashhur Registon maydoni', 'Famous Registan Square of Samarkand');

-- Insert sample comments
INSERT INTO comments (post_id, author_name, author_email, content, content_en, likes) VALUES
(1, 'Aziz Karimov', 'aziz@example.com', 'Juda foydali maqola! IT sohasiga kirishni rejalashtirgan yoshlar uchun ajoyib maslahatlar.', 'Very useful article! Great advice for young people planning to enter the IT field.', 12),
(1, 'Malika Tosheva', 'malika@example.com', 'Men ham IT sohasida ishlayapman. Sizning tajribangiz juda qimmatli!', 'I also work in the IT field. Your experience is very valuable!', 8),
(2, 'Bobur Aliyev', 'bobur@example.com', 'Samarqand haqiqatan ham ajoyib shahar. Men ham u yerga borib kelganman.', 'Samarkand is truly an amazing city. I have also been there.', 5);

-- Insert reply to first comment
INSERT INTO comments (post_id, parent_id, author_name, author_email, content, content_en, likes) VALUES
(1, 1, 'Mansurbek Qazaqov', 'mansurbekqazaqov27@gmail.com', 'Rahmat! Yana qanday mavzularda maqola yozishimni istaysiz?', 'Thank you! What other topics would you like me to write articles about?', 5);

-- Insert stickers
INSERT INTO stickers (post_id, type, emoji, count) VALUES
(1, 'like', '👍', 45),
(1, 'love', '❤️', 23),
(1, 'fire', '🔥', 18),
(1, 'idea', '💡', 12),
(2, 'like', '👍', 32),
(2, 'love', '❤️', 15),
(3, 'like', '👍', 28),
(3, 'thinking', '🤔', 8);

-- Insert admin user (password: admin123 - hashed with bcrypt)
INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES
('admin', 'mansurbekqazaqov27@gmail.com', '$2b$10$ebOzhmr1FcILavJfz/bCs.phHk4xNvr0aXZD/XctUqHrtt4iW7HDy', 'Mansurbek Qazaqov', 'admin');

-- Update post view counts
UPDATE posts SET views = 12 WHERE id = 1;
UPDATE posts SET views = 8 WHERE id = 2;
UPDATE posts SET views = 11 WHERE id = 3;

-- Update post like counts
UPDATE posts SET likes = 8, dislikes = 3 WHERE id = 1;
UPDATE posts SET likes = 6, dislikes = 2 WHERE id = 2;
UPDATE posts SET likes = 9, dislikes = 1 WHERE id = 3;
