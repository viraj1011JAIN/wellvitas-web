"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import TreatmentPackagesScroller from "../TreatmentPackagesScroller";

const resolveLink = (link) => {
  if (!link) return "";
  if (link.cached_url) return link.cached_url.startsWith("/") ? link.cached_url : `/${link.cached_url}`;
  return link.url || "";
};

export default function PackagesSectionBlok({ blok }) {


  // Map Storyblok blocks to the format expected by the Scroller
  const packages = (blok.packages || []).map(card => {
    // Handle features: could be a text area (split by newline) or a list of blocks
    let featuresList = [];
    if (typeof card.features === 'string') {
      featuresList = card.features.split('\n').filter(f => f.trim() !== '');
    } else if (Array.isArray(card.features)) {
      // If it's a blocks field
      featuresList = card.features.map(f => f.text || f.name || JSON.stringify(f));
    }

    return {
      title: card.title,
      price: card.price,
      period: card.period || "", // e.g. "/ 4 weeks"
      href: resolveLink(card.link),
      // semantic "shotgun" approach for image field name
      img: card.image?.filename || card.Image?.filename || card.images?.filename || card.img?.filename || card.picture?.filename || "",
      badge: card.badge || null,
      features: featuresList,
      original: card, // For click-to-edit
    };
  });

  return (
    <div {...storyblokEditable(blok)}>
      <TreatmentPackagesScroller
        items={packages}
        title={blok.heading}
      />
    </div>
  );
}
