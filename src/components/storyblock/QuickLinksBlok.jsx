import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";
import { StoryblokComponent } from "@storyblok/react";
import Link from "next/link";

export default function QuickLinksBlok({ blok }) {
    // Use passed blocks or fallback to empty array
    const cards = blok.cards || [];
    const isStrip = blok.layout === 'strip';

    // === STRIP LAYOUT (Quick Actions) ===
    if (isStrip) {
        return (
            <section {...storyblokEditable(blok)} className="section">
                <div
                    className="rounded-2xl p-4 md:p-5 grid gap-3 md:grid-cols-4 shadow-card"
                    style={{
                        background:
                            "linear-gradient(135deg, color-mix(in srgb, var(--color-brand-1) 10%, white), color-mix(in srgb, var(--color-brand-2) 8%, white))",
                    }}
                >
                    {cards.map((card) => {
                        const href = card.link?.url || (typeof card.link === 'string' ? card.link : "#");
                        const titleText = typeof card.title === "object" ? "" : card.title;

                        return (
                            <a
                                key={card._uid}
                                {...storyblokEditable(card)}
                                className="card p-4 flex items-center gap-3 hover-lift"
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noreferrer" : undefined}
                                aria-label={titleText}
                            >
                                <div
                                    className="grid h-10 w-10 place-items-center rounded-lg text-xl"
                                    style={{ background: "var(--color-brand-1-20)", color: "var(--color-brand-1)" }}
                                >
                                    {typeof card.icon === 'object' && card.icon?.filename ? (
                                        <img
                                            src={card.icon.filename}
                                            alt={card.icon.alt || ""}
                                            className="h-6 w-6 object-contain"
                                        />
                                    ) : (
                                        <span aria-hidden className="text-xl">
                                            {typeof card.icon === 'string' ? card.icon : "🌟"}
                                        </span>
                                    )}
                                </div>
                                <div className="font-medium" style={{ color: "var(--color-brand-1)" }}>
                                    {titleText}
                                </div>
                            </a>
                        );
                    })}
                </div>
            </section>
        );
    }

    // === GRID LAYOUT ===
    return (
        <section {...storyblokEditable(blok)} className="section">
            {blok.title && <h2 className="h-section">{blok.title}</h2>}
            {blok.intro && (
                <p className="mt-2 text-sm text-slate-600 max-w-prose">
                    {blok.intro}
                </p>
            )}

            <div className="mt-6 grid gap-6 md:grid-cols-3">
                {cards.map((card, i) => {
                    // Safe render for description (RichText or String)
                    let descHtml = null;
                    if (typeof card.description === "object" && card.description) {
                        descHtml = renderRichText(card.description);
                    }

                    // Safe render for Title (Force string)
                    const titleText = typeof card.title === "object" ? "" : card.title;

                    // Safe render for Label
                    const linkLabel = typeof card.link_label === "object" ? "Read more" : card.link_label;

                    return (
                        <div
                            key={card._uid}
                            {...storyblokEditable(card)}
                            className="hover-lift fade-up rounded-2xl p-6"
                            style={{
                                animationDelay: `${i * 80}ms`,
                                backgroundColor: card.bg_color || "var(--color-brand-2-40)",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="grid h-10 w-10 place-items-center rounded-lg overflow-hidden"
                                    style={{ backgroundColor: "rgba(255,255,255,0.6)", color: "#2E0056" }}
                                >
                                    {typeof card.icon === 'object' && card.icon?.filename ? (
                                        <img
                                            src={card.icon.filename}
                                            alt={card.icon.alt || ""}
                                            className="h-6 w-6 object-contain"
                                        />
                                    ) : (
                                        <span aria-hidden className="text-xl">
                                            {typeof card.icon === 'string' ? card.icon : "🌟"}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold" style={{ color: "#2E0056" }}>
                                    {titleText}
                                </h3>
                            </div>

                            <div className="mt-2 text-sm text-[color:#2E0056]">
                                {descHtml ? (
                                    <div dangerouslySetInnerHTML={{ __html: descHtml }} />
                                ) : (
                                    typeof card.description === 'string' ? <p>{card.description}</p> : null
                                )}
                            </div>

                            {/* Buttons: Support generic 'buttons' array OR legacy 'link' */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {card.buttons && card.buttons.length > 0 ? (
                                    card.buttons.map(btn => (
                                        <StoryblokComponent key={btn._uid} blok={btn} />
                                    ))
                                ) : (
                                    <Link
                                        href={card.link?.url || (typeof card.link === 'string' ? card.link : "#")}
                                        className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold"
                                        style={{ backgroundColor: "#7E0054", color: "#ffffff" }}
                                    >
                                        {typeof linkLabel === 'string' ? linkLabel : "Read more"} →
                                    </Link>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    );
}
