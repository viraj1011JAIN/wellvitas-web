"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Helper function to extract image safely (similar to your lib/therapies logic)
// Assuming blok.image follows Storyblok asset structure
function getTherapyImage(blok) {
    if (blok.image?.filename) {
        return {
            src: blok.image.filename + (blok.image.focus ? `/m/${blok.image.focus}` : ""),
            alt: blok.image.alt || blok.name || "Therapy image",
        };
    }
    // Fallback image if none provided
    return {
        src: "https://a.storyblok.com/f/288214049142470/3097x1936/7b8d142d66/slide1.jpg",
        alt: "Relaxing therapy environment",
    };
}

export default function TherapyCardBlok({ blok }) {
    const pathname = usePathname();
    const isTherapiesPage = pathname === '/therapies';

    const { src, alt } = getTherapyImage(blok);
    const slug = blok.slug || blok.name?.toLowerCase().replace(/\s+/g, '-');
    const category = blok.category || "General";

    // View label/link logic
    const viewLabel = blok.view_label || "View details";
    const rawLink = blok.view_href?.cached_url || blok.view_href?.url;
    const href = rawLink
        ? (rawLink.startsWith("/") || rawLink.startsWith("http") ? rawLink : `/${rawLink}`)
        : `/therapies#${slug}`;

    // --- DETAILED LAYOUT (For /therapies page) ---
    if (isTherapiesPage) {
        return (
            <article
                {...storyblokEditable(blok)}
                id={slug}
                className="group overflow-hidden rounded-xl bg-white shadow-card transition-transform hover:-translate-y-1 scroll-mt-24 focus-within:ring-2 focus-within:ring-[color:var(--color-brand-2)]"
            >
                {/* Image */}
                <div className="relative h-40 w-full">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-semibold text-slate-900 line-clamp-1">{blok.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
                        {category && <span className="chip">{category}</span>}
                        {blok.duration && <span className="badge">{blok.duration}</span>}
                        {blok.price && <span className="badge">Price {blok.price}</span>}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                // Update hash to trigger any page listeners or pure navigation
                                window.history.replaceState(null, "", `#${slug}`);
                                // Dispatch a hashchange event manually in case logic depends on it
                                window.dispatchEvent(new Event('hashchange'));
                            }}
                        >
                            {viewLabel}
                        </button>
                        <Link href="/booking" className="btn btn-outline text-xs px-3 py-1.5">
                            Book
                        </Link>
                    </div>
                </div>
            </article>
        );
    }

    // --- COMPACT LAYOUT (Default / Home) ---
    return (
        <Link
            {...storyblokEditable(blok)}
            href={href}
            className="group block overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-slate-100 transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-2)]"
            aria-label={`${viewLabel} for ${blok.name}`}
        >
            {/* Image */}
            <div className="relative w-full h-36 md:h-44">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                    <h3 className="text-white text-sm md:text-base font-semibold line-clamp-1 drop-shadow">
                        {blok.name}
                    </h3>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-3">
                <span className="text-xs text-slate-500">{category}</span>
                <span className="text-[13px] font-medium group-hover:underline" style={{ color: "var(--color-brand-1)" }}>
                    {viewLabel} →
                </span>
            </div>
        </Link>
    );
}
