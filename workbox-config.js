module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.css",
    "public/index.html",
    "public/offline.html",
    "public/404.html",
    "public/images/offline.png",
  ],
  "swSrc": "public/service-worker.js",
  "swDest": "dist/service-worker.js",
  "globIgnores": [
    "./workbox-config.js"
  ]
};
