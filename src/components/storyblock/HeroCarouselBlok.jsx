"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import HeroCarousel from "../HeroCarousel";

export default function HeroCarouselBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <HeroCarousel />
    </div>
  );
}
