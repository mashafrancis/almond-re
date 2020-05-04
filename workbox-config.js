module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{woff,html,json,xml,ico,png,js,svg,txt,css}",
  ],
  "mode": "production",
  "swDest": "dist/service-worker.js",
  "swSrc": "public/service-worker.js"
};
