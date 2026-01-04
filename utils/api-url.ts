/**
 * Get the API base URL from environment variable
 * @returns The API base URL, defaults to http://localhost:8000 if not set
 */
export function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
}

/**
 * Get the backend URL for server-side API calls
 * @returns The backend URL
 */
export function getBackendUrl(): string {
  return getApiUrl()
}

/**
 * Build full URL for an asset path
 * If the path is already a full URL (starts with http), return it as is
 * Otherwise, prepend the API base URL
 * @param path - The asset path (can be relative or absolute)
 * @returns The full URL
 */
export function buildAssetUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const apiUrl = getApiUrl()
  // Remove trailing slash from apiUrl and leading slash from path to avoid double slashes
  const cleanApiUrl = apiUrl.replace(/\/$/, '')
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${cleanApiUrl}${cleanPath}`
}

