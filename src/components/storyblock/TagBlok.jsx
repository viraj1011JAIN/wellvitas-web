"use client";
import { storyblokEditable } from "@storyblok/react";

export default function TagBlok({ blok }) {

    const isText = blok.variant === 'text';
    const label = typeof blok.label === 'string' ? blok.label : JSON.stringify(blok.label);

    if (isText) {
        return (
            <span
                {...storyblokEditable(blok)}
                className="text-xs md:text-sm font-medium text-white/90"
            >
                {label}

            </span>
        );
    }

    // Default: Pill
    return (
        <span
            {...storyblokEditable(blok)}
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{
                backgroundColor: "var(--color-brand-2-40)",
                color: "#2E0056",
            }}
        >
            {label}
        </span>
    );
}
