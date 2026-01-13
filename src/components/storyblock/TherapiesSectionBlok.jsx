"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import HomeTherapies from "@/components/HomeTherapies";
import TherapiesClient from "@/components/TherapiesClient";

export default function TherapiesSectionBlok({ blok }) {
  // Use explicit Storyblok field to control layout variant
  const isFullPage = blok.variant === 'full';

  if (isFullPage) {
    return (
      <div {...storyblokEditable(blok)}>
        <TherapiesClient title={blok.heading} intro={blok.intro} items={blok.Cards} />
      </div>
    );
  }

  return (
    <div {...storyblokEditable(blok)}>
      <HomeTherapies title={blok.heading} intro={blok.intro} items={blok.Cards} limit={6} />
    </div>
  );
}
