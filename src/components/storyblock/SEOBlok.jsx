// src/components/storyblock/SEOBlok.jsx
"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Head from "next/head";

export default function SEOBlok({ blok }) {
  const {
    title,
    description,
    keywords,
    og_image,
    og_title,
    og_description,
    twitter_card = "summary_large_image",
    canonical_url,
    noindex = false,
    nofollow = false,
  } = blok;

  // This component doesn't render visible content
  // It's used to inject SEO meta tags
  return null;
}

// Export metadata for server components
export function generateSEOMetadata(blok) {
  if (!blok) return {};

  const {
    title,
    description,
    keywords,
    og_image,
    og_title,
    og_description,
    twitter_card = "summary_large_image",
    canonical_url,
    noindex = false,
    nofollow = false,
  } = blok;

  const metadata = {
    title,
    description,
    keywords: keywords?.split(",").map(k => k.trim()),
  };

  if (og_image?.filename) {
    metadata.openGraph = {
      title: og_title || title,
      description: og_description || description,
      images: [{ url: og_image.filename }],
    };

    metadata.twitter = {
      card: twitter_card,
      title: og_title || title,
      description: og_description || description,
      images: [og_image.filename],
    };
  }

  if (canonical_url) {
    metadata.alternates = {
      canonical: canonical_url,
    };
  }

  if (noindex || nofollow) {
    metadata.robots = {
      index: !noindex,
      follow: !nofollow,
    };
  }

  return metadata;
}
