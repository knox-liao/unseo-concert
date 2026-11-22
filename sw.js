// 仁川演唱會慢旅 Service Worker
// 每次更新任何檔案後，請把下面版本號 +1（例如 v3 → v4），手機才會抓到新版。
const CACHE_NAME = "incheon-trip-v3";
const CORE = ["./", "./index.html", "./style.css", "./data.js", "./app.js"];
const OPTIONAL = ["./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
const TIMEOUT = 4000;

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE.map(u => new Request(u, { cache: "reload" })));
    // 圖示等次要檔案失敗不影響安裝
    await Promise.all(OPTIONAL.map(u => cache.add(new Request(u, { cache: "reload" })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// 網路優先（逾時 4 秒改用快取）；僅處理同網域 GET，匯率 API、Google Fonts 等交給瀏覽器
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const net = await Promise.race([
        fetch(req, { cache: "no-cache" }),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), TIMEOUT))
      ]);
      if (net && net.status === 200) cache.put(req, net.clone()).catch(() => {});
      return net;
    } catch (e) {
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === "navigate") {
        const page = (await cache.match("./index.html")) || (await cache.match("./"));
        if (page) return page;
      }
      return new Response("離線中，且尚無快取", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }
  })());
});
