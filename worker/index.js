self.addEventListener("push", (event) => {
  if (!event || !event.data) {
    return
  }

  let payload = {}
  try {
    payload = event.data.json()
  } catch (error) {
    try {
      payload = JSON.parse(event.data.text())
    } catch (innerError) {
      payload = { body: event.data.text() }
    }
  }

  const title = payload.title || "Truc Xinh Preschool"
  const options = {
    body: payload.body || "You have a new notification.",
    icon: payload.icon || "/icon-192.png",
    badge: payload.badge || "/icon-192.png",
    tag: payload.tag,
    data: {
      url: payload.url || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  const targetUrl = event.notification?.data?.url || "/"

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus()
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl)
        }
        return undefined
      })
  )
})
