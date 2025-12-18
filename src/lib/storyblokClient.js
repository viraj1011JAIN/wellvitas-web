"use client";

import StoryblokClient from "storyblok-js-client";

const storyblokApi = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  cache: { type: "memory", clear: "auto" },
});

export async function getStory(slug) {
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: "draft", // draft so boss can preview
  });
  return data?.story || null;
}
