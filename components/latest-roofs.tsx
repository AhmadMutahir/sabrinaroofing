"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLocale } from "./locale-context";
import { useInView } from "@/lib/use-in-view";
import { WordReveal } from "./word-reveal";

type CardStyle = CSSProperties & { "--card-delay": string };

export function LatestRoofs() {
  const { t } = useLocale();
  const { latest } = t;
  const { ref, inView } = useInView<HTMLElement>({ trigger: "scroll", threshold: 0.15 });

  return (
    <section
      className={`latest${inView ? " is-in" : ""}`}
      id="projects"
      ref={ref as never}
      aria-labelledby="latest-title"
    >
      <WordReveal
        as="h2"
        className="latest__heading"
        lines={latest.heading}
        active={inView}
        startDelay={0}
        stagger={150}
        duration={900}
        id="latest-title"
      />

      {/* tabIndex makes the horizontally scrollable row reachable and
          arrow-key scrollable for keyboard users on small screens. */}
      <div
        className="latest__gallery"
        role="group"
        aria-label={latest.galleryLabel}
        tabIndex={0}
      >
        {latest.cards.map((card, index) => (
          <figure
            key={card.src}
            className="latest__card"
            style={{ "--card-delay": `${200 + index * 150}ms` } as CardStyle}
          >
            <Image
              src={card.src}
              alt={card.alt}
              width={card.width}
              height={card.height}
              quality={74}
              sizes="(max-width: 860px) 74vw, (max-width: 1200px) 28vw, 24vw"
              loading="lazy"
            />
            <figcaption>
              <strong>{card.title}</strong>
              <span>
                {card.detail} · {card.meta}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
