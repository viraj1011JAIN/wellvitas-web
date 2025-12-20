"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import HomeTherapies from "../HomeTherapies";

export default function HomeTherapiesBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <HomeTherapies />
    </div>
  );
}
