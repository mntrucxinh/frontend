"use client"

import { useEffect } from "react"
import { subscribePushIfNeeded } from "@/utils/pwa-push"

export default function PushSubscriptionManager() {
  useEffect(() => {
    subscribePushIfNeeded().catch((err) => {
      console.error("Push subscription failed:", err)
    })
  }, [])

  return null
}
