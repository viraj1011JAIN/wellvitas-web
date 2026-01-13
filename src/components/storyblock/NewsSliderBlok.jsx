"use client";
import { storyblokEditable } from "@storyblok/react/rsc";

export default function NewsSliderBlok({ blok }) {
  const { slides, title } = blok;

  return (
    <section {...storyblokEditable(blok)} className="news-slider py-12">
      <div className="container mx-auto">
        {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slides?.map((slide) => (
            <div
              key={slide._uid}
              {...storyblokEditable(slide)}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              {slide.image?.filename && (
                <img
                  src={slide.image.filename}
                  alt={slide.image.alt || slide.title || ''}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-4">
                {slide.title && <h3 className="text-xl font-bold mb-2">{slide.title}</h3>}
                {slide.caption && <p className="text-gray-600">{slide.caption}</p>}
                {/* Support for 'media_slide' structure if that's what's being passed */}
                {slide.link?.cached_url && (
                  <a href={slide.link.cached_url} className="text-purple-600 font-semibold mt-2 inline-block">Read more →</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
