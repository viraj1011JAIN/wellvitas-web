"use client";
import { storyblokEditable } from "@storyblok/react";
import HomeTherapies from "../HomeTherapies";

export default function HomeTherapiesBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <HomeTherapies />
    </div>
  );
}
