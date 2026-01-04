import { NextResponse } from "next/server"
import { getBackendUrl } from "@/utils/api-url"

const DEFAULT_TIMEOUT = 10000 // 10 seconds
const MAX_PAGE_SIZE = 100
const MIN_PAGE = 1
const MAX_PAGE = 1000

export interface ProxyOptions {
  timeout?: number
  headers?: Record<string, string>
}

/**
 * Validates and normalizes pagination parameters
 */
export function validatePagination(
  page: string | null,
  pageSize: string | null
): { page: number; pageSize: number } {
  const parsedPage = Math.max(MIN_PAGE, Math.min(MAX_PAGE, parseInt(page || "1", 10) || 1))
  const parsedPageSize = Math.max(
    1,
    Math.min(MAX_PAGE_SIZE, parseInt(pageSize || "20", 10) || 20)
  )

  return {
    page: parsedPage,
    pageSize: parsedPageSize,
  }
}

/**
 * Creates a fetch request with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout")
    }
    throw error
  }
}

/**
 * Proxies a GET request to the backend API
 */
export async function proxyGetRequest(
  endpoint: string,
  searchParams?: URLSearchParams,
  options: ProxyOptions = {}
): Promise<NextResponse> {
  try {
    const backendUrl = getBackendUrl()
    const url = new URL(`${backendUrl}${endpoint}`)

    if (searchParams) {
      searchParams.forEach((value, key) => {
        url.searchParams.set(key, value)
      })
    }

    const response = await fetchWithTimeout(url.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
        ...options.headers,
      },
      cache: "no-store",
      timeout: options.timeout || DEFAULT_TIMEOUT,
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      
      // Log error details for debugging (server-side only)
      console.error(`Backend API error [${response.status}]:`, {
        endpoint,
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      })

      return NextResponse.json(
        {
          error: response.status === 404 
            ? "Resource not found" 
            : response.status >= 500
            ? "Internal server error"
            : "Failed to fetch data",
          status: response.status,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    // Log full error for debugging (server-side only)
    console.error(`Proxy error for ${endpoint}:`, {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    // Don't expose internal error details to client
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error && error.message === "Request timeout"
          ? "Request timeout"
          : "An error occurred while processing your request",
      },
      { status: 500 }
    )
  }
}

