"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import BookingFlow from "@/components/BookingFlow";

export default function BookingFlowBlok({ blok }) {
    return (
        <section {...storyblokEditable(blok)} className="section mt-6">
            <BookingFlow />
        </section>
    );
}
