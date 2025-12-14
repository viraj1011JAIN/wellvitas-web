// src/lib/storyblok.js
import {
  storyblokInit,
  apiPlugin,
  getStoryblokApi,
  StoryblokComponent
} from "@storyblok/react";

// Register Storyblok components here as you build them.
// For now it's empty; add hero, therapies, etc later.
const components = {
  // hero_carousel: HeroCarousel,
  // intro_block: IntroBlock,
  // therapies_section: TherapiesSection,
  // ...
};

storyblokInit({
  accessToken: "X6nvy6zz3xsdtUvSuB5CLQtt", // later: use env var
  use: [apiPlugin],
  components,
});

// helper to render nested blok components
export { StoryblokComponent };

// simple fetch helper used by pages (server or client)
export async function fetchStory(slug, params = {}) {
  const sb = getStoryblokApi();
  const { data } = await sb.get(`cdn/stories/${slug}`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    ...params,
  });
  return data.story;
}
