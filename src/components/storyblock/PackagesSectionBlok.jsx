"use client";
import { storyblokEditable } from "@storyblok/react";
import TreatmentPackagesScroller from "../TreatmentPackagesScroller";

export default function PackagesSectionBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <TreatmentPackagesScroller />
    </div>
  );
}
