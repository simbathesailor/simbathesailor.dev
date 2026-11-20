// The old Gatsby site installed a service worker (gatsby-plugin-offline) that
// keeps serving the cached old site. This replacement clears those caches,
// unregisters itself and reloads open tabs so they get the current site.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const tabs = await self.clients.matchAll({ type: "window" });
      tabs.forEach((tab) => tab.navigate(tab.url));
    })(),
  );
});
