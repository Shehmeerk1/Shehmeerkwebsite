"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Video embed for articles. Usage in MDX:
 *   <Video youtube="VIDEO_ID" title="What the video is" />
 *   <Video vimeo="VIDEO_ID" title="What the video is" />
 * Nothing loads from the video host until the visitor presses play.
 * With no id it renders a reserved frame, so a draft can hold the place.
 */
export function Video({ youtube, vimeo, title = "Video" }: { youtube?: string; vimeo?: string; title?: string }) {
  const [playing, setPlaying] = useState(false);
  const src = youtube ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtube)}?autoplay=1&rel=0` : vimeo ? `https://player.vimeo.com/video/${encodeURIComponent(vimeo)}?autoplay=1&dnt=1` : null;

  return (
    <figure className="not-prose my-10">
      <div className="relative aspect-video overflow-hidden bg-[#0f0e0c] text-[#f3f0ea]">
        {src && playing ? (
          <iframe src={src} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
        ) : src ? (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 flex flex-col items-center justify-center gap-5">
            <span className="flex size-20 items-center justify-center rounded-full border border-white/50 transition-[background-color,color,transform] duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-[#0f0e0c]">
              <Play className="size-6 translate-x-0.5" aria-hidden />
            </span>
            <span className="t-label font-sans">Play: {title}</span>
          </button>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 border border-dashed border-white/30">
            <span className="flex size-20 items-center justify-center rounded-full border border-white/30">
              <Play className="size-6 translate-x-0.5 opacity-50" aria-hidden />
            </span>
            <span className="font-serif text-lg italic text-[#f3f0ea]/70">Video to come: {title}</span>
          </div>
        )}
      </div>
    </figure>
  );
}
