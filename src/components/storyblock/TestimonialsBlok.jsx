"use client";
import { storyblokEditable } from "@storyblok/react";
import TestimonialsCarousel from "../TestimonialsCarousel";

export default function TestimonialsBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <TestimonialsCarousel />
    </div>
  );
}
