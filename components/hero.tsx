"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { heroHouse } from "@/lib/assets";
import { useLocale } from "./locale-context";
import { SiteHeader } from "./site-header";
import { VideoCard } from "./video-card";
import { WordReveal } from "./word-reveal";

export function Hero() {
  const { t } = useLocale();
  const { hero } = t;

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__scrim" aria-hidden="true" />

      <Image
        className="hero__house"
        src={heroHouse.src}
        alt={hero.houseAlt}
        width={heroHouse.width}
        height={heroHouse.height}
        priority
        fetchPriority="high"
        quality={74}
        sizes="(max-width: 640px) 118vw, (max-width: 860px) 83vw, 83vw"
      />

      <SiteHeader />

      <div className="hero__head">
        <WordReveal
          as="h1"
          className="hero__h1"
          lines={hero.h1}
          startDelay={550}
          stagger={200}
          duration={1000}
        />

        <WordReveal
          as="p"
          className="hero__tagline"
          lines={hero.taglineLines}
          startDelay={1150}
          stagger={60}
          duration={700}
        />
      </div>

      <p className="sr-only">{hero.srSubtitle}</p>

      <a className="hero__explore" href={hero.exploreHref}>
        <WordReveal
          as="span"
          lines={[hero.explore]}
          startDelay={1850}
          duration={800}
        />
        <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
      </a>

      <VideoCard
        caption={hero.videoCaption}
        captionLines={hero.videoCaptionLines}
        liveLabel={hero.liveLabel}
        progressLabel={hero.progressLabel}
        partLabel={hero.partLabel}
      />
    </section>
  );
}
