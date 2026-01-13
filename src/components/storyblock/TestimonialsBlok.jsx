"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import TestimonialsCarousel from "../TestimonialsCarousel";

export default function TestimonialsBlok({ blok }) {

  const testimonials = (blok.testimonials || []).map((t) => ({
    name: t.name,
    role: t.role,
    quote: t.quote || t.text, // support 'quote' or 'text' field
    original: t,
  }));

  return (
    <div {...storyblokEditable(blok)}>
      <TestimonialsCarousel items={testimonials} title={blok.heading} />
    </div>
  );
}
