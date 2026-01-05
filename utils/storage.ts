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

export const clearTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken")
  }
  Cookies.remove("accessToken", { path: "/" })
}
