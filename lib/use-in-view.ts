"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** "load" fires right after hydration, "scroll" waits for the element to enter the viewport. */
  trigger?: "load" | "scroll";
  threshold?: number;
  once?: boolean;
};

export function useInView<T extends HTMLElement = HTMLDivElement>({
  trigger = "load",
  threshold = 0.15,
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (trigger === "load") {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger, threshold, once]);

  return { ref, inView } as const;
}
