/**
 * Storyblok Image Loader
 * 
 * Optimizes images using Storyblok's built-in image service.
 * Works with static export (no server needed).
 * 
 * Features:
 * - Automatic WebP conversion
 * - Responsive sizing
 * - Quality optimization
 * - CDN delivery
 * 
 * Usage:
 * <Image 
 *   src="https://a.storyblok.com/f/123/image.jpg" 
 *   width={800} 
 *   height={600}
 *   alt="Description"
 * />
 */

export default function storyblokImageLoader({ src, width, quality }) {
  // Skip transformation for external URLs (non-Storyblok)
  if (!src.includes('a.storyblok.com')) {
    return src;
  }

  // Remove any existing transformation parameters
  const baseUrl = src.split('/m/')[0];

  // Build Storyblok image service URL
  // Format: /m/{width}x{height}/filters:quality({quality}):format(webp)
  // - /m/ = image service endpoint
  // - {width}x0 = resize to width, maintain aspect ratio
  // - filters = apply transformations
  // - quality = 1-100 (default: 75)
  // - format(webp) = convert to WebP for best compression
  
  const params = [
    `quality(${quality || 75})`,
    'format(webp)',
  ].join(':');

  return `${baseUrl}/m/${width}x0/filters:${params}`;
}

/**
 * Example transformations:
 * 
 * Original:
 * https://a.storyblok.com/f/288214/1920x1080/abc123/hero.jpg
 * 
 * Optimized (800px wide, WebP):
 * https://a.storyblok.com/f/288214/1920x1080/abc123/hero.jpg/m/800x0/filters:quality(75):format(webp)
 * 
 * Benefits:
 * - 60-80% smaller file size (WebP vs JPEG)
 * - Faster page loads
 * - Better Google PageSpeed score
 * - Automatic CDN caching
 */
