/**
 * Asset sources.
 *
 * The workspace build is fully self-hosted (`public/`), which is what the
 * Lighthouse/axe audits were run against. When deploying source-only to
 * Vercel (no binary upload), set NEXT_PUBLIC_REMOTE_ASSETS=1 and the large
 * media falls back to the original CDN — Vercel's image optimizer then
 * transcodes and caches it at the edge, so visitors still get small AVIF/WebP.
 */
const remote = process.env.NEXT_PUBLIC_REMOTE_ASSETS === "1";

const CDN = "https://cdn.sceneai.art";

export const heroHouse = remote
  ? {
      src: `${CDN}/Bg%20images/1dd58514-cedb-4f70-9aee-709c3f887808.png`,
      width: 4038,
      height: 2694,
      remote: true,
    }
  : {
      src: "/images/hero-house.webp",
      width: 2400,
      height: 1601,
      remote: false,
    };

export const heroVideoSources = remote
  ? [{ src: `${CDN}/Hero%20Section%20Video/adec243d-ffda-48cf-a8a8-26e6d6bcbe9b.mp4`, type: "video/mp4" }]
  : [
      { src: "/media/hero.webm", type: "video/webm" },
      { src: "/media/hero.mp4", type: "video/mp4" },
    ];

export const heroVideoPoster: string | undefined = remote
  ? undefined
  : "/media/hero-poster.jpg";
