"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react";

import PageBlok from "./storyblock/PageBlok";
import IntroBandBlok from "./storyblock/IntroBandBlok";
import HowToBookBlok from "./storyblock/HowToBookBlok";
import VisitUsBlok from "./storyblock/VisitUsBlok";
import TherapiesSectionBlok from "./storyblock/TherapiesSectionBlok";
import PackagesSectionBlok from "./storyblock/PackagesSectionBlok";
import NewsSliderBlok from "./storyblock/NewsSliderBlok";
import TestimonialsBlok from "./storyblock/TestimonialsBlok";
import HeroCarouselBlok from "./storyblock/HeroCarouselBlok";
import HomeTherapiesBlok from "./storyblock/HomeTherapiesBlok";
import SuperSaaSBookingBlok from "./storyblock/SuperSaaSBookingBlok";
import NavigationBlok from "./storyblock/NavigationBlok";
import FooterBlok from "./storyblock/FooterBlok";
import ButtonBlok from "./storyblock/ButtonBlok";
import ImageBlok from "./storyblock/ImageBlok";
import RichTextBlok from "./storyblock/RichTextBlok";
import SEOBlok from "./storyblock/SEOBlok";
import TherapyCardBlok from "./storyblock/TherapyCardBlok";
import QuickLinksBlok from "./storyblock/QuickLinksBlok";
import FaqGridBlok from "./storyblock/FaqGridBlok";
import InfoGridBlok from "./storyblock/InfoGridBlok";
import BookingFlowBlok from "./storyblock/BookingFlowBlok";
import TagBlok from "./storyblock/TagBlok";
import OpenHoursBadgeBlok from "./storyblock/OpenHoursBadgeBlok";
import ArticlePageBlok from "./storyblock/ArticlePageBlok";
import QuoteBlok from "./storyblock/QuoteBlok";
import VideoBlok from "./storyblock/VideoBlok";
import FeaturedArticleBlok from "./storyblock/FeaturedArticleBlok";

const components = {
  page: PageBlok,
  intro_band: IntroBandBlok,
  how_to_book: HowToBookBlok,
  visit_us: VisitUsBlok,
  therapies_section: TherapiesSectionBlok,
  packages_section: PackagesSectionBlok,
  news_slider: NewsSliderBlok,
  testimonials_section: TestimonialsBlok,
  hero_carousel: HeroCarouselBlok,
  home_therapies: HomeTherapiesBlok,
  supersaas_booking: SuperSaaSBookingBlok,
  navigation: NavigationBlok,
  footer: FooterBlok,
  button: ButtonBlok,
  cta_button: ButtonBlok,
  image: ImageBlok,
  rich_text: RichTextBlok,
  seo: SEOBlok,
  therapy_card: TherapyCardBlok,
  quick_links: QuickLinksBlok,
  faq_grid: FaqGridBlok,
  info_grid: InfoGridBlok,
  booking_flow: BookingFlowBlok,
  tag_pill: TagBlok,
  open_hours_badge: OpenHoursBadgeBlok,
  article: ArticlePageBlok, // Lowercase match
  Article: ArticlePageBlok, // Capitalized match
  article_page: ArticlePageBlok, // Alias
  quote: QuoteBlok,
  video: VideoBlok,
  featured_article: FeaturedArticleBlok,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    region: process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu",
  },
});

export default function StoryblokProvider({ children }) {
  return <>{children}</>;
}