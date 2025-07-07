import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { nanoid } from "nanoid";

// Cloudinary konfiguratsiyasi
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file: File | null = formData.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "Fayl topilmadi" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    const publicId = nanoid();

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "uploads",
      public_id: publicId,
    });

    // Frontendga siz kutgan formatda qaytariladi
    return NextResponse.json({
      success: true,
      url: result.secure_url, // Bu https://res.cloudinary.com/... bo'ladi
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, error: "Fayl yuklashda xato" }, { status: 500 });
  }
}
