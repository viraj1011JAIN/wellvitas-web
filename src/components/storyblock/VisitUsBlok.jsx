"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { StoryblokComponent } from "@storyblok/react";

const resolveLink = (link) => {
  if (!link) return "";
  if (typeof link === "string") return link;
  if (link.cached_url) return link.cached_url.startsWith("http") ? link.cached_url : `https://${link.cached_url}`; // Maps usually external
  return link.url || "";
};

export default function VisitUsBlok({ blok }) {
  const isCardRow = blok.layout === 'card_row';
  // const mapsLink = resolveLink(blok.map_embed_url?.url) || `https://maps.google.com/?q=${encodeURIComponent(blok.address || "1620 Great Western Rd, Anniesland, Glasgow G13 1HH")}`;

  // Helper for buttons
  const renderButtons = (fullWidth = false) => {
    if (blok.buttons && blok.buttons.length > 0) {
      return (
        <div className={`flex gap-3 ${fullWidth ? 'flex-col' : ''}`}>
          {blok.buttons.map(btn => (
            <StoryblokComponent key={btn._uid} blok={{ ...btn, full_width: fullWidth }} />
          ))}
        </div>
      );
    }
    return null;
  };

  if (isCardRow) {
    return (
      <section {...storyblokEditable(blok)} className="section">
        <div className="card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 fade-up">
          <div>
            <h2 className="text-lg md:text-xl font-semibold" style={{ color: "var(--color-brand-1)" }}>
              {blok.heading || blok.title || "Visit our studio"}
            </h2>
            <p className="mt-1 text-sm text-slate-600 whitespace-pre-line">
              {blok.text || `${blok.hours || "Open 9:00–20:00"} · ${blok.address || "1626 Great Western Rd, Anniesland, Glasgow G13 1HH"}`}
            </p>
          </div>
          {renderButtons()}
        </div>
      </section>
    )
  }

  // === MAP SIDEBAR LAYOUT ===
  if (blok.layout === 'map_sidebar') {
    const embedUrl = blok.map_embed_url?.url || "https://www.google.com/maps?q=1626+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH&output=embed";

    return (
      <section {...storyblokEditable(blok)} className="section" id="map">
        <div className="card p-0 overflow-hidden hover-lift">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <iframe
                title="Map Location"
                src={embedUrl}
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, minHeight: '360px' }}
              />
            </div>
            <div className="md:w-1/3 p-6 flex flex-col justify-center">
              <h3 className="font-semibold text-lg" style={{ color: "var(--color-brand-1)" }}>
                {blok.heading || "Find us"}
              </h3>
              <p className="mt-2 text-sm text-slate-700 whitespace-pre-line">
                {blok.address || "1626 Great Western Rd, Anniesland, Glasgow G13 1HH"}
              </p>

              {/* Stacked buttons */}
              <div className="mt-4">
                {renderButtons(true)}
              </div>

              {/* Description after buttons */}
              {blok.bottom_text && (
                <p className="mt-4 text-sm text-slate-600 whitespace-pre-line">
                  {blok.bottom_text}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Standard vertical layout
  return (
    <section {...storyblokEditable(blok)} className="section">
      <h2 className="text-xl md:text-2xl font-semibold" style={{ color: "var(--color-brand-1)" }}>
        {blok.heading || blok.title || "Visit us"}
      </h2>
      <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">
        {blok.text || `${blok.hours || "Open 9:00–20:00"} · ${blok.address || "1626 Great Western Rd, Anniesland, Glasgow G13 1HH"}`}
      </p>
      {renderButtons()}
    </section>
  );
}
