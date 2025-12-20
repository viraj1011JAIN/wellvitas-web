// src/components/storyblock/RichTextBlok.jsx
"use client";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function RichTextBlok({ blok }) {
  const {
    content,
    text_align = "left",
    max_width,
    text_color,
    background_color,
    padding,
  } = blok;

  if (!content) {
    return (
      <div {...storyblokEditable(blok)} className="p-4 bg-gray-50 text-gray-400 text-center">
        Add rich text content in Storyblok
      </div>
    );
  }

  // Render HTML content from Storyblok Rich Text field
  return (
    <div 
      {...storyblokEditable(blok)}
      className="rich-text-content"
      style={{
        textAlign: text_align,
        maxWidth: max_width || "100%",
        color: text_color,
        backgroundColor: background_color,
        padding: padding || "1rem",
        margin: "0 auto",
      }}
    >
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
