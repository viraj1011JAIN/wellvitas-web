// src/components/storyblock/SuperSaaSBookingBlok.jsx
"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useEffect, useState } from "react";

export default function SuperSaaSBookingBlok({ blok }) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load SuperSaaS script
    if (typeof window !== "undefined" && !window.supersaas) {
      const script = document.createElement("script");
      script.src = "https://www.supersaas.com/schedule/all.js";
      script.async = true;
      script.onload = () => setLoading(false);
      document.body.appendChild(script);
    } else {
      setLoading(false);
    }
  }, []);

  // Extract SuperSaaS configuration from Storyblok
  const {
    account_name = "wellvitas",
    schedule_id,
    schedule_name,
    domain = "supersaas.com",
    show_title = true,
    custom_css,
    height = "600px",
    heading,
    description,
    background_color,
    text_color
  } = blok;

  if (!schedule_id) {
    return (
      <div {...storyblokEditable(blok)} style={{ padding: "2rem", textAlign: "center", background: "#fff3cd", border: "1px solid #ffc107" }}>
        <p style={{ margin: 0, color: "#856404" }}>
          ⚠️ SuperSaaS configuration required. Please set the Schedule ID in Storyblok.
        </p>
      </div>
    );
  }

  const bookingUrl = `https://${domain}/${account_name}.fss?schedule=${schedule_name || schedule_id}&header=${show_title ? "1" : "0"}`;

  return (
    <section 
      {...storyblokEditable(blok)} 
      className="booking-section"
      style={{
        padding: "3rem 1rem",
        backgroundColor: background_color || "#f9fafb",
      }}
    >
      <div className="container mx-auto max-w-6xl">
        {heading && (
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ color: text_color || "var(--color-brand-1)" }}
          >
            {heading}
          </h2>
        )}
        
        {description && (
          <div 
            className="text-center mb-8 text-lg"
            style={{ color: text_color || "#4b5563" }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {loading ? (
          <div className="flex items-center justify-center" style={{ minHeight: height }}>
            <div className="animate-pulse text-center">
              <div className="inline-block h-12 w-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p style={{ color: text_color || "#6b7280" }}>Loading booking system...</p>
            </div>
          </div>
        ) : (
          <div className="booking-widget" style={{ position: "relative", minHeight: height }}>
            <iframe
              src={bookingUrl}
              width="100%"
              height={height}
              frameBorder="0"
              scrolling="auto"
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              title={`Book appointment - ${heading || "Schedule"}`}
            />
            
            {custom_css && (
              <style dangerouslySetInnerHTML={{ __html: custom_css }} />
            )}
          </div>
        )}

        {/* Help text for admin */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
            <strong>Admin Note:</strong> SuperSaaS booking widget is configured with:
            <ul className="list-disc ml-5 mt-2">
              <li>Account: {account_name}</li>
              <li>Schedule ID: {schedule_id}</li>
              <li>Domain: {domain}</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
