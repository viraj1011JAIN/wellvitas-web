"use client";
import { storyblokEditable } from "@storyblok/react";

export default function QuoteBlok({ blok }) {
    return (
        <figure {...storyblokEditable(blok)} className="my-8 pl-6 border-l-4 border-[#7E0054] bg-[#7E0054]/5 p-6 rounded-r-lg">
            <blockquote className="italic text-xl text-[#2E0056] font-serif leading-relaxed">
                "{blok.text}"
            </blockquote>
            {blok.author && (
                <figcaption className="mt-4 text-sm font-semibold text-[#7E0054] uppercase tracking-wider">
                    — {blok.author}
                </figcaption>
            )}
        </figure>
    );
}
