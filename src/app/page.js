// src/app/page.js

import { fetchStory } from "@/lib/storyblok";
import StaticHome from "@/components/StaticHome";
import { StoryblokComponent } from "@storyblok/react";
import { getStoryblokApi } from "@storyblok/react/rsc"; // Keep this one as /rsc

export const revalidate = 60;

export default async function HomePage() {
  try {
    const story = await fetchStory("home");
    const body = story?.content?.body || [];

    if (body.length) {
      return (
        <main>
          {body.map((blok) => (
            <StoryblokComponent blok={blok} key={blok._uid} />
          ))}
        </main>
      );
    }

    // No blocks yet in Storyblok → fall back to your handcrafted homepage
    return <StaticHome />;
  } catch {
    // Any API/bridge error → still show your homepage
    return <StaticHome />;
  }
}
