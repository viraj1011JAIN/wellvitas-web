/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment for static export (Fasthosts deployment)
  // GitHub Actions will enable this automatically
  // Note: Static export disables API routes and server-side features
  // output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
