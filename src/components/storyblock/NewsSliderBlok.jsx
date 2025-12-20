"use client";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function NewsSliderBlok({ blok }) {
  return (
    <section {...storyblokEditable(blok)} className="news-slider py-12">
      <div className="container mx-auto">
        {blok.title && <h2 className="text-3xl font-bold mb-8 text-center">{blok.title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blok.slides?.map((slide, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              {slide.image && (
                <img src={slide.image.filename} alt={slide.image.alt || ''} className="w-full h-64 object-cover" />
              )}
              {slide.caption && <p className="p-4">{slide.caption}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
