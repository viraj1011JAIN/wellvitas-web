"use client";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import TagBlok from "./TagBlok";
import OpenHoursBadge from "../OpenHoursBadge";

export default function IntroBandBlok({ blok }) {
  const TitleTag = blok.title_tag || 'h2';
  const isCTA = blok.variant === 'cta';

  // Handle tags
  let tags = [];
  if (Array.isArray(blok.tags) && blok.tags.length > 0) {
    tags = blok.tags;
  } else if (blok.tag) {
    tags = [{ _uid: 'legacy', label: blok.tag }];
  }



  return (
    <section {...storyblokEditable(blok)} className="section" >
      <div
        className={`relative overflow-hidden rounded-2xl ${isCTA ? 'p-6 md:p-8 shadow-card' : 'p-6 md:p-12'}`}
        style={{ background: blok.bg_color || '#2E0056' }}
      >
        <div className="relative z-10">

          {/* Tags rendering */}
          {tags.length > 0 && (
            <div className="flex flex-wrap mb-3 items-center">
              {tags.map((tag, index) => {
                if (tag.component === 'tag_pill') {
                  const isLast = index === tags.length - 1;
                  const showSeparator = !isLast && tag.variant === 'text';

                  return (
                    <span key={tag._uid} className="flex items-center">
                      <TagBlok blok={tag} />
                      {showSeparator && <span className="mx-1 text-white/80">·</span>}
                    </span>
                  );
                }

                const label = typeof tag === 'string' ? tag : (tag.label || "");
                if (!label) return null;

                return (
                  <span
                    key={tag._uid || label}
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: "var(--color-brand-2-40)",
                      color: "#2E0056",
                    }}
                  >
                    {label}
                  </span>
                )
              })}
            </div>
          )}

          {blok.title && (
            <TitleTag
              className={isCTA
                ? "text-2xl font-semibold text-white"
                : "text-3xl md:text-5xl font-bold tracking-tight text-white"}
            >
              {blok.title}
            </TitleTag>
          )}

          {blok.subtitle && (
            <p className={`mt-2 md:mt-4 max-w-prose ${isCTA ? 'text-white/90' : 'text-white/90'}`}>
              {blok.subtitle}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Optional Open Hours Badge */}
            {blok.show_hours_badge && <OpenHoursBadge />}

            {blok.buttons && blok.buttons.map((nestedBlok) => (
              <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
