"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/therapies", label: "Therapies" },
  { href: "/booking", label: "Booking" },
  { href: "/visit-us", label: "Visit Us" },
];

export default function Header({ logo, navLinks }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Fallback to empty if not provided (manual management)
  const navigation = navLinks || [];
  const logoUrl = logo?.filename || "/logo.png";
  const logoAlt = logo?.alt || "Wellvitas";

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className="sticky top-0 z-50 header-teal-underline"
      style={{ background: "linear-gradient(135deg, #7E0054 0%, #2E0056 100%)" }}
    >
      <style jsx global>{`
        .header-teal-underline .nav-link::after {
          background: linear-gradient(90deg, #005763 0%, #00AFC1 100%);
        }
      `}</style>

      <div className="container flex items-center justify-between gap-4 py-4 md:py-5">
        <Link href="/" aria-label="Wellvitas home" className="shrink-0 flex items-center">
          {logo?.filename ? (
            <img
              src={logoUrl}
              alt={logoAlt}
              className="h-9 w-auto md:h-10 object-contain"
            />
          ) : (
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={180}
              height={40}
              priority
              className="h-9 w-auto md:h-10"
              sizes="(min-width: 768px) 180px, 148px"
            />
          )}
          <span className="sr-only">Wellvitas</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((l) => {
            const on = pathname === l.href;
            return (
              <Link
                key={l.id || l.href}
                href={l.href}
                className={`nav-link font-semibold ${on ? "nav-link--on" : ""}`}
                style={{ color: "#ffffff" }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label="Open menu"
          className="md:hidden rounded-md border border-white/30 px-3 py-2 text-sm text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {open && (
        <>
          <button
            aria-label="Close menu overlay"
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-y-0 right-0 z-[70] w-64 max-w-[86vw] p-5 shadow-card animate-in slide-in-from-right duration-200"
            style={{ background: "linear-gradient(180deg, #7E0054 0%, #2E0056 100%)", color: "#ffffff" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                className="rounded-md border border-white/30 px-3 py-1 text-sm hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <ul className="mt-4 space-y-2">
              {navigation.map((l) => {
                const on = pathname === l.href;
                return (
                  <li key={l.id || l.href}>
                    <Link
                      href={l.href}
                      className={`block rounded-lg px-3 py-2 transition text-white hover:bg-white/10 ${on ? "ring-1 ring-white/30" : ""}`}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}