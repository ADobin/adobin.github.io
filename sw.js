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
    "url": "webpack-runtime-a88f8a38d41f4a5b2f6e.js"
  },
  {
    "url": "app-20e8b9d93e95c8aaae30.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-c9c937b9491619a6493b.js"
  },
  {
    "url": "index.html",
    "revision": "df056cc58a1ee32641944fcfcaef21ac"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "b42f6eb195afb33766e9c328d85714b2"
  },
  {
    "url": "0.a641184d1f7d4340507c.css"
  },
  {
    "url": "0-7f80e71e262abbff3b24.js"
  },
  {
    "url": "component---src-pages-index-js-a9dfc44afd3d2ecfce68.js"
  },
  {
    "url": "static/d/659/path---index-6a9-rqFM80Y3LJLD9fYzq0Ze52lYc.json",
    "revision": "0ca615b647b369539e211d97a8302606"
  },
  {
    "url": "component---src-pages-404-js-a07649909aa7467ba926.js"
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
