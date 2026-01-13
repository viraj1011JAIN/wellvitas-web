"use client";
import { storyblokEditable } from "@storyblok/react";
import OpenHoursBadge from "../OpenHoursBadge";

export default function OpenHoursBadgeBlok({ blok }) {
    return (
        <div {...storyblokEditable(blok)} className="inline-flex">
            <OpenHoursBadge />
        </div>
    );
}
