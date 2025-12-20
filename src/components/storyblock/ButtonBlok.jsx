// src/components/storyblock/ButtonBlok.jsx
"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";

export default function ButtonBlok({ blok }) {
  const {
    label = "Click Here",
    link,
    url,
    variant = "primary",
    size = "medium",
    full_width = false,
    open_in_new_tab = false,
    icon,
    icon_position = "left",
    custom_bg_color,
    custom_text_color,
  } = blok;

  const href = link?.cached_url || url || "#";
  
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50",
    ghost: "text-purple-600 hover:bg-purple-50",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const className = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-full transition-all
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.medium}
    ${full_width ? "w-full" : ""}
  `.trim();

  const style = {};
  if (custom_bg_color) style.backgroundColor = custom_bg_color;
  if (custom_text_color) style.color = custom_text_color;

  const content = (
    <>
      {icon?.filename && icon_position === "left" && (
        <img src={icon.filename} alt="" width="20" height="20" />
      )}
      <span>{label}</span>
      {icon?.filename && icon_position === "right" && (
        <img src={icon.filename} alt="" width="20" height="20" />
      )}
    </>
  );

  if (href.startsWith("http") || open_in_new_tab) {
    return (
      <a
        {...storyblokEditable(blok)}
        href={href}
        className={className}
        style={style}
        target={open_in_new_tab ? "_blank" : undefined}
        rel={open_in_new_tab ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      {...storyblokEditable(blok)}
      href={href}
      className={className}
      style={style}
    >
      {content}
    </Link>
  );
}
