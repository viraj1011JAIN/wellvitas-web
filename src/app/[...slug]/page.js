import { fetchStory } from "@/lib/storyblok";
import StoryblokProvider from "@/components/StoryblokProvider";
import StoryblokStory from "@/components/StoryblokStory";
import { notFound } from "next/navigation";
import { generateSEOMetadata } from "@/components/storyblock/SEOBlok";

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.slug ? resolvedParams.slug.join("/") : "home";

  try {
    const story = await fetchStory(slug, {
      version: resolvedSearchParams?._storyblok ? "draft" : "published",
    });

    // Check for a dedicated 'seo' field (Blocks) or find it in the body
    const seoBlock = story.content.seo?.[0] || story.content.body?.find(b => b.component === 'seo');

    return generateSEOMetadata(seoBlock);
  } catch (e) {
    return {};
  }
}

export default async function Page({ params, searchParams }) {
  // Await params and searchParams in Next.js 15
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.slug ? resolvedParams.slug.join("/") : "home";
  const isStoryblokPreview = resolvedSearchParams?._storyblok;

  try {
    const story = await fetchStory(slug, {
      version: isStoryblokPreview ? "draft" : undefined,
    });

    return (
      <StoryblokProvider>
        <main>
          <StoryblokStory story={story} />
        </main>
      </StoryblokProvider>
    );
  } catch (error) {
    if (isStoryblokPreview) {
      return (
        <StoryblokProvider>
          <main style={{ padding: '2rem', textAlign: 'center', fontFamily: 'monospace' }}>
            <h2 style={{ color: 'red' }}>Storyblok Error</h2>
            <p>Failed to fetch story: <strong>{slug}</strong></p>
            <div style={{ textAlign: 'left', background: '#f5f5f5', padding: '1rem', borderRadius: '4px', margin: '1rem 0' }}>
              <p><strong>Message:</strong> {error.message}</p>
              {error.response && (
                <>
                  <p><strong>Status:</strong> {error.response.status}</p>
                  <p><strong>Response:</strong> {JSON.stringify(error.response.data, null, 2)}</p>
                </>
              )}
            </div>
            <p>Check your terminal for full logs.</p>
          </main>
        </StoryblokProvider>
      );
    }
    notFound();
  }
}
