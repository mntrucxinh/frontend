"use client"

import Cookies from "js-cookie"

export const getAccessToken = () => {
  if (typeof document === "undefined") return undefined
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
  if (typeof document === "undefined") return undefined
  const cookieToken = Cookies.get("refreshToken")
  if (cookieToken) return cookieToken

  if (typeof window !== "undefined") {
    const localToken = localStorage.getItem("refreshToken")
    if (localToken) return localToken
  }

  return undefined
}

export const setAccessToken = (token: string) => {
  if (typeof document === "undefined") return
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
  if (typeof document === "undefined") return
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
  if (typeof document !== "undefined") {
    Cookies.remove("accessToken", { path: "/" })
    Cookies.remove("refreshToken", { path: "/" })
  }
}
