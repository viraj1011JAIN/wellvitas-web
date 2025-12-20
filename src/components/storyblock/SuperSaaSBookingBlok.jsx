// src/components/storyblock/SuperSaaSBookingBlok.jsx
"use client";

import BookingWidget from "../BookingWidget";

/**
 * SuperSaaS Booking Block
 * 
 * Renders the professional booking widget with loading states.
 * Uses the reusable BookingWidget component for consistent UX.
 * 
 * This is a wrapper that connects Storyblok CMS to the BookingWidget component.
 */
export default function SuperSaaSBookingBlok({ blok }) {
  return <BookingWidget blok={blok} />;
}
