/** @type {import('next').NextConfig} */

const urlPrefix = process.env.URL_PREFIX ? "/" + process.env.URL_PREFIX : "";

const nextConfig = {
  reactStrictMode: false,
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  publicRuntimeConfig: {
    urlPrefix,
  },
};

module.exports = nextConfig;
