"use client";
import { storyblokEditable } from "@storyblok/react";

export default function VideoBlok({ blok }) {
    const { provider, video_id, video_file } = blok;

    // 1. Handle Uploaded Video File
    if (video_file?.filename) {
        return (
            <div {...storyblokEditable(blok)} className="my-8 w-full">
                <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-card">
                    <video
                        src={video_file.filename}
                        controls
                        className="w-full h-auto"
                        preload="metadata"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        );
    }

    // 2. Handle YouTube / Vimeo Embeds
    let src = "";
    if (provider === "youtube") {
        // Simple parser to handle if user pastes full URL
        const id = video_id?.includes("v=") ? video_id.split("v=")[1].split("&")[0] : video_id;
        src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
    } else if (provider === "vimeo") {
        src = `https://player.vimeo.com/video/${video_id}?title=0&byline=0&portrait=0`;
    }

    if (!src) {
        return (
            <div {...storyblokEditable(blok)} className="my-8 w-full p-8 bg-gray-100 text-center text-gray-400 rounded-xl">
                Select a video file or enter a valid YouTube/Vimeo ID
            </div>
        );
    }

    return (
        <div {...storyblokEditable(blok)} className="my-8 w-full">
            <div className="relative w-full pb-[56.25%] bg-black rounded-xl overflow-hidden shadow-card">
                <iframe
                    src={src}
                    title="Video player"
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
}
