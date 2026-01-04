import { NewsListResponse, NewsDetailResponse } from "@/types/news"

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

const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = "Failed to fetch data"
    let errorData: any = null

    try {
      errorData = await response.json()
      errorMessage = errorData.error || errorData.message || errorMessage
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage
    }

    throw new NewsServiceError(errorMessage, response.status, errorData)
  }

  return response.json()
}

const getNewsList = async (
  page: number = 1,
  pageSize: number = 20
): Promise<NewsListResponse> => {
  try {
    const res = await fetch(
      `/api/news?page=${page}&page_size=${pageSize}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        // Add timeout for client-side requests
        signal: AbortSignal.timeout(10000),
      }
    )

    return handleApiResponse<NewsListResponse>(res)
  } catch (error) {
    if (error instanceof NewsServiceError) {
      throw error
    }
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new NewsServiceError("Request timeout", 408, error)
    }
    throw new NewsServiceError(
      "Network error occurred",
      0,
      error
    )
  }
}

const getNewsDetail = async (slug: string): Promise<NewsDetailResponse> => {
  if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
    throw new NewsServiceError("Invalid slug parameter", 400)
  }

  try {
    const res = await fetch(`/api/news/${encodeURIComponent(slug)}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      signal: AbortSignal.timeout(10000),
    })

    return handleApiResponse<NewsDetailResponse>(res)
  } catch (error) {
    if (error instanceof NewsServiceError) {
      throw error
    }
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new NewsServiceError("Request timeout", 408, error)
    }
    throw new NewsServiceError(
      "Network error occurred",
      0,
      error
    )
  }
}

export default {
  getNewsList,
  getNewsDetail,
}

