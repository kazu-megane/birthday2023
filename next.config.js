/** @type {import('next').NextConfig} */

const branchName = process.env.BRANCH_NAME ? "/" + process.env.BRANCH_NAME : "";

const nextConfig = {
  reactStrictMode: false,
  assetPrefix: "https://kazu-megane.github.io/birthday2023/",
  basePath: branchName,
};

module.exports = nextConfig;
