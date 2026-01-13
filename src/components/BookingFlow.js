"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

// --- Config (static-friendly) ---
const WHATSAPP_NUMBER = "447379005856";
const MAIL_TO = "info@wellvitas.co.uk";
const ADDRESS = "1620 Great Western Rd, Anniesland, Glasgow G13 1HH";
const LS_KEY = "wellvitas_booking_v2";

const THERAPY_OPTIONS = [
  "Hyperbaric Oxygen",
  "Light-based Therapies",
  "Laser Acupuncture",
  "PEMF Therapy",
  "Compression Therapy",
  "Physiotherapy",
  "Combined Programme",
];

const BASE_SLOTS = ["09:30", "11:00", "14:30", "16:00", "18:30"];

// --- Helpers ---
const pad2 = (n) => String(n).padStart(2, "0");
const normalizePhone = (v) => v.replace(/[^\d+]/g, "");
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function parseTimeOnDate(dateStr, timeHHMM) {
  if (!dateStr || !timeHHMM) return null;
  const [h, m] = timeHHMM.split(":").map((n) => parseInt(n, 10));
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(h, m, 0, 0);
  return d;
}

function dtToUTC(dt) {
  return (
    dt.getUTCFullYear() +
    pad2(dt.getUTCMonth() + 1) +
    pad2(dt.getUTCDate()) +
    "T" +
    pad2(dt.getUTCHours()) +
    pad2(dt.getUTCMinutes()) +
    pad2(dt.getUTCSeconds()) +
    "Z"
  );
}

function getAvailableTimeSlots(dateStr, base) {
  if (!dateStr) return [...base];
  const now = new Date();
  const selected = new Date(dateStr + "T00:00:00");
  const isToday =
    now.getFullYear() === selected.getFullYear() &&
    now.getMonth() === selected.getMonth() &&
    now.getDate() === selected.getDate();
  if (!isToday) return [...base];
  const cutoff = new Date(now.getTime() + 15 * 60 * 1000);
  return base.filter((hhmm) => {
    const dt = parseTimeOnDate(dateStr, hhmm);
    return dt && dt.getTime() > cutoff.getTime();
  });
}

function buildMessage(enq, scr, tas, prog) {
  const lines = [
    `Hello Wellvitas — I'd like to book.`,
    `Name: ${enq.name || "—"}`,
    `Email: ${enq.email || "—"}`,
    `Phone: ${normalizePhone(enq.phone) || "—"}`,
    `Contact: ${enq.preferredContact}`,
    `Therapies: ${enq.therapies.join(", ") || "TBC"}`,
    `Conditions: ${scr.conditions.join(", ") || "—"}`,
    scr.notes ? `Notes: ${scr.notes}` : "",
    `Taster: ${tas.date || "TBC"} ${tas.time || ""}`,
    `Programme: ${prog.package === "taster" ? "Taster only" : `${prog.package} sessions`} (${prog.payment})`,
  ].filter(Boolean);
  return lines.join("\n");
}

function buildICS(taster) {
  const start = taster.date && taster.time ? parseTimeOnDate(taster.date, taster.time) : null;
  if (!start) return null;
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wellvitas//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@wellvitas.co.uk`,
    `DTSTAMP:${dtToUTC(new Date())}`,
    `DTSTART:${dtToUTC(start)}`,
    `DTEND:${dtToUTC(end)}`,
    "SUMMARY:Wellvitas – Free Taster",
    `LOCATION:${ADDRESS}`,
    "DESCRIPTION:Free taster session booked via wellvitas.co.uk",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return ics;
}

