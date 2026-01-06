import { api } from "@/lib/axios"
import { NewsListResponse, NewsDetailResponse } from "@/types/news"
import { AxiosError } from "axios"

export class NewsServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message)
    this.name = "NewsServiceError"
  }
}

const normalizeError = (error: unknown): NewsServiceError => {
  if (error instanceof NewsServiceError) return error

  if (error instanceof AxiosError) {
    const status = error.response?.status
    const message =
      (error.response?.data as any)?.message ||
      (error.response?.data as any)?.error ||
      error.message ||
      "Failed to fetch data"
    return new NewsServiceError(message, status, error)
  }

  return new NewsServiceError("Network error occurred", 0, error)
}

const getNewsList = async (
  page: number = 1,
  pageSize: number = 20
): Promise<NewsListResponse> => {
  try {
    const res = await api.get<NewsListResponse>("/public/news", {
      params: {
        page,
        page_size: pageSize,
      },
    })
    return res.data
  } catch (error) {
    throw normalizeError(error)
  }
}

const getNewsDetail = async (slug: string): Promise<NewsDetailResponse> => {
  if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
    throw new NewsServiceError("Invalid slug parameter", 400)
  }

  try {
    const res = await api.get<NewsDetailResponse>(`/public/news/${encodeURIComponent(slug)}`)
    return res.data
  } catch (error) {
    throw normalizeError(error)
  }
}

export default {
  getNewsList,
  getNewsDetail,
}

