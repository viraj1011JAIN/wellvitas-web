// src/components/storyblock/RichTextBlok.jsx
"use client";
import { storyblokEditable, renderRichText } from "@storyblok/react";

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
  // content is an Object, must undergo renderRichText()
  const htmlContent = renderRichText(content);

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
        className="prose prose-lg max-w-none text-slate-700 prose-headings:text-[#2E0056] prose-img:rounded-xl prose-a:text-[#7E0054] prose-table:border-collapse prose-table:w-full prose-th:border prose-th:border-slate-300 prose-th:p-2 prose-th:bg-slate-100 prose-td:border prose-td:border-slate-300 prose-td:p-2"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
