import { NextRequest } from "next/server"
import { proxyGetRequest, validatePagination } from "@/lib/api-proxy"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const pageParam = searchParams.get("page")
  const pageSizeParam = searchParams.get("page_size")

  const { page, pageSize } = validatePagination(pageParam, pageSizeParam)

  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  })

  return proxyGetRequest("/public/news", params)
}

