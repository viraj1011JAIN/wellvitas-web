import Link from "next/link";
import { renderRichText } from "@storyblok/react";

export default function Footer({ contact, navLinks, mapUrl }) {
  // Fallback Data
  const staticContact = {
    address: null, // Will default to static JSX if null
    email: "info@wellvitas.co.uk",
    phone: "+44 7379 005856"
  };

  const displayEmail = contact?.email || staticContact.email;
  const displayPhone = contact?.phone || staticContact.phone;
  const displayMapUrl = mapUrl || "https://www.google.com/maps?q=1626+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH&output=embed";

  // Render Address
  const renderAddress = () => {
    if (contact?.address) {
      // Rich Text
      if (typeof contact.address === 'object') {
        return <div dangerouslySetInnerHTML={{ __html: renderRichText(contact.address) }} />;
      }
      // Simple Text
      return <div className="whitespace-pre-line">{contact.address}</div>;
    }
    // Static Fallback
    return (
      <>
        <div>Wellvitas</div>
        <div>1626 Great Western Rd</div>
        <div>Anniesland, Glasgow G13 1HH</div>
        <div>Open 9:00–20:00</div>
      </>
    );
  };

  const links = navLinks || [];

  return (
    <>
      <footer
        id="footer"
        className="border-0"
        style={{
          background: "linear-gradient(135deg, #7E0054 0%, #2E0056 100%)",
          color: "#fff",
        }}
      >
        <div className="section pt-10 pb-12">
          <div
            className="grid gap-8 md:grid-cols-3 items-start"
            aria-labelledby="footer-heading"
            role="contentinfo"
          >
            <div>
              <h2 id="footer-heading" className="sr-only">
                Wellvitas footer
              </h2>
              <h3 className="font-bold text-white">Contact</h3>

              <address className="not-italic mt-3 text-sm space-y-1 font-semibold text-white rich-text">
                {renderAddress()}
              </address>

              <div className="mt-3 text-sm space-y-1 font-semibold">
                <a
                  className="block underline decoration-white/50 hover:decoration-white text-white"
                  href={`mailto:${displayEmail}`}
                >
                  {displayEmail}
                </a>
                <a
                  className="block underline decoration-white/50 hover:decoration-white text-white"
                  href={`tel:${displayPhone.replace(/\s+/g, '')}`}
                >
                  {displayPhone}
                </a>
              </div>
            </div>

            <nav aria-label="Quick links">
              <h3 className="font-bold text-white">Quick Links</h3>
              <ul className="mt-3 space-y-2 text-sm font-semibold">
                {links.map((l, i) => (
                  <li key={l.id || l.href || i}>
                    <Link
                      className="underline decoration-white/50 hover:decoration-white text-white"
                      href={l.href}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="font-bold text-white">Find Us</h3>
              <div id="footer-map" className="map-embed mt-3">
                <iframe
                  title="Wellvitas location"
                  src={displayMapUrl}
                  width="100%"
                  height="260"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </div>
              <div className="mt-3">
                <a
                  className="btn rounded-2xl border shadow-card transition-transform hover:-translate-y-0.5"
                  target="_blank"
                  rel="noreferrer"
                  href="https://maps.google.com/?q=1626+Great+Western+Rd,+Anniesland,+Glasgow+G13+1HH"
                  style={{
                    background: "var(--color-brand-2-40)",
                    color: "#2E0056",
                    borderColor: "#7E0054",
                  }}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs font-semibold text-white/80">
            © {new Date().getFullYear()} Wellvitas. All rights reserved.
          </p>
        </div>
      </footer >
    </>
  );
}