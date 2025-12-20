"use client";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function IntroBandBlok({ blok }) {
  return (
    <section {...storyblokEditable(blok)} className="intro-band" style={{ background: 'var(--color-accent)', padding: '3rem 1rem', textAlign: 'center', color: 'white' }}>
      <div className="container mx-auto max-w-6xl">
        {blok.heading && <h2 className="text-3xl font-bold mb-4">{blok.heading}</h2>}
        {blok.subtext && <p className="text-lg mb-6">{blok.subtext}</p>}
        {blok.ctas && (
          <div className="flex gap-4 justify-center flex-wrap">
            {blok.ctas.map((cta, index) => (
              <a key={index} href={cta.url} className="px-6 py-3 bg-white text-purple-900 rounded-md font-semibold hover:bg-gray-100">
                {cta.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
