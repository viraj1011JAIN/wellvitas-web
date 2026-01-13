import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

const PACKAGES = [
  {
    title: "Pain Relief Bundle",
    price: 149,
    period: "/ 4 weeks",
    href: "/therapies#pain-relief-bundle",
    img: "/therapies/physio.jpg",
    badge: "Save 15%",
    features: ["4 × targeted sessions", "Home mobility plan", "Progress review"],
  },
  {
    title: "Stress Reset (4 Sessions)",
    price: 179,
    period: "/ course",
    href: "/therapies#stress-reset",
    img: "/therapies/light.jpg",
    badge: "Popular",
    features: ["4 × recovery sessions", "Breathing + sleep guide", "WhatsApp check-ins"],
  },
  {
    title: "Detox & Lymphatic Pack",
    price: 199,
    period: "/ 6 weeks",
    href: "/therapies#detox-lymph",
    img: "/therapies/compression.jpg",
    badge: "Best value",
    features: ["Compression & lymphatic", "Nutrition reset guide", "Before/after measures"],
  },
  {
    title: "Sports Recovery Plan",
    price: 229,
    period: "/ 4 weeks",
    href: "/therapies#sports-recovery",
    img: "/therapies/laser-acu.jpg",
    features: ["4 × recovery sessions", "Prehab/rehab drills", "Coach notes & load plan"],
  },
];

export default function TreatmentPackagesScroller({ items, title }) {
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const hoveringRef = useRef(false);

  const packages = items || PACKAGES;
  const sectionTitle = title || "Treatment Packages";

  // Auto-glide (pause on hover/focus; respect reduced motion)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const step = () => {
      if (!el || hoveringRef.current) return;
      const cards = Array.from(el.querySelectorAll("[data-card]"));
      if (!cards.length) return;
      const current = el.scrollLeft;
      const next = cards.find((c) => c.offsetLeft > current + 10) ?? cards[0];
      el.scrollTo({ left: next.offsetLeft, behavior: prefersReduced ? "auto" : "smooth" });
    };

    const stop = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const start = () => {
      if (prefersReduced) return;
      stop();
      timerRef.current = window.setInterval(step, 4200);
    };

    start();

    const onEnter = () => {
      hoveringRef.current = true;
      stop();
    };
    const onLeave = () => {
      hoveringRef.current = false;
      start();
    };
    const onFocus = () => stop();
    const onBlur = () => start();

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("focusin", onFocus);
    el.addEventListener("focusout", onBlur);

    return () => {
      stop();
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("focusin", onFocus);
      el.removeEventListener("focusout", onBlur);
    };
  }, [packages]); // Re-run if packages change

  const nudge = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll("[data-card]"));
    const current = el.scrollLeft;
    const target =
      dir === 1
        ? cards.find((c) => c.offsetLeft > current + 10) ?? cards[0]
        : [...cards].reverse().find((c) => c.offsetLeft < current - 10) ?? cards[cards.length - 1];
    el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="treatment-packages-heading"
      className="w-full relative border-t"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, #2E0056 6%, white), color-mix(in srgb, #7E0054 6%, white))",
        borderColor: "color-mix(in srgb, #7E0054 30%, transparent)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 id="treatment-packages-heading" className="text-2xl md:text-3xl font-bold" style={{ color: "#2E0056" }}>
            {sectionTitle}
          </h2>

          <div className="hidden md:flex gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => nudge(-1)}
              className="rounded-2xl px-3 py-2 border text-sm font-semibold shadow-card transition-transform hover:-translate-y-0.5 focus-visible:outline-none"
              style={{ background: "var(--color-brand-2-40)", color: "#2E0056", borderColor: "#7E0054" }}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => nudge(1)}
              className="rounded-2xl px-3 py-2 border text-sm font-semibold shadow-card transition-transform hover:-translate-y-0.5 focus-visible:outline-none"
              style={{ background: "var(--color-brand-2-40)", color: "#2E0056", borderColor: "#7E0054" }}
            >
              →
            </button>
          </div>
        </div>

        <div className="relative">
          {/* edge fades */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16"
            style={{ background: "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0))" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16"
            style={{ background: "linear-gradient(to left, rgba(255,255,255,0.9), rgba(255,255,255,0))" }}
          />

          {/* track */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3"
            style={{ scrollbarWidth: "thin" }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Treatment packages"
          >
            {packages.map((pkg, i) => (
              <article
                key={i}
                data-card
                {...(pkg.original ? storyblokEditable(pkg.original) : {})}
                className="shrink-0 snap-start rounded-2xl border-2 shadow-sm overflow-hidden"
                style={{
                  background: "color-mix(in srgb, #2E0056 8%, white)",
                  borderColor: "#2E0056",
                  width: "86vw",
                  maxWidth: "520px",
                }}
                tabIndex={0}
              >
                {/* image */}
                <div className="relative aspect-[16/10] bg-slate-200">
                  {pkg.img ? (
                    <Image
                      src={pkg.img}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}
                  {pkg.badge ? (
                    <span
                      className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow-card"
                      style={{ background: "#fff", color: "#7E0054", border: "1px solid #7E0054" }}
                    >
                      {pkg.badge}
                    </span>
                  ) : null}
                </div>

                {/* content */}
                <div className="p-5">
                  <h3 className="text-lg font-extrabold mb-1" style={{ color: "#2E0056" }}>
                    {pkg.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-black" style={{ color: "#2E0056" }}>
                      £{pkg.price}
                    </span>
                    <span className="text-xs font-semibold opacity-70" style={{ color: "#2E0056" }}>
                      {pkg.period}
                    </span>
                  </div>

                  <ul className="text-sm space-y-2 mb-4">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden="true" className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#7E0054" }} />
                        <span style={{ color: "#2E0056" }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={pkg.href}
                    className="inline-flex items-center justify-center rounded-2xl border px-4 py-2 font-semibold shadow-card transition-transform hover:-translate-y-0.5"
                    style={{ background: "var(--color-brand-2-40)", color: "#2E0056", borderColor: "#7E0054" }}
                  >
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
