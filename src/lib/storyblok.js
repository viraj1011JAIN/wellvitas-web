// src/lib/storyblok.js
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokClient from "storyblok-js-client";

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
import TherapyCardBlok from "@/components/storyblock/TherapyCardBlok";
import SEOBlok from "@/components/storyblock/SEOBlok";
import QuickLinksBlok from "@/components/storyblock/QuickLinksBlok";
import FaqGridBlok from "@/components/storyblock/FaqGridBlok";
import InfoGridBlok from "@/components/storyblock/InfoGridBlok";
import BookingFlowBlok from "@/components/storyblock/BookingFlowBlok";
import TagBlok from "@/components/storyblock/TagBlok";
import OpenHoursBadgeBlok from "@/components/storyblock/OpenHoursBadgeBlok";

import ArticlePageBlok from "@/components/storyblock/ArticlePageBlok";
import QuoteBlok from "@/components/storyblock/QuoteBlok";
import VideoBlok from "@/components/storyblock/VideoBlok";
import FeaturedArticleBlok from "@/components/storyblock/FeaturedArticleBlok";

// Initialize Storyblok with RSC support (for components/bridge)
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu",
  },
  components: {
    page: PageBlok,
    article: ArticlePageBlok, // Lowercase
    Article: ArticlePageBlok, // Capitalized (Just in case)
    article_page: ArticlePageBlok, // Alias
    featured_article: FeaturedArticleBlok, // New Component
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
    quote: QuoteBlok,
    video: VideoBlok,
    rich_text: RichTextBlok,
    seo: SEOBlok,
    therapy_card: TherapyCardBlok,
    quick_links: QuickLinksBlok,
    faq_grid: FaqGridBlok,
    info_grid: InfoGridBlok,
    booking_flow: BookingFlowBlok,
    tag_pill: TagBlok,
    open_hours_badge: OpenHoursBadgeBlok,
  },
});

// fetchStory: Uses a fresh Client instance to ensure Env Vars are respected
export async function fetchStory(slug, params = {}) {
  try {
    const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
    const region = process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu";

    if (!token) {
      throw new Error("Storyblok token is missing. Please check your .env file.");
    }

    console.log(`[Storyblok] Fetching story: '${slug}'`);
    const safeToken = `${token.slice(0, 5)}...${token.slice(-3)}`;
    console.log(`[Storyblok] Client Config -> Token: ${safeToken}, Region: ${region}`);

    // Create a fresh client instance to avoid global singleton staleness
    const sb = new StoryblokClient({
      accessToken: token,
      region: region,
    });

    const { data } = await sb.get(`cdn/stories/${slug}`, {
      version: params.version || (process.env.NODE_ENV === "development" ? "draft" : "published"),
      cv: Date.now(), // Force cache buster
      ...params,
    });

    return data.story;
  } catch (error) {
    console.error(`[Storyblok] Fetch failed for slug: ${slug}`);

    // Detailed error logging
    if (error?.response) {
      console.error(`[Storyblok] API Error: ${error.response.status} ${error.response.statusText}`);
      console.error(`[Storyblok] API Body:`, JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("[Storyblok] Full Error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    }

    throw error;
  }
}

// Helper to fetch all top-level pages for automatic navigation
export async function fetchTopLevelPages() {
  try {
    const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
    const region = process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu";

    const sb = new StoryblokClient({ accessToken: token, region: region });

    const { data } = await sb.get("cdn/stories", {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      level: 1, // Only root pages
      cv: Date.now(),
    });

    // Filter out 'config' and map to navigation format
    const pages = data.stories
      .filter(s => s.slug !== 'config') // Exclude config story
      .map(s => ({
        label: s.name,
        href: s.slug === 'home' ? '/' : `/${s.slug}`,
        uuid: s.uuid, // Useful for key
        position: s.position || 0, // Storyblok uses 'position' for sorting if dragged in UI
      }));

    // Sort: Home first, then by Storyblok position (if available) or name
    pages.sort((a, b) => {
      if (a.href === '/') return -1;
      if (b.href === '/') return 1;
      return a.position - b.position;
    });

    return pages;

  } catch (error) {
    console.error("[Storyblok] Failed to fetch top level pages", error);
    return [];
  }
}
