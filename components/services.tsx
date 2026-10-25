"use client";

import type { CSSProperties } from "react";
import { CloudLightning, Hammer, ShieldCheck, Wrench } from "lucide-react";
import { useLocale } from "./locale-context";
import { useInView } from "@/lib/use-in-view";
import { WordReveal } from "./word-reveal";

type CardStyle = CSSProperties & { "--card-delay": string };

const icons = [Hammer, CloudLightning, Wrench, ShieldCheck];

export function Services() {
  const { t } = useLocale();
  const { services } = t;
  const { ref, inView } = useInView<HTMLElement>({ trigger: "scroll", threshold: 0.12 });

  return (
    <section
      className={`services section-ink${inView ? " is-in" : ""}`}
      id="services"
      ref={ref as never}
      aria-labelledby="services-title"
    >
      <div className="services__inner">
        <p className="eyebrow">{services.eyebrow}</p>

        <WordReveal
          as="h2"
          className="services__title"
          lines={[services.title]}
          active={inView}
          startDelay={80}
          stagger={55}
          duration={800}
          id="services-title"
        />

        <p className="services__lede">{services.lede}</p>

        <ul className="services__grid">
          {services.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <li
                key={item.title}
                className="service"
                style={{ "--card-delay": `${index * 110}ms` } as CardStyle}
              >
                <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="service__meta">{item.meta}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
