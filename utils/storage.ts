"use client"

import Cookies from "js-cookie"

export const getAccessToken = () => {
  // Try cookie first, then localStorage as fallback
  const cookieToken = Cookies.get("accessToken")
  if (cookieToken) return cookieToken

  // Fallback to localStorage
  if (typeof window !== "undefined") {
    const localToken = localStorage.getItem("accessToken")
    if (localToken) return localToken
  }

  return undefined
}

export const getRefreshToken = () => {
  const cookieToken = Cookies.get("refreshToken")
  if (cookieToken) return cookieToken

  if (typeof window !== "undefined") {
    const localToken = localStorage.getItem("refreshToken")
    if (localToken) return localToken
  }

  return undefined
}

export const setAccessToken = (token: string) => {
  // Set in both cookie and localStorage for better compatibility
  Cookies.set("accessToken", token, {
    expires: 7,
    path: "/",
    sameSite: "lax",
  })
  
  // Also store in localStorage as backup
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token)
  }
}

export const setRefreshToken = (token: string) => {
  Cookies.set("refreshToken", token, {
    expires: 30,
    path: "/",
    sameSite: "lax",
  })

  if (typeof window !== "undefined") {
    localStorage.setItem("refreshToken", token)
  }
}

export const clearTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }
  Cookies.remove("accessToken", { path: "/" })
  Cookies.remove("refreshToken", { path: "/" })
}
