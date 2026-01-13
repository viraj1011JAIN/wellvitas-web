/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment for static export (Fasthosts deployment)
  // GitHub Actions will enable this automatically
  // Note: Static export disables API routes and server-side features
  // output: 'export',

  // Storyblok Image Optimization (works with static export)
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.js',
    // Fallback for non-Storyblok images
    unoptimized: false,
  },

  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
