import { NextRequest, NextResponse } from "next/server"
import { proxyGetRequest } from "@/lib/api-proxy"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
    return NextResponse.json(
      { error: "Invalid slug parameter" },
      { status: 400 }
    )
  }

  // Sanitize slug to prevent path traversal
  const sanitizedSlug = slug.trim().replace(/[^a-zA-Z0-9\s-]/g, "")

  return proxyGetRequest(`/public/news/${encodeURIComponent(sanitizedSlug)}`)
}

