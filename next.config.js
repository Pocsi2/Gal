/** @type {import('next').NextConfig} */
const owner = process.env.GITHUB_REPOSITORY_OWNER || '';
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
const userSite = owner && repository.toLowerCase() === `${owner}.github.io`.toLowerCase();
const inferredBasePath = repository && !userSite ? `/${repository}` : '';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath;

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  turbopack: { root: __dirname },
};

module.exports = nextConfig;


