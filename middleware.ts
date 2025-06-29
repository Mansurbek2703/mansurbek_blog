// middleware.ts
import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Faqat /admin va pastki yo‘llar uchun
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin-token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      // Tokenni tekshirish
      await jwtVerify(token, new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "secret-key"))
      return NextResponse.next()
    } catch (err) {
      // Noto‘g‘ri token bo‘lsa cookie’ni o‘chirib, login sahifasiga yo‘naltirish
      const response = NextResponse.redirect(new URL("/admin/login", request.url))
      response.cookies.delete("admin-token")
      return response
    }
  }

  return NextResponse.next()
}

// Bu middleware faqat /admin uchun ishlaydi
export const config = {
  matcher: ["/admin/:path*"],
}
