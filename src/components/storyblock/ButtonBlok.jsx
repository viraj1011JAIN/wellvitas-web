// src/components/storyblock/ButtonBlok.jsx
"use client";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function ButtonBlok({ blok }) {
  const {
    label = "Click Here",
    link,
    url,
    variant,
    Variant,
    size = "medium",
    full_width = false,
    open_in_new_tab = false,
    icon,
    icon_position = "left",
    custom_bg_color,
    custom_text_color,
  } = blok;

  const href = link?.cached_url || url || "#";
  const selectedVariant = Variant || variant || "primary";

  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  };

  const sizes = {
    small: "btn-sm",
    medium: "",
    large: "btn-lg",
  };

  const className = `
    btn
    ${variants[selectedVariant] || variants.primary}
    ${sizes[size] || ""}
    ${full_width ? "w-full flex" : ""}
  `.trim();

  const style = {};
  if (custom_bg_color) style.backgroundColor = custom_bg_color;
  if (custom_text_color) style.color = custom_text_color;

  // Fix for outline/ghost buttons needing brand color text if not set generically
  if ((selectedVariant === 'outline' || selectedVariant === 'ghost') && !custom_text_color) {
    style.color = "var(--color-brand-1)";
  }

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
