// src/lib/storyblok.js
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

// Import component wrappers
import HeroCarouselBlok from "@/components/storyblock/HeroCarouselBlok";
import TestimonialsBlok from "@/components/storyblock/TestimonialsBlok";
import IntroBandBlok from "@/components/storyblock/IntroBandBlok";
import PackagesSectionBlok from "@/components/storyblock/PackagesSectionBlok";
import NewsSliderBlok from "@/components/storyblock/NewsSliderBlok";
import HowToBookBlok from "@/components/storyblock/HowToBookBlok";
import VisitUsBlok from "@/components/storyblock/VisitUsBlok";
import TherapiesSectionBlok from "@/components/storyblock/TherapiesSectionBlok";
import PageBlok from "@/components/storyblock/PageBlok";
import SuperSaaSBookingBlok from "@/components/storyblock/SuperSaaSBookingBlok";
import NavigationBlok from "@/components/storyblock/NavigationBlok";
import FooterBlok from "@/components/storyblock/FooterBlok";
import ButtonBlok from "@/components/storyblock/ButtonBlok";
import ImageBlok from "@/components/storyblock/ImageBlok";
import RichTextBlok from "@/components/storyblock/RichTextBlok";
import SEOBlok from "@/components/storyblock/SEOBlok";

// Initialize Storyblok with RSC support
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu",
  },
  components: {
    page: PageBlok,
    news_slider: NewsSliderBlok,
    therapies_section: TherapiesSectionBlok,
    testimonials_section: TestimonialsBlok,
    packages_section: PackagesSectionBlok,
    intro_band: IntroBandBlok,
    how_to_book: HowToBookBlok,
    visit_us: VisitUsBlok,
    hero_carousel: HeroCarouselBlok,
    // SuperSaaS Integration
    supersaas_booking: SuperSaaSBookingBlok,
    // Layout Components
    navigation: NavigationBlok,
    footer: FooterBlok,
    // Reusable Components
    button: ButtonBlok,
    image: ImageBlok,
    rich_text: RichTextBlok,
    seo: SEOBlok,
  },
});

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
