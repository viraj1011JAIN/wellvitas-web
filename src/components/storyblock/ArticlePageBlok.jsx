"use client";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Image from "next/image";

export default function ArticlePageBlok({ blok }) {
    const {
        title,
        subtitle,
        author,
        date,
        hero_image,
        body,
    } = blok;

    return (
        <article {...storyblokEditable(blok)} className="pb-16 bg-white min-h-screen">
            {/* Hero Section */}
            <header className="relative w-full bg-[#2E0056] text-white pt-32 pb-16 px-4 md:px-8 overflow-hidden">
                {/* Simple textured background or gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7E0054]/40 to-[#2E0056]/90 z-10" />

                {hero_image?.filename && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={hero_image.filename}
                            alt={hero_image.alt || ""}
                            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                        />
                    </div>
                )}

                <div className="relative z-20 container mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl md:text-5xl font-bold font-serif mb-4 leading-tight">
                        {title || "Article Title"}
                    </h1>
                    {subtitle && (
                        <p className="text-xl md:text-2xl text-white/90 mb-6 font-light">
                            {subtitle}
                        </p>
                    )}

                    <div className="flex items-center justify-center gap-4 text-sm font-medium text-white/80 uppercase tracking-widest">
                        {date && (
                            <time dateTime={date}>
                                {new Date(date).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}
                            </time>
                        )}
                        {date && author && <span>•</span>}
                        {author && (
                            <span>By {author}</span>
                        )}
                    </div>
                </div>
            </header>

            {/* Content Body */}
            <div className="container mx-auto px-4 -mt-8 relative z-30">
                <div className="bg-white rounded-t-3xl p-6 md:p-12 max-w-5xl mx-auto shadow-sm min-h-[500px]">
                    {body?.map((nestedBlok) => (
                        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                    ))}
                </div>
            </div>
        </article>
    );
}
