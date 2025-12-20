"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import TreatmentPackagesScroller from "../TreatmentPackagesScroller";

export default function PackagesSectionBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <TreatmentPackagesScroller />
    </div>
  );
}
