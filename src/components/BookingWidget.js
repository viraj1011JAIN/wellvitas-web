"use client";

import { useState } from 'react';
import { storyblokEditable } from "@storyblok/react";

export default function BookingWidget({ blok }) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Build SuperSaaS URL
  const supersaasUrl = `https://www.supersaas.com/schedule/${blok.account_name || 'wellvitas'}/${blok.schedule_id || 'Therapies'}`;

  return (
    <section 
      {...storyblokEditable(blok)}
      className="w-full py-12 px-4"
      style={{ 
        backgroundColor: blok.background_color || '#f9fafb',
        color: blok.text_color || '#333333'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        {blok.heading && (
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {blok.heading}
            </h2>
            {blok.description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {blok.description}
              </p>
            )}
          </div>
        )}

        {/* Professional Booking Widget Container */}
        <div className="w-full min-h-[600px] relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* 1. Professional Loading State (Skeleton) */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white z-10">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-purple-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading booking calendar...</p>
            </div>
          )}

          {/* 2. Responsive Iframe */}
          <iframe
            src={supersaasUrl}
            width="100%"
            height={blok.height || 800}
            className="w-full border-none"
            style={{ 
              height: `${blok.height || 800}px`,
              minHeight: '600px'
            }}
            onLoad={() => setIsLoading(false)} // Hide loader when ready
            title="Book Your Appointment"
            loading="lazy"
          ></iframe>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔒 Your booking is secure and confidential</p>
        </div>
      </div>
    </section>
  );
}
