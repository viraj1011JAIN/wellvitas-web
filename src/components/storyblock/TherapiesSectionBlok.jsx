"use client";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function TherapiesSectionBlok({ blok }) {
  return (
    <section {...storyblokEditable(blok)} id="therapies" className="section">
      {blok.heading && (
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: "var(--color-brand-1)" }}>
          {blok.heading}
        </h2>
      )}
      
      {/* Render therapy cards if provided, otherwise use HomeTherapies component */}
      {blok.therapies && blok.therapies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blok.therapies.map((therapy) => (
            <StoryblokComponent blok={therapy} key={therapy._uid} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Add therapy cards in Storyblok
        </div>
      )}
    </section>
  );
}
