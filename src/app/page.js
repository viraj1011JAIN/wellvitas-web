// src/app/page.js

import { fetchStory } from "@/lib/storyblok";
import StaticHome from "@/components/StaticHome";
import { StoryblokComponent } from "@storyblok/react";
import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokProvider from "@/components/StoryblokProvider";

export const revalidate = 60;

export default async function HomePage({ searchParams }) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  const isStoryblokPreview = params?._storyblok;
  
  // If not in preview mode, just show static homepage
  if (!isStoryblokPreview) {
    return <StaticHome />;
  }
  
  try {
    const story = await fetchStory("home", {
      version: "draft",
    });
    const body = story?.content?.body || [];

    if (body.length) {
      return (
        <StoryblokProvider>
          <main>
            {body.length > 0 ? (
              body.map((blok) => (
                <StoryblokComponent blok={blok} key={blok._uid} />
              ))
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>No content blocks found in Storyblok. Add content blocks to your &apos;home&apos; story.</p>
              </div>
            )}
          </main>
        </StoryblokProvider>
      );
    }

    // No blocks yet in Storyblok → fall back to your handcrafted homepage
    return <StaticHome />;
  } catch (error) {
    // If in preview mode, show helpful setup message
    if (isStoryblokPreview) {
      return (
        <StoryblokProvider>
          <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#1b243f', marginBottom: '1rem' }}>Storyblok Setup Required</h1>
            <div style={{ background: '#f7f9fc', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>✅ Connection Successful!</h2>
              <p>Your localhost is connected to Storyblok, but the &apos;home&apos; story doesn&apos;t exist yet.</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '1rem' }}>Next Steps:</h3>
              <ol style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>In Storyblok Dashboard, go to <strong>Content</strong></li>
                <li>Click <strong>Create New Entry</strong></li>
                <li>Name it <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>home</code></li>
                <li>Choose <strong>Page</strong> as the content type</li>
                <li>Add some content blocks</li>
                <li>Click <strong>Save</strong></li>
                <li>Refresh this preview</li>
              </ol>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
              <p><strong>Space ID:</strong> {process.env.NEXT_PUBLIC_STORYBLOK_BRAND_SPACE_ID}</p>
              <p><strong>Preview URL:</strong> https://localhost:3010</p>
            </div>
          </main>
        </StoryblokProvider>
      );
    }
    // Any API/bridge error → still show your homepage
    return <StaticHome />;
  }
}
