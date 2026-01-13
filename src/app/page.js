// src/app/page.js

import { fetchStory } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import StaticHome from "@/components/StaticHome";
import StoryblokProvider from "@/components/StoryblokProvider";

export const revalidate = 60; // Revalidate every 60 seconds

import { generateSEOMetadata } from "@/components/storyblock/SEOBlok";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  try {
    const story = await fetchStory("home", {
      version: params?._storyblok ? "draft" : "published"
    });
    const seoBlock = story.content.seo?.[0] || story.content.body?.find(b => b.component === 'seo');
    return generateSEOMetadata(seoBlock);
  } catch (e) {
    return {};
  }
}

export default async function HomePage({ searchParams }) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  const isStoryblokPreview = params?._storyblok;
  const version = isStoryblokPreview ? "draft" : undefined;

  try {
    const story = await fetchStory("home", { version });

    return (
      <StoryblokProvider>
        <StoryblokStory story={story} />
      </StoryblokProvider>
    );
  } catch (error) {
    // Fallback only if Storyblok fails completely
    console.error("Home fetch failed, falling back to static", error);
    return <StaticHome />;
  }
}