function downloadICS(ics, filename = "wellvitas-taster.ics") {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function googleCalendarUrl(taster) {
  const start = taster.date && taster.time ? parseTimeOnDate(taster.date, taster.time) : null;
  if (!start) return "#";
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const text = encodeURIComponent("Wellvitas – Free Taster");
  const dates = `${dtToUTC(start)}/${dtToUTC(end)}`;
  const location = encodeURIComponent(ADDRESS);
  const details = encodeURIComponent("Free taster session booked via wellvitas.co.uk");
  return `${base}&text=${text}&dates=${dates}&location=${location}&details=${details}`;
}

function Stepper({ active }) {
  const STEPS = ["Enquiry", "Screening", "Taster", "Programme", "Review"];
  return (
    <ol className="hidden md:grid md:grid-cols-5 gap-2 mb-4">
      {STEPS.map((label, i) => {
        const done = i < active;
        const on = i === active;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className="grid h-8 w-8 place-items-center rounded-full border text-sm font-semibold"
              style={
                done
                  ? { background: "var(--color-brand-1)", color: "#fff", borderColor: "var(--color-brand-1)" }
                  : on
                    ? { color: "var(--color-brand-1)", borderColor: "var(--color-brand-1)" }
                    : {}
              }
            >
              {done ? "✓" : i + 1}
            </span>
            <span className={"text-sm " + (on ? "font-semibold" : "text-slate-600")}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Chips({ options, value, onToggle, ariaLabel }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={ariaLabel}>
      {options.map((t) => {
        const on = value.includes(t);
        return (
          <button
            key={t}
            type="button"
            aria-pressed={on}
            className={`chip ${on ? "chip-active" : ""}`}
            onClick={() => onToggle(t)}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export default function BookingFlow() {
  const initialFromStorage = () => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };
  const restored = initialFromStorage();

  const [step, setStep] = useState(restored?.step ?? 0);
  const [enquiry, setEnquiry] = useState(
    restored?.enquiry ?? { name: "", email: "", phone: "", preferredContact: "whatsapp", therapies: [] }
  );
  const [screening, setScreening] = useState(restored?.screening ?? { conditions: [], notes: "" });
  const [taster, setTaster] = useState(restored?.taster ?? { date: "", time: "" });
  const [programme, setProgramme] = useState(restored?.programme ?? { package: "taster", payment: "payg" });

  const [errors, setErrors] = useState([]);
  const [accepted, setAccepted] = useState(restored?.accepted ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [website, setWebsite] = useState("");
  const startedAtRef = useRef(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        LS_KEY,
        JSON.stringify({ step, enquiry, screening, taster, programme, accepted, savedAt: new Date().toISOString() })
      );
    } catch { }
  }, [step, enquiry, screening, taster, programme, accepted]);

  useEffect(() => {
    const u = new URL(window.location.href);
    const service = u.searchParams.get("service");
    const name = u.searchParams.get("name");
    const email = u.searchParams.get("email");
    const phone = u.searchParams.get("phone");

    setEnquiry((prev) => ({
      ...prev,
      name: name ?? prev.name,
      email: email ?? prev.email,
      phone: phone ?? prev.phone,
      therapies:
        service && THERAPY_OPTIONS.includes(service) && !prev.therapies.includes(service)
          ? [...prev.therapies, service]
          : prev.therapies,
    }));
  }, []);

  const progress = (step / 4) * 100;
  const price = useMemo(
    () => ({ taster: 0, "4": 180, "8": 320, "12": 450 }[programme.package]),
    [programme]
  );

  const slots = getAvailableTimeSlots(taster.date, BASE_SLOTS);

  useEffect(() => {
    if (!taster.date) return;
    if (!taster.time || !slots.includes(taster.time)) {
      const first = slots[0] || "";
      setTaster((prev) => ({ ...prev, time: first }));
    }
  }, [taster.date, taster.time, slots]);

  function validate() {
    const e = [];
    if (step === 0) {
      if (!enquiry.name.trim()) e.push("Enter your full name.");
      if (!isEmail(enquiry.email)) e.push("Enter a valid email.");
      if (!enquiry.phone.trim()) e.push("Enter your phone number.");
    }
    if (step === 2) {
      if (!taster.date) e.push("Choose a date for your taster.");
      if (!taster.time) e.push("Choose a time for your taster.");
    }
    if (step === 4 && !accepted) e.push("Please accept the contact & privacy notice.");
    return e;
  }

  function next() {
    const e = validate();
    setErrors(e);
    if (e.length) return;
    setStep((s) => Math.min(s + 1, 4));
    const y = (document.getElementById("booking-root")?.offsetTop || 0) - 24;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function back() {
    setErrors([]);
    setStep((s) => Math.max(s - 1, 0));
    const y = (document.getElementById("booking-root")?.offsetTop || 0) - 24;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function openWhatsApp(body) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function openMail(body) {
    const mailto =
      `mailto:${MAIL_TO}` +
      `?subject=${encodeURIComponent("Wellvitas booking enquiry")}` +
      `&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
  }

  async function handleSubmit() {
    const e = validate();
    setErrors(e);
    if (e.length) return;
    if (website.trim()) return;

    const elapsed = startedAtRef.current ? Date.now() - startedAtRef.current : 0;
    if (elapsed && elapsed < 10_000) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiry,
          screening,
          taster,
          programme,
          meta: {
            submittedAt: new Date().toISOString(),
            ua: navigator.userAgent,
          },
          website,
        }),
      });

      const result = await response.json();

      if (!result.ok) {
        setErrors(result.errors || ["Submission failed. Please try again."]);
        setSubmitting(false);
        return;
      }

      const body = buildMessage(enquiry, screening, taster, programme);
      openWhatsApp(body);

      setTimeout(() => {
        openMail(body);
        setSubmitting(false);
        setSubmitted(true);
        localStorage.removeItem(LS_KEY);
      }, 400);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors(["Network error. Please check your connection and try again."]);
      setSubmitting(false);
    }
  }

  function handleDownloadICS() {
    const ics = buildICS(taster);
    if (!ics) return;
    downloadICS(ics);
  }

  const googleCalHref = googleCalendarUrl(taster);

  if (submitted) {
    return (
      <div className="card p-6">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: "var(--color-brand-1)" }}>
            ✓
          </div>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "var(--color-brand-1)" }}>
              Thanks, {enquiry.name.split(" ")[0] || "there"}!
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              We've received your details. Add the taster to your calendar or message us on WhatsApp.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn btn-outline" onClick={handleDownloadICS}>
                Add to calendar (.ics)
              </button>
              <a className="btn btn-outline" href={googleCalHref} target="_blank" rel="noreferrer">
                Add to Google Calendar
              </a>
              <a
                className="btn btn-primary"
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  buildMessage(enquiry, screening, taster, programme)
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Send on WhatsApp
              </a>
              <Link className="btn btn-outline" href="/">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="booking-root" className="card p-0 md:p-6">
      <div className="md:hidden px-4 pt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full transition-[width]"
            style={{ width: `${progress}%`, background: "var(--color-brand-1)" }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-600">Step {step + 1} of 5</p>
      </div>

      <Stepper active={step} />

      <div className="p-4 md:p-0">
        {!!errors.length && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <p className="font-medium">Please fix the following:</p>
            <ul className="list-disc pl-5">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        )}

        <label className="sr-only">
          Website
          <input
            type="text"
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>

        {step === 0 && (
          <section className="space-y-6">
            <header className="glass inline-flex items-center gap-2 px-3 py-2">
              <span className="text-xl" aria-hidden>💬</span>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-brand-1)" }}>
                Make an enquiry
              </h2>
            </header>
            <p className="text-sm text-slate-600">
              Share your details and what you're interested in — we'll get back fast.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium" htmlFor="enq-name">Full name</label>
                <input
                  id="enq-name"
                  className="input mt-1"
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  value={enquiry.name}
                  onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="enq-email">Email</label>
                <input
                  id="enq-email"
                  className="input mt-1"
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  value={enquiry.email}
                  onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="enq-phone">Phone</label>
                <input
                  id="enq-phone"
                  className="input mt-1"
                  type="tel"
                  inputMode="tel"
                  placeholder="+44 …"
                  autoComplete="tel"
                  value={enquiry.phone}
                  onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                />
                <p className="help" id="phone-help">We'll only use this for your booking.</p>
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="enq-pref">Preferred contact</label>
                <select
                  id="enq-pref"
                  className="input mt-1"
                  value={enquiry.preferredContact}
                  onChange={(e) => setEnquiry({ ...enquiry, preferredContact: e.target.value })}
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Therapies you're interested in</label>
              <Chips
                options={THERAPY_OPTIONS}
                value={enquiry.therapies}
                onToggle={(v) =>
                  setEnquiry((prev) => ({
                    ...prev,
                    therapies: prev.therapies.includes(v)
                      ? prev.therapies.filter((x) => x !== v)
                      : [...prev.therapies, v],
                  }))
                }
                ariaLabel="Therapy selection"
              />
              <p className="help">Not sure yet? Pick a couple — you can change later.</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                We'll never share your details. See our <Link className="link" href="/privacy">privacy policy</Link>.
              </span>
              <button className="btn btn-primary" onClick={next}>Continue</button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="space-y-6">
            <header className="glass inline-flex items-center gap-2 px-3 py-2">
              <span className="text-xl" aria-hidden>🩺</span>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-brand-1)" }}>
                Health screening
              </h2>
            </header>
            <p className="text-sm text-slate-600">A quick check so we tailor recommendations safely.</p>

            <div>
              <label className="text-sm font-medium">Any relevant conditions?</label>
              <Chips
                options={[
                  "Back pain",
                  "Neck/shoulder pain",
                  "Sports injury",
                  "Arthritis",
                  "Post-surgery rehab",
                  "Stress/anxiety",
                  "Other",
                ]}
                value={screening.conditions}
                onToggle={(v) =>
                  setScreening((prev) => ({
                    ...prev,
                    conditions: prev.conditions.includes(v)
                      ? prev.conditions.filter((x) => x !== v)
                      : [...prev.conditions, v],
                  }))
                }
                ariaLabel="Health conditions"
              />
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="screen-notes">
                Notes (medications, goals, anything else)
              </label>
              <textarea
                id="screen-notes"
                className="textarea mt-1"
                rows={4}
                placeholder="Tell us anything useful…"
                value={screening.notes}
                onChange={(e) => setScreening({ ...screening, notes: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between">
              <button className="btn btn-outline" onClick={back}>Back</button>
              <button className="btn btn-primary" onClick={next}>Continue</button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-6">
            <header className="glass inline-flex items-center gap-2 px-3 py-2">
              <span className="text-xl" aria-hidden>✨</span>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-brand-1)" }}>
                Book your free taster
              </h2>
            </header>
            <p className="text-sm text-slate-600">Choose a 30-minute slot that works for you.</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium" htmlFor="t-date">Date</label>
                <input
                  id="t-date"
                  className="input mt-1"
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={taster.date}
                  onChange={(e) => setTaster({ ...taster, date: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Time</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {slots.length === 0 ? (
                    <span className="col-span-3 text-sm text-slate-500">
                      No slots left today — try another date.
                    </span>
                  ) : (
                    slots.map((t) => {
                      const on = taster.time === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          className={`chip ${on ? "chip-active" : ""}`}
                          onClick={() => setTaster({ ...taster, time: t })}
                        >
                          {t}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button className="btn btn-outline" onClick={back}>Back</button>
              <button className="btn btn-primary" onClick={next} disabled={!taster.date || !taster.time}>
                Continue
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-6">
            <header className="glass inline-flex items-center gap-2 px-3 py-2">
              <span className="text-xl" aria-hidden>📅</span>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-brand-1)" }}>
                Programme & payment
              </h2>
            </header>
            <p className="text-sm text-slate-600">Pick a bundle and how you'd like to pay.</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Package</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[
                    { v: "taster", label: "Just taster" },
                    { v: "4", label: "4 sessions" },
                    { v: "8", label: "8 sessions" },
                    { v: "12", label: "12 sessions" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      aria-pressed={programme.package === o.v}
                      className={`chip ${programme.package === o.v ? "chip-active" : ""}`}
                      onClick={() => setProgramme({ ...programme, package: o.v })}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Payment</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    { v: "payg", label: "Pay-as-you-go" },
                    { v: "plan", label: "Installment plan" },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      aria-pressed={programme.payment === o.v}
                      className={`chip ${programme.payment === o.v ? "chip-active" : ""}`}
                      onClick={() => setProgramme({ ...programme, payment: o.v })}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
              <p className="text-sm text-slate-600">
                <span className="font-medium">Estimated total:</span>{" "}
                {price > 0 ? <>£{price}{programme.payment === "plan" && " • monthly plan available"}</> : "Free taster"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Final pricing confirmed after your taster and clinical recommendation.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button className="btn btn-outline" onClick={back}>Back</button>
              <button className="btn btn-primary" onClick={next}>Continue</button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="space-y-6">
            <header className="glass inline-flex items-center gap-2 px-3 py-2">
              <span className="text-xl" aria-hidden>🌿</span>
              <h2 className="text-lg font-semibold" style={{ color: "var(--color-brand-1)" }}>
                Review & submit
              </h2>
            </header>
            <p className="text-sm text-slate-600">Check details. We'll confirm and get you started.</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                <h3 className="font-medium">Your details</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>{enquiry.name || "—"}</li>
                  <li>{enquiry.email || "—"}</li>
                  <li>{enquiry.phone || "—"}</li>
                  <li>Contact via {enquiry.preferredContact}</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                <h3 className="font-medium">Therapies & notes</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>
                    <span className="font-medium">Therapies:</span>{" "}
                    {enquiry.therapies.length ? enquiry.therapies.join(", ") : "TBC"}
                  </li>
                  <li>
                    <span className="font-medium">Conditions:</span>{" "}
                    {screening.conditions.length ? screening.conditions.join(", ") : "—"}
                  </li>
                </ul>
                {screening.notes && (
                  <p className="mt-2 text-sm text-slate-600">
                    <span className="font-medium">Notes:</span> {screening.notes}
                  </p>
                )}
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                <h3 className="font-medium">Taster</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {taster.date || "Date TBC"} at {taster.time || "Time TBC"}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
                <h3 className="font-medium">Programme</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {programme.package === "taster" ? "Taster only" : `${programme.package} sessions`} ·{" "}
                  {programme.payment === "plan" ? "Plan" : "Pay-as-you-go"}
                </p>
                <p className="text-sm text-slate-600">Estimate: {price > 0 ? `£${price}` : "Free"}</p>
              </div>
            </div>

            <label className="mt-2 flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
              <span className="text-slate-600">
                I agree to be contacted about my booking and I accept the{" "}
                <Link className="link" href="/privacy">privacy policy</Link>.
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <a
                className="btn btn-outline"
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  buildMessage(enquiry, screening, taster, programme)
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Send via WhatsApp
              </a>
              <a className="btn btn-outline" href={googleCalHref} target="_blank" rel="noreferrer">
                Add to Google Calendar
              </a>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleDownloadICS}
                disabled={!taster.date || !taster.time}
              >
                Add .ics
              </button>
              <button className="btn btn-primary ml-auto" onClick={handleSubmit} disabled={submitting || !accepted}>
                {submitting ? "Submitting…" : "Submit booking"}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  localStorage.removeItem(LS_KEY);
                  location.reload();
                }}
              >
                Reset form
              </button>
              <button type="button" className="btn btn-outline" onClick={() => window.print()}>
                Print summary
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}