"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Link from "next/link";

export default function HowToBookBlok({ blok }) {
  return (
    <section {...storyblokEditable(blok)} className="section">
      <div
        className="rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-card"
        style={{ backgroundColor: "#2E0056" }}
      >
        <div>
          <h2 className="text-xl font-semibold text-white">
            {blok.heading || "How to book"}
          </h2>
          <p className="mt-1 text-sm text-white/85">
            {blok.description || "Make an enquiry, complete the health screening, enjoy a free taster treatment, then start your programme."}
          </p>
        </div>

        <div className="flex gap-3">
          <a
            className="btn rounded-2xl border shadow-card transition-transform hover:-translate-y-0.5"
            href={blok.whatsapp_url || "https://wa.me/447379005856"}
            target="_blank"
            rel="noreferrer"
            aria-label="Open WhatsApp chat"
            style={{
              background: "var(--color-brand-2-40)",
              color: "#2E0056",
              borderColor: "#7E0054",
            }}
          >
            {blok.whatsapp_text || "WhatsApp us"}
          </a>

          <Link
            className="btn rounded-2xl border shadow-card transition-transform hover:-translate-y-0.5"
            href={blok.booking_url || "/booking"}
            aria-label="Open booking form"
            style={{
              background: "var(--color-brand-2-40)",
              color: "#2E0056",
              borderColor: "#7E0054",
            }}
          >
            {blok.booking_text || "Booking form"}
          </Link>
        </div>
      </div>
    </section>
  );
}
