"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { THERAPIES, therapyImage } from "@/lib/therapies";
import IntroBandBlok from "./storyblock/IntroBandBlok";

export default function TherapiesClient({ title, intro, items }) {
    const [openSlug, setOpenSlug] = useState(null);
    const hashHandled = useRef(false);

    // Use passed items if valid, otherwise fallback to static data
    const therapyItems = (items && items.length > 0) ? items : THERAPIES;

    // Open the drawer from URL hash (e.g. /therapies#hyperbaric-oxygen-therapy)
    useEffect(() => {
        const applyHash = () => {
            const slug = window.location.hash.replace("#", "");
            if (!slug) return;
            const exists = therapyItems.find((t) => t.slug === slug);
            if (exists) setOpenSlug(slug);
        };
        if (!hashHandled.current) {
            applyHash();
            hashHandled.current = true;
        }
        window.addEventListener("hashchange", applyHash);
        return () => window.removeEventListener("hashchange", applyHash);
    }, [therapyItems]);

    return (
        <div className="therapies-client">
            {/* Re-use shared Intro component */}
            <IntroBandBlok
                blok={{
                    _uid: "therapies-hero",
                    title: title || "Therapies",
                    subtitle: intro || "Explore our therapies. Tap any card to view details, pricing band, and who it’s for.",
                    bg_color: "#2E0056",
                    title_tag: "h1"
                }}
            />

            {/* Compact cards grid */}
            <section className="section">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {therapyItems.map((t) => {
                        const { src, alt } = therapyImage(t);
                        return (
                            <article
                                key={t._uid || t.slug}
                                {...storyblokEditable(t)}
                                id={t.slug}
                                className="group overflow-hidden rounded-xl bg-white shadow-card transition-transform hover:-translate-y-1 scroll-mt-24
                           focus-within:ring-2 focus-within:ring-[color:var(--color-brand-2)]"
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
                                    <h3 className="font-semibold text-slate-900 line-clamp-1">{t.name}</h3>
                                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
                                        <span className="chip">{t.category}</span>
                                        <span className="badge">{t.duration}</span>
                                        <span className="badge">Price {t.price}</span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setOpenSlug(t.slug);
                                                window.history.replaceState(null, "", `#${t.slug}`);
                                            }}
                                        >
                                            View details
                                        </button>
                                        <Link href="/booking" className="btn btn-outline">
                                            Book
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* Drawer */}
            <DetailsDrawer
                therapy={therapyItems.find((t) => t.slug === openSlug) ?? null}
                onClose={() => {
                    setOpenSlug(null);
                    const { pathname, search } = window.location;
                    window.history.replaceState(null, "", pathname + search);
                }}
            />
        </div>
    );
}

/* =========================
   Details Drawer
   ========================= */

function DetailsDrawer({ therapy, onClose }) {
    const panelRef = useRef(null);

    useEffect(() => {
        if (!therapy) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [therapy, onClose]);

    useEffect(() => {
        if (therapy && panelRef.current) panelRef.current.focus();
    }, [therapy]);

    if (!therapy) return null;

    const { src, alt } = therapyImage(therapy);

    return (
        <>
            <div
                className="fixed inset-0 z-[60] bg-black/40"
                role="button"
                aria-label="Close details overlay"
                onClick={onClose}
            />
            <div
                ref={panelRef}
                tabIndex={-1}
                aria-modal="true"
                role="dialog"
                aria-labelledby="therapy-title"
                className="fixed inset-y-0 right-0 z-[70] w-full max-w-xl bg-white shadow-card outline-none flex flex-col"
            >
                {/* Shared hero image */}
                <div className="relative h-40 w-full">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-cover"
                        priority={false}
                    />
                    <button
                        aria-label="Close"
                        className="absolute right-3 top-3 rounded-md bg-white/90 px-3 py-1 text-sm shadow-card hover:bg-white
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-2)]"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-4">
                    <h3
                        id="therapy-title"
                        className="font-semibold"
                        style={{ color: "var(--color-brand-1)" }}
                    >
                        {therapy.name}
                    </h3>
                    <div className="text-xs text-slate-500">
                        {therapy.category} • {therapy.duration} • Price {therapy.price}
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto px-5 py-5 space-y-6">
                    <p className="text-slate-700">{therapy.long}</p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <InfoCard label="Type" value={therapy.type} />
                        <InfoCard label="Category" value={therapy.category} />
                        <InfoCard label="Typical duration" value={therapy.duration} />
                        <InfoCard label="Price band" value={therapy.price} />
                    </div>

                    {therapy.benefits?.length ? (
                        <div>
                            <h4 className="font-semibold">Benefits</h4>
                            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                                {therapy.benefits.map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {therapy.forWho?.length ? (
                        <div>
                            <h4 className="font-semibold">Who it’s for</h4>
                            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                                {therapy.forWho.map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {therapy.contraindications?.length ? (
                        <div>
                            <h4 className="font-semibold">Considerations</h4>
                            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                                {therapy.contraindications.map((c) => (
                                    <li key={c}>{c}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {/* Related Article Section */}
                    {therapy.related_article && therapy.related_article.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <h4 className="font-semibold mb-3 text-[#2E0056]">Related Article</h4>
                            <div className="w-full">
                                {therapy.related_article.map((blok) => (
                                    <StoryblokComponent key={blok._uid} blok={blok} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3 pt-2">
                        <Link href="/booking" className="btn btn-primary">
                            Book this therapy
                        </Link>
                        <a
                            className="btn btn-outline"
                            href="https://wa.me/447379005856"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

/* Small info chip used in the drawer */
function InfoCard({ label, value }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="text-xs text-slate-500">{label}</div>
            <div className="text-sm font-medium text-slate-800">{value}</div>
        </div>
    );
}
