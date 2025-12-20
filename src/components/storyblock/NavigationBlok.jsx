// src/components/storyblock/NavigationBlok.jsx
"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";
import { useState } from "react";

export default function NavigationBlok({ blok }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    site_name = "Wellvitas",
    logo_image,
    logo_width = "150",
    navigation_items = [],
    cta_button,
    background_color = "#ffffff",
    text_color = "#1f2937",
    sticky = true,
  } = blok;

  return (
    <header 
      {...storyblokEditable(blok)}
      className={`w-full z-50 ${sticky ? "sticky top-0" : ""}`}
      style={{ 
        backgroundColor: background_color,
        borderBottom: "1px solid #e5e7eb",
        boxShadow: sticky ? "0 1px 3px 0 rgb(0 0 0 / 0.1)" : "none"
      }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logo_image?.filename ? (
              <img 
                src={logo_image.filename} 
                alt={logo_image.alt || site_name}
                width={logo_width}
                height="auto"
                className="h-auto"
              />
            ) : (
              <span className="text-2xl font-bold" style={{ color: text_color }}>
                {site_name}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navigation_items?.map((item) => (
              <li key={item._uid}>
                <Link 
                  href={item.link?.cached_url || item.url || "#"}
                  className="hover:opacity-75 transition-opacity font-medium"
                  style={{ color: text_color }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            
            {cta_button?.label && (
              <li>
                <Link
                  href={cta_button.link?.cached_url || cta_button.url || "#"}
                  className="px-6 py-2 rounded-full font-semibold transition-all hover:opacity-90"
                  style={{
                    backgroundColor: cta_button.background_color || "var(--color-brand-1)",
                    color: cta_button.text_color || "#ffffff",
                  }}
                >
                  {cta_button.label}
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke={text_color} 
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col gap-4">
              {navigation_items?.map((item) => (
                <li key={item._uid}>
                  <Link 
                    href={item.link?.cached_url || item.url || "#"}
                    className="block py-2 hover:opacity-75 transition-opacity"
                    style={{ color: text_color }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              
              {cta_button?.label && (
                <li>
                  <Link
                    href={cta_button.link?.cached_url || cta_button.url || "#"}
                    className="block text-center px-6 py-2 rounded-full font-semibold"
                    style={{
                      backgroundColor: cta_button.background_color || "var(--color-brand-1)",
                      color: cta_button.text_color || "#ffffff",
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cta_button.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
