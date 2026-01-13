"use client";

import Link from "next/link";
import BookingFlow from "@/components/BookingFlow";
import OpenHoursBadge from "@/components/OpenHoursBadge";

export default function BookingPage() {
  return (
    <main className="section">
      {/* Hero */}
      <header
        className="rounded-2xl p-6 md:p-10 shadow-card relative overflow-hidden"
        style={{ background: "#2E0056" }}
      >
        <div className="relative z-10">
          <p className="text-xs md:text-sm text-white">Wellvitas · Glasgow</p>
          <h1 className="mt-1 text-2xl md:text-4xl font-bold text-white">Book your visit</h1>
          <p className="mt-2 max-w-2xl text-white">
            Share a few details, pick a taster time, and we’ll confirm fast. No payment needed today.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <OpenHoursBadge />
            <Link
              href="https://wa.me/447379005856"
              className="btn rounded-2xl border shadow-card transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--color-brand-2-40)", color: "#2E0056", borderColor: "#7E0054" }}
            >
              WhatsApp us
            </Link>
          </div>
        </div>
        {/* solid color hero (no overlay) */}
      </header>

      {/* Flow */}
      <section className="mt-6">
        <BookingFlow />
      </section>

      {/* Help / smallprint */}
      <aside className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white/80 p-4 shadow-card">
          <h3 className="font-semibold" style={{ color: "var(--color-brand-1)" }}>What happens next?</h3>
          <p className="mt-1 text-sm text-slate-600">
            We’ll review your details and confirm your taster by phone or WhatsApp.
          </p>
        </div>
        <div className="rounded-2xl border bg-white/80 p-4 shadow-card">
          <h3 className="font-semibold" style={{ color: "var(--color-brand-1)" }}>Where we are</h3>
          <p className="mt-1 text-sm text-slate-600">
            1626 Great Western Rd, Anniesland, Glasgow G13 1HH
          </p>
        </div>
        <div className="rounded-2xl border bg-white/80 p-4 shadow-card">
          <h3 className="font-semibold" style={{ color: "var(--color-brand-1)" }}>Privacy</h3>
          <p className="mt-1 text-sm text-slate-600">
            We only use your details for your booking. See our{" "}
            <Link className="link underline" href="/privacy">privacy policy</Link>.
          </p>
        </div>
      </aside>
    </main>
  );
}
