"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { heroVideoPoster, heroVideoSources } from "@/lib/assets";
import { WordReveal } from "./word-reveal";

type Props = {
  caption: string;
  captionLines: string[];
  liveLabel: string;
  progressLabel: string;
  partLabel: string;
};

const PARTS = 4;

export function VideoCard({
  caption,
  captionLines,
  liveLabel,
  progressLabel,
  partLabel,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(0);

  /* The clip must never stop: resume on pause/end/stall, every second,
     when the tab becomes visible again, and on the very first user gesture. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {
          /* autoplay blocked — the first tap / visibility listener will retry */
        });
      }
    };

    const resume = () => {
      if (video.ended) video.currentTime = 0;
      if (video.paused) play();
    };

    /* Start once the page has finished loading the critical hero image;
       from then on the clip is kept alive by the loop below. */
    let startTimer = 0;
    const scheduleStart = () => {
      window.clearTimeout(startTimer);
      startTimer = window.setTimeout(play, 350);
    };

    if (document.readyState === "complete") {
      scheduleStart();
    } else {
      window.addEventListener("load", scheduleStart, { once: true });
      /* Fallback for slow networks so the card is never a still frame. */
      startTimer = window.setTimeout(play, 2500);
    }

    const tick = window.setInterval(() => {
      if (document.visibilityState === "visible") resume();
    }, 1000);

    const onVisible = () => {
      if (document.visibilityState === "visible") resume();
    };

    const onFirstGesture = () => resume();

    document.addEventListener("visibilitychange", onVisible);
    video.addEventListener("stalled", resume);
    video.addEventListener("suspend", resume);
    video.addEventListener("ended", resume);
    video.addEventListener("error", () => video.load());
    document.addEventListener("pointerdown", onFirstGesture, {
      once: true,
      passive: true,
    });
    document.addEventListener("keydown", onFirstGesture, { once: true });

    return () => {
      window.clearTimeout(startTimer);
      window.removeEventListener("load", scheduleStart);
      window.clearInterval(tick);
      document.removeEventListener("visibilitychange", onVisible);
      video.removeEventListener("stalled", resume);
      video.removeEventListener("suspend", resume);
      video.removeEventListener("ended", resume);
      document.removeEventListener("pointerdown", onFirstGesture);
      document.removeEventListener("keydown", onFirstGesture);
    };
  }, []);

  /* Active bar follows the video, split into four equal parts. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = window.setInterval(() => {
      const duration = video.duration;
      if (!duration || !Number.isFinite(duration)) return;
      const ratio = video.currentTime / duration;
      const next = Math.min(PARTS - 1, Math.max(0, Math.floor(ratio * PARTS)));
      setActive((current) => (current === next ? current : next));
    }, 250);

    return () => window.clearInterval(tick);
  }, []);

  const jumpTo = useCallback((index: number) => {
    const video = videoRef.current;
    if (!video) return;
    const duration = video.duration;
    if (duration && Number.isFinite(duration)) {
      video.currentTime = (duration / PARTS) * index + 0.01;
    }
    setActive(index);
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
  }, []);

  return (
    <aside className="video-card" aria-label={caption}>
      <div className="video-card__frame">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={heroVideoPoster}
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        >
          {/* WebM first: VP9 plays everywhere, including browsers without H.264. */}
          {heroVideoSources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
        <span className="video-card__badge">
          <i aria-hidden="true" />
          {liveLabel}
        </span>
      </div>

      <WordReveal
        as="p"
        className="video-card__caption"
        lines={captionLines}
        startDelay={2150}
        stagger={60}
        duration={700}
      />

      <div className="bars" role="group" aria-label={progressLabel}>
        {Array.from({ length: PARTS }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`bar${index === active ? " is-active" : ""}`}
            aria-label={`${partLabel} ${index + 1}`}
            aria-pressed={index === active}
            onClick={() => jumpTo(index)}
          >
            <span className="bar__fill" />
          </button>
        ))}
      </div>
    </aside>
  );
}
