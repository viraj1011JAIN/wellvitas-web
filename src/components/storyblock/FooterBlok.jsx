// src/components/storyblock/FooterBlok.jsx
"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";

export default function FooterBlok({ blok }) {
  const {
    site_name = "Wellvitas",
    tagline,
    columns = [],
    social_links = [],
    copyright_text,
    background_color = "#1f2937",
    text_color = "#ffffff",
    show_back_to_top = true,
  } = blok;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      {...storyblokEditable(blok)}
      style={{ 
        backgroundColor: background_color, 
        color: text_color 
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-bold mb-2">{site_name}</h3>
            {tagline && (
              <p className="opacity-80 mb-4">{tagline}</p>
            )}
            
            {/* Social Links */}
            {social_links?.length > 0 && (
              <div className="flex gap-4 mt-4">
                {social_links.map((social) => (
                  <a
                    key={social._uid}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                    aria-label={social.platform}
                  >
                    {social.icon?.filename ? (
                      <img 
                        src={social.icon.filename} 
                        alt={social.platform}
                        width="24"
                        height="24"
                      />
                    ) : (
                      <span className="text-xl">{social.platform}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Columns */}
          {columns?.map((column) => (
            <div key={column._uid}>
              <h4 className="font-bold text-lg mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links?.map((link) => (
                  <li key={link._uid}>
                    <Link
                      href={link.link?.cached_url || link.url || "#"}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: `${text_color}33` }}
        >
          <p className="opacity-80 text-sm">
            {copyright_text || `© ${new Date().getFullYear()} ${site_name}. All rights reserved.`}
          </p>

          {show_back_to_top && (
            <button
              onClick={scrollToTop}
              className="px-4 py-2 rounded-md hover:opacity-75 transition-opacity text-sm"
              style={{ backgroundColor: `${text_color}22` }}
            >
              ↑ Back to Top
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
