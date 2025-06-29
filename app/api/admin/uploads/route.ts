import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { mkdirSync, existsSync } from "fs"
import { nanoid } from "nanoid"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file: File | null = formData.get("file") as unknown as File

    if (!file) {
      return NextResponse.json({ success: false, error: "Fayl topilmadi" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const uploadsDir = path.join(process.cwd(), "public", "uploads")

    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true })
    }

    const safeName = `${nanoid()}_${file.name.replace(/\s+/g, "_")}`
    const filePath = path.join(uploadsDir, safeName)

    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: `/uploads/${safeName}`,
    })
  } catch (error) {
    console.error("Upload Error:", error)
    return NextResponse.json({ success: false, error: "Fayl yuklashda xato" }, { status: 500 })
  }
}
