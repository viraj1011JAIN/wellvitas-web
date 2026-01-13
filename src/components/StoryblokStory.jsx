"use client";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";

export default function StoryblokStory({ story }) {
    // Binds the story to the Storyblok Bridge for live updates
    const val = useStoryblokState(story);

    if (!val || !val.content) {
        return null;
    }

    // Renders the root component (usually "page") which then renders body blocks
    return <StoryblokComponent blok={val.content} />;
}
