import { api } from "@/lib/axios"

// Utility: convert base64 VAPID public key to Uint8Array
const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const rawData = typeof window !== "undefined" ? window.atob(base64) : ""
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const subscribePushIfNeeded = async () => {
  if (typeof window === "undefined") return
  if (!("Notification" in window) || !("serviceWorker" in navigator)) return
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  if (!vapidPublicKey) return

  const permission = await Notification.requestPermission()
  if (permission !== "granted") return

  const registration = await navigator.serviceWorker.ready

  const existing = await registration.pushManager.getSubscription()
  const subscription =
    existing ||
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    }))

  if (!subscription) return

  const payload = subscription.toJSON()
  await api.post("/public/push-subscriptions", {
    endpoint: payload.endpoint,
    keys: payload.keys,
    expirationTime: payload.expirationTime,
  })
}
