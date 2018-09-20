/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.5.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.5.0"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-1e98cb3c49a832423ee0.js"
  },
  {
    "url": "app-3771847739ca9baf121c.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-8b39cf320710777c95f1.js"
  },
  {
    "url": "index.html",
    "revision": "bcc77490df5d560cbb32a3aa63444785"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "2d642d87ae5bba2a50a73930d9e63a00"
  },
  {
    "url": "0.26a97cedfcc84244a777.css"
  },
  {
    "url": "0-b04fed6442fb3585262e.js"
  },
  {
    "url": "component---src-pages-index-js-189b768df6187f0dcfa7.js"
  },
  {
    "url": "static/d/73/path---index-6a9-mqbASXoqU2rgoDLxHFR5xHqlouc.json",
    "revision": "f04591e938c9d0c4eeed35c0e8025674"
  },
  {
    "url": "component---src-pages-404-js-d19c26d7bcf68cba1e45.js"
  },
  {
    "url": "static/d/164/path---404-html-516-62a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "a0bbd6be7f67a9983b6a5f84861b2dfe"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
