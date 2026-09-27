"use client";

import { useEffect, useRef } from "react";

/**
 * Background video. iOS Safari shows a native play button over any video whose
 * autoplay was refused (Low Power Mode, or `muted` not applied as an attribute
 * before load). The button is hidden in globals.css, and playback is retried
 * from script and on the first touch so the video still starts; the poster
 * covers the frame in the meantime.
 */
export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const play = () => void video.play().catch(() => {});
    play();
    window.addEventListener("touchstart", play, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", play);
  }, []);

  return (
    <video
      ref={ref}
      src="/media/hero.mp4"
      poster="/media/hero.webp"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      aria-hidden
      className={className}
    />
  );
}
