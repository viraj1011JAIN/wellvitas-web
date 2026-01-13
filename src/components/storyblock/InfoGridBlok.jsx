"use client";
import { storyblokEditable, StoryblokComponent, renderRichText } from "@storyblok/react";

export default function InfoGridBlok({ blok }) {
    const cards = blok.cards || [];

    // Check if ANY card in this grid has an image (for alignment consistency)
    const anyCardHasImage = cards.some(card =>
        card.image?.filename || // Standard image field
        (card.icon && typeof card.icon === 'object' && card.icon.filename) // Legacy icon field
    );



    return (
        <section {...storyblokEditable(blok)} className="section">
            {(blok.title || blok.intro) && (
                <div className="mb-8 max-w-2xl">
                    {blok.title && <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--color-brand-1)" }}>{blok.title}</h2>}
                    {blok.intro && <p className="text-slate-600">{blok.intro}</p>}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-3">
                {cards.map((card) => {
                    if (card.component && card.component !== "info_card") {
                        return <StoryblokComponent key={card._uid} blok={card} hasSiblingWithImage={anyCardHasImage} />;
                    }

                    // Handle content: Check if referencing RichText (object) or Text Area (string)
                    let contentHtml = null;
                    let displayString = null;

                    if (card.content) {
                        if (typeof card.content === 'object' && card.content.type === 'doc') {
                            // Correct RichText object
                            try {
                                contentHtml = renderRichText(card.content);
                            } catch (e) {
                                console.warn("Failed to render rich text:", e);
                            }
                        } else if (typeof card.content === 'string') {
                            // Simple text string
                            displayString = card.content;
                        }
                    }

                    // Fallback to legacy 'text' field if nothing found yet
                    if (!contentHtml && !displayString) {
                        displayString = card.text;
                    }

                    // Variant styling
                    const isGlass = blok.variant === 'glass';
                    const isBordered = blok.variant === 'bordered';

                    let cardClass = "card p-6 hover-lift flex flex-col h-full"; // Default
                    if (isGlass) {
                        cardClass = "rounded-2xl border bg-white/80 p-4 shadow-card flex flex-col h-full transition-transform hover:-translate-y-0.5";
                    } else if (isBordered) {
                        cardClass = "rounded-2xl border bg-white p-5 flex flex-col h-full"; // No shadow, just border
                    }

                    // Icon Logic: Check if it's a real icon
                    const hasIcon = card.icon && (
                        (typeof card.icon === 'string' && card.icon.trim().length > 0) ||
                        (typeof card.icon === 'object' && card.icon.filename)
                    );

                    return (
                        <div
                            key={card._uid}
                            {...storyblokEditable(card)}
                            className={cardClass}
                        >
                            {/* Header: Icon + Title */}
                            <div className="flex items-center gap-4 mb-3">
                                {hasIcon && (
                                    <div
                                        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
                                        style={{ backgroundColor: "var(--color-brand-1-20)", color: "var(--color-brand-1)" }}
                                    >
                                        {typeof card.icon === 'object' ? (
                                            <img
                                                src={card.icon.filename}
                                                alt={card.icon.alt || ""}
                                                className="h-6 w-6 object-contain"
                                            />
                                        ) : (
                                            <span className="text-2xl">{card.icon}</span>
                                        )}
                                    </div>
                                )}
                                <h3 className="text-lg font-bold" style={{ color: "var(--color-brand-1)" }}>
                                    {card.title}
                                </h3>
                            </div>

                            <div className="text-sm text-slate-700 flex-grow rich-text">
                                {contentHtml ? (
                                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                                ) : (
                                    <p className="whitespace-pre-line">{displayString}</p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="mt-5 flex flex-wrap gap-2 pt-2">
                                {card.buttons && card.buttons.map(btn => (
                                    <StoryblokComponent key={btn._uid} blok={btn} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    );
}
