"use client";

import { useEffect } from "react";
import { storyblokInit, apiPlugin } from "@storyblok/react";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu",
  },
});

export default function StoryblokProvider({ children }) {
  useEffect(() => {
    // Initialize Storyblok Bridge for Visual Editor
    if (typeof window !== "undefined" && window.storyblok) {
      window.storyblok.init({
        accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
      });

      window.storyblok.on(["input", "published", "change"], () => {
        window.location.reload();
      });
    }
  }, []);

  return <>{children}</>;
}