"use client";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const PageBlok = ({ blok }) => (
  <main {...storyblokEditable(blok)}>
    {(blok.page || blok.body || [])
      .filter((nestedBlok) => nestedBlok.component)
      .map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
  </main>
);

export default PageBlok;
