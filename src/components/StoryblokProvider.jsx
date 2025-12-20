"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

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
  image: ImageBlok,
  rich_text: RichTextBlok,
  seo: SEOBlok,
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