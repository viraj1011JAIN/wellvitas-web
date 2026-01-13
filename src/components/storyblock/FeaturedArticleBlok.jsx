"use client";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function FeaturedArticleBlok({ blok, hasSiblingWithImage }) {
    const { article, title, excerpt, image, link_text } = blok;

    // Resolve the link URL
    let href = "#";
    if (article?.linktype === "story") {
        href = `/${article.cached_url || article.story?.full_slug || ""}`;
        // Remove trailing slash to be safe, but ensure leading slash
        href = href.replace(/\/$/, "");
        if (!href.startsWith("/")) href = `/${href}`;
    } else if (article?.url) {
        href = article.url;
    }

    const hasImage = image?.filename;
    // Show placeholder ONLY if we are missing an image BUT a sibling has one (to keep alignment)
    const showPlaceholder = !hasImage && hasSiblingWithImage;
    // Render the image area if we have an image OR we need to show a placeholder
    const shouldRenderImageArea = hasImage || showPlaceholder;

    return (
        <div {...storyblokEditable(blok)} className="w-full max-w-md mx-auto h-full">
            <Link href={href} className="group block h-full">
                <div className="relative flex flex-col h-full bg-white rounded-2xl shadow-card overflow-hidden hover-lift transition-all duration-300">
                    {/* Image Section - Only render if needed */}
                    {shouldRenderImageArea && (
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                            {hasImage ? (
                                <img
                                    src={image.filename}
                                    alt={image.alt || title || "Article thumbnail"}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                // Fallback placeholder (Only shown if siblings have images)
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}

                            {/* Overlay hint */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="flex flex-col flex-grow p-6">
                        <h3 className="text-xl font-bold text-[#2E0056] mb-3 line-clamp-2 group-hover:text-[#7E0054] transition-colors">
                            {title || "Featured Article"}
                        </h3>

                        {excerpt && (
                            <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                                {excerpt}
                            </p>
                        )}

                        <div className="mt-auto">
                            <span className="inline-flex items-center text-sm font-semibold text-[#7E0054] group-hover:translate-x-1 transition-transform">
                                {link_text || "Read Article"}
                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
