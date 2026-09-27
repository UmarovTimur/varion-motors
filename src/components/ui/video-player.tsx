"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Video Player — not a Framer port: the Framer project has no video block, so
 * this is built from the project's own tokens (radius 16, Background Mid rail,
 * the 200/300ms ease-out pair) rather than a third-party skin, which would sit
 * badly next to the Cars Card and the Button.
 *
 * Deliberately a plain <video> with custom chrome: no dependency, and every
 * control stays a real button, so keyboard and screen readers work.
 *
 * Controls hide while the video plays and the pointer is idle; they are always
 * shown while paused, on hover, and whenever focus is inside the player.
 */

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

export function VideoPlayer({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster?: string;
  /** Describes the clip for assistive tech, e.g. the car name. */
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [idle, setIdle] = useState(false);
  const [started, setStarted] = useState(false);

  const wake = useCallback(() => {
    setIdle(false);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), 2500);
  }, []);

  useEffect(() => () => clearTimeout(idleTimer.current), []);

  /* Metadata can be ready before React attaches its listeners (the element is
   * server-rendered and the browser may have the file cached), and then
   * `durationchange` never reaches us — the scrubber would stay stuck at 0. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 1) return;
    setDuration(video.duration);
    setCurrent(video.currentTime);
    setMuted(video.muted);
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setStarted(true);
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const seekBy = useCallback((delta: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(
      Math.max(video.currentTime + delta, 0),
      video.duration || 0,
    );
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void frameRef.current?.requestFullscreen?.();
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    /* Let the controls keep their own Enter/Space semantics. */
    if (event.target !== event.currentTarget) return;
    const keys: Record<string, () => void> = {
      " ": toggle,
      k: toggle,
      ArrowRight: () => seekBy(5),
      ArrowLeft: () => seekBy(-5),
      m: () => {
        const video = videoRef.current;
        if (video) video.muted = !video.muted;
      },
      f: toggleFullscreen,
    };
    const action = keys[event.key];
    if (!action) return;
    event.preventDefault();
    wake();
    action();
  };

  const progress = duration ? (current / duration) * 100 : 0;
  const bufferedPct = duration ? (buffered / duration) * 100 : 0;
  const controlsHidden = playing && idle;

  return (
    <div
      ref={frameRef}
      role="region"
      aria-label={`Видео: ${label}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerMove={wake}
      onPointerLeave={() => playing && setIdle(true)}
      className={cn(
        "group relative isolate w-full overflow-hidden rounded-card bg-black",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        controlsHidden && "cursor-none",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
          wake();
        }}
        onPause={() => {
          setPlaying(false);
          setIdle(false);
        }}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setMuted(e.currentTarget.muted);
        }}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onProgress={(e) => {
          const v = e.currentTarget;
          if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
        }}
        className="aspect-video w-full cursor-pointer bg-black object-cover"
      />

      {/* Poster overlay — the big play target before the first play */}
      {!started ? (
        <button
          type="button"
          onClick={toggle}
          aria-label="Воспроизвести видео"
          className="absolute inset-0 z-(--z-content) grid place-items-center bg-black/25 transition-colors duration-(--dur-fast) ease-out hover:bg-black/35"
        >
          <span className="grid size-[72px] place-items-center rounded-icon bg-white text-black shadow-[inset_-10px_-10px_20px_0_rgb(0_0_0/0.08)] transition-transform duration-(--dur-base) ease-out group-hover:scale-105">
            <Play className="ml-0.5 size-6 fill-current" aria-hidden />
          </span>
        </button>
      ) : null}

      {/* Controls */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-(--z-content) flex flex-col gap-2 p-3 tablet:p-4",
          "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
          "transition-opacity duration-(--dur-base) ease-out",
          controlsHidden
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100",
          "group-focus-within:pointer-events-auto group-focus-within:opacity-100",
        )}
      >
        {/* Scrubber — a real range input, so drag and keyboard come for free */}
        <div className="relative flex h-4 w-full items-center">
          <span
            aria-hidden
            className="absolute inset-x-0 h-1 rounded-full bg-white/25"
          />
          <span
            aria-hidden
            className="absolute left-0 h-1 rounded-full bg-white/40"
            style={{ width: `${bufferedPct}%` }}
          />
          <span
            aria-hidden
            className="absolute left-0 h-1 rounded-full bg-paper"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            aria-label="Перемотка"
            onChange={(e) => {
              const video = videoRef.current;
              if (video) video.currentTime = Number(e.target.value);
            }}
            className={cn(
              "relative w-full cursor-pointer appearance-none bg-transparent",
              "[&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-paper",
              "[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-paper",
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <ControlButton
            onClick={toggle}
            label={playing ? "Пауза" : "Воспроизвести"}
          >
            {playing ? (
              <Pause className="size-4 fill-current" aria-hidden />
            ) : (
              <Play className="ml-0.5 size-4 fill-current" aria-hidden />
            )}
          </ControlButton>

          <ControlButton
            onClick={() => {
              const video = videoRef.current;
              if (video) video.muted = !video.muted;
            }}
            label={muted ? "Включить звук" : "Выключить звук"}
          >
            {muted ? (
              <VolumeX className="size-4" aria-hidden />
            ) : (
              <Volume2 className="size-4" aria-hidden />
            )}
          </ControlButton>

          <p className="text-body-xs text-white tabular-nums">
            {formatTime(current)}{" "}
            <span className="text-white/75">/ {formatTime(duration)}</span>
          </p>

          <ControlButton
            onClick={toggleFullscreen}
            label={fullscreen ? "Выйти из полноэкранного режима" : "Во весь экран"}
            className="ml-auto"
          >
            {fullscreen ? (
              <Minimize className="size-4" aria-hidden />
            ) : (
              <Maximize className="size-4" aria-hidden />
            )}
          </ControlButton>
        </div>
      </div>
    </div>
  );
}

/** The 40px square used by every control — the Arrow Icon's shape, sized down. */
function ControlButton({
  onClick,
  label,
  className,
  children,
}: {
  onClick: () => void;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-icon bg-white/10 text-white",
        "transition-colors duration-(--dur-fast) ease-out hover:bg-white/20",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      {children}
    </button>
  );
}
