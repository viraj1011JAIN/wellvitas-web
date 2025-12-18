// src/lib/storyblok.js
import {
  storyblokInit,
  apiPlugin,
  getStoryblokApi,
  StoryblokComponent
} from "@storyblok/react";
import HeroCarouselBlok from "@/components/storyblock/HeroCarouselBlok";
import TestimonialsBlok from "@/components/storyblock/TestimonialsBlok";
import IntroBandBlok from "@/components/storyblock/IntroBandBlok";
import PackagesSectionBlok from "@/components/storyblock/PackagesSectionBlok";
import NewsSliderBlok from "@/components/storyblock/NewsSliderBlok";
import HowToBookBlok from "@/components/storyblock/HowToBookBlok";
import VisitUsBlok from "@/components/storyblock/VisitUsBlok";
import TherapiesSectionBlok from "@/components/storyblock/TherapiesSectionBlok";

// Register Storyblok components - keys must match Storyblok Block Library names
const components = {
  page: ({ blok }) => <div>{blok.body}</div>,
  news_slider: NewsSliderBlok,
  therapies_section: TherapiesSectionBlok,
  testimonials_section: TestimonialsBlok,
  packages_section: PackagesSectionBlok,
  intro_band: IntroBandBlok,
  how_to_book: HowToBookBlok,
  visit_us: VisitUsBlok,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu",
  },
});

// helper to render nested blok components
export { StoryblokComponent };

// simple fetch helper used by pages (server or client)
export async function fetchStory(slug, params = {}) {
  try {
    const sb = getStoryblokApi();
    console.log("Fetching story:", slug, "with token:", process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN?.substring(0, 10) + "...");
    const { data } = await sb.get(`cdn/stories/${slug}`, {
      version: params.version || (process.env.NODE_ENV === "development" ? "draft" : "published"),
      ...params,
    });
    return data.story;
  } catch (error) {
    console.error("Storyblok fetch error details:", {
      message: error?.message,
      response: error?.response,
      status: error?.status,
      statusText: error?.statusText,
      slug: slug,
      token: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN?.substring(0, 10) + "..."
    });
    throw error;
  }
}
