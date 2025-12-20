"use client";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function VisitUsBlok({ blok }) {
  return (
    <section {...storyblokEditable(blok)} className="section">
      <h2 className="text-xl md:text-2xl font-semibold" style={{ color: "var(--color-brand-1)" }}>
        {blok.heading || "Visit us"}
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        {blok.hours || "Open 9:00–20:00"} · {blok.address || "1626 Great Western Rd, Anniesland, Glasgow G13 1HH"}
      </p>
      <div className="mt-4 flex gap-3">
        <a
          className="btn btn-outline"
          href={blok.maps_url || `https://maps.google.com/?q=${encodeURIComponent(blok.address || "1620 Great Western Rd, Anniesland, Glasgow G13 1HH")}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Open directions in Google Maps"
        >
          {blok.directions_text || "Get directions"}
        </a>
        <a className="btn btn-outline" href="#footer-map" aria-label="Scroll to the map">
          {blok.map_text || "See map"}
        </a>
      </div>
    </section>
  );
}
