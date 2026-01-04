export const normalizeRoutes = (
  routes: Record<string, unknown> | (string | Record<string, unknown>)[]
): string[] => {
  if (Array.isArray(routes)) {
    // If an array is passed, filter only string values (or handle nested objects if needed)
    let extractedRoutes: string[] = []
    routes.forEach((route) => {
      if (typeof route === 'string') {
        extractedRoutes.push(route)
      } else if (typeof route === 'object') {
        extractedRoutes = extractedRoutes.concat(normalizeRoutes(route))
      }
    })
    return extractedRoutes
  }

  let extractedRoutes: string[] = []
  Object.keys(routes).forEach((key) => {
    const value = routes[key]
    if (typeof value === 'string') {
      extractedRoutes.push(value)
    } else if (typeof value === 'object' && value !== null) {
      extractedRoutes = extractedRoutes.concat(normalizeRoutes(value as Record<string, unknown>))
    }
  })
  return extractedRoutes
}

export const normalizePath = (path: string) => {
  if (path === '/') return path
  return path.startsWith('/') ? path : `/${path}`
}
