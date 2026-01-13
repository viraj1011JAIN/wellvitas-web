"use client";

import { useStoryblokState } from "@storyblok/react";
import IntroBandBlok from "./storyblock/IntroBandBlok";

export default function AboutHero({ initialStory, defaultHero }) {
    // Connect to Storyblok Bridge for live updates
    // If initialStory is null, we can't really live preview, so we just fall back.
    const story = useStoryblokState(initialStory || null);

    // Extract the hero block from the (potentially updated) story
    const heroBlok = story?.content?.body?.find(
        (b) => b.component === "intro_band"
    );

    return <IntroBandBlok blok={heroBlok || defaultHero} />;
}
