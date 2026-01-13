"use client";
import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";

export default function FaqGridBlok({ blok }) {
    const items = blok.items || [];

    return (
        <section {...storyblokEditable(blok)} className="section">
            {blok.title && (
                <h2 className="text-xl md:text-2xl font-semibold mb-6" style={{ color: "var(--color-brand-1)" }}>
                    {blok.title}
                </h2>
            )}

            <div className="grid gap-3 md:grid-cols-2">
                {items.map((item) => {
                    // Robust content rendering for Answer
                    let answerHtml = null;
                    let displayString = null;

                    if (item.answer) {
                        if (typeof item.answer === 'object' && item.answer.type === 'doc') {
                            try {
                                answerHtml = renderRichText(item.answer);
                            } catch (e) {
                                console.warn("FAQ Render Error:", e);
                            }
                        } else if (typeof item.answer === 'string') {
                            displayString = item.answer;
                        }
                    }

                    return (
                        <details
                            key={item._uid}
                            {...storyblokEditable(item)}
                            className="card p-5 hover-lift group"
                        >
                            <summary className="cursor-pointer font-medium list-none flex items-center gap-3" style={{ color: "var(--color-brand-1)" }}>
                                <span className="text-xs transition-transform group-open:rotate-90">▶</span>
                                <span>{item.question}</span>
                            </summary>
                            <div className="mt-2 pl-6 text-sm text-slate-700 rich-text">
                                {answerHtml ? (
                                    <div dangerouslySetInnerHTML={{ __html: answerHtml }} />
                                ) : (
                                    <p className="whitespace-pre-line">{displayString}</p>
                                )}
                            </div>
                        </details>
                    );
                })}
            </div>
        </section>
    );
}
