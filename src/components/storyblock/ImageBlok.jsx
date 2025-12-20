// src/components/storyblock/ImageBlok.jsx
"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

export default function ImageBlok({ blok }) {
  const {
    image,
    alt_text,
    width = "100%",
    height = "auto",
    rounded = false,
    shadow = false,
    caption,
    link,
    url,
  } = blok;

  if (!image?.filename) {
    return (
      <div {...storyblokEditable(blok)} className="bg-gray-100 flex items-center justify-center p-8 text-gray-400">
        No image selected
      </div>
    );
  }

  const imageElement = (
    <div 
      className={`relative ${rounded ? "rounded-lg overflow-hidden" : ""} ${shadow ? "shadow-lg" : ""}`}
      style={{ width, height: height !== "auto" ? height : undefined }}
    >
      <img
        src={image.filename}
        alt={alt_text || image.alt || "Image"}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );

  const content = (
    <>
      {imageElement}
      {caption && (
        <p className="text-sm text-gray-600 mt-2 text-center italic">
          {caption}
        </p>
      )}
    </>
  );

  const href = link?.cached_url || url;
  if (href) {
    return (
      <a 
        {...storyblokEditable(blok)}
        href={href}
        className="block hover:opacity-90 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return (
    <div {...storyblokEditable(blok)}>
      {content}
    </div>
  );
}
