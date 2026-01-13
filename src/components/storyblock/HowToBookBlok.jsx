"use client";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";

const resolveLink = (link) => {
  if (!link) return "";
  if (typeof link === "string") return link; // Handle legacy/text string input
  if (link.cached_url) return link.cached_url.startsWith("/") || link.cached_url.startsWith("http") ? link.cached_url : `/${link.cached_url}`;
  return link.url || "";
};

export default function HowToBookBlok({ blok }) {


  // Fallback buttons if none are provided
  const hasButtons = blok.buttons && blok.buttons.length > 0;

  return (
    <section {...storyblokEditable(blok)} className="section">
      <div
        className="rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-card"
        style={{ backgroundColor: "#2E0056" }}
      >
        <div>
          <h2 className="text-xl font-semibold text-white">
            {blok.heading || blok.title || "How to book"}
          </h2>
          <p className="mt-1 text-sm text-white/85">
            {blok.description || blok.text || blok.subtitle || "Make an enquiry, complete the health screening, enjoy a free taster treatment, then start your programme."}
          </p>
        </div>

        <div className="flex gap-3">
          {hasButtons ? (
            blok.buttons.map((nestedBlok) => (
              <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
            ))
          ) : (
            // Fallback if no buttons exist in CMS yet
            <>
              <a
                className="btn rounded-2xl border shadow-card transition-transform hover:-translate-y-0.5"
                href="https://wa.me/447379005856"
                target="_blank"
                rel="noreferrer"
                style={{ background: "var(--color-brand-2-40)", color: "#2E0056", borderColor: "#7E0054" }}
              >
                WhatsApp us
              </a>
              <Link
                className="btn rounded-2xl border shadow-card transition-transform hover:-translate-y-0.5"
                href="/booking"
                style={{ background: "var(--color-brand-2-40)", color: "#2E0056", borderColor: "#7E0054" }}
              >
                Booking form
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
