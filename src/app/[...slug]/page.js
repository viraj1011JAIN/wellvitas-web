import { fetchStory } from "@/lib/storyblok";
import { StoryblokComponent } from "@storyblok/react";
import StoryblokProvider from "@/components/StoryblokProvider";
import { notFound } from "next/navigation";

export default async function Page({ params, searchParams }) {
  // Await params and searchParams in Next.js 15
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.slug ? resolvedParams.slug.join("/") : "home";
  const isStoryblokPreview = resolvedSearchParams?._storyblok;

  try {
    const story = await fetchStory(slug, {
      version: isStoryblokPreview ? "draft" : "published",
    });

    // Get the body blocks from the story
    const body = story.content?.body || [];

    return (
      <StoryblokProvider>
        <main>
          {body.length > 0 ? (
            body.map((blok) => (
              <StoryblokComponent blok={blok} key={blok._uid} />
            ))
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p>No content blocks. Add blocks to the &apos;body&apos; field in Storyblok.</p>
            </div>
          )}
        </main>
      </StoryblokProvider>
    );
  } catch (error) {
    if (isStoryblokPreview) {
      return (
        <StoryblokProvider>
          <main style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Story Not Found</h2>
            <p>Could not find story: <strong>{slug}</strong></p>
            <p>Make sure this story exists in your Storyblok space.</p>
          </main>
        </StoryblokProvider>
      );
    }
    notFound();
  }
}
