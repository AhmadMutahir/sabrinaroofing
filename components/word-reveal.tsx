"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "@/lib/use-in-view";

type Props = {
  /** One entry per forced line. Words inside a line wrap naturally. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  /** Inline flow (no block wrapper per line) for paragraphs that should wrap. */
  flow?: boolean;
  /** Delay before the first word, in ms. */
  startDelay?: number;
  /** Extra delay per word, in ms. */
  stagger?: number;
  /** Animation duration per word, in ms. */
  duration?: number;
  trigger?: "load" | "scroll";
  threshold?: number;
  /** Parent-controlled reveal state — keeps a section's words in sync with its cards. */
  active?: boolean;
  className?: string;
  lineClassName?: string;
  id?: string;
  style?: CSSProperties;
};

type WordVars = CSSProperties & {
  "--word-delay": string;
  "--word-dur": string;
};

export function WordReveal({
  lines,
  as = "p",
  flow = false,
  startDelay = 0,
  stagger = 60,
  duration = 700,
  trigger = "load",
  threshold = 0.15,
  active,
  className = "",
  lineClassName = "",
  id,
  style,
}: Props) {
  const { ref, inView } = useInView<HTMLElement>({ trigger, threshold });
  const shown = active ?? inView;
  const Tag = as as "p";
  let wordIndex = 0;

  /* Count words up front so we know when the cascade has finished. */
  const totalWords = lines.reduce(
    (sum, line) => sum + line.split(/\s+/).filter(Boolean).length,
    0,
  );
  const [settled, setSettled] = useState(false);
  const settledRef = useRef(false);

  useEffect(() => {
    if (!shown || settledRef.current) return;
    const total = startDelay + Math.max(0, totalWords - 1) * stagger + duration;
    const timer = window.setTimeout(() => {
      settledRef.current = true;
      setSettled(true);
    }, total + 60);
    return () => window.clearTimeout(timer);
  }, [shown, startDelay, stagger, duration, totalWords]);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`words${shown ? " is-in" : ""}${settled ? " is-settled" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={style}
    >
      {lines.map((line, lineIndex) => {
        const words = line.split(/\s+/).filter(Boolean);
        const content = words.map((word, i) => {
          const delay = startDelay + wordIndex * stagger;
          wordIndex += 1;
          return (
            <Fragment key={`${lineIndex}-${i}`}>
              <span
                className="word"
                style={
                  {
                    "--word-delay": `${delay}ms`,
                    "--word-dur": `${duration}ms`,
                  } as WordVars
                }
              >
                {word}
              </span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          );
        });

        if (flow) {
          return (
            <Fragment key={lineIndex}>
              {content}
              {lineIndex < lines.length - 1 ? " " : null}
            </Fragment>
          );
        }

        /* The trailing space keeps assistive tech and copy/paste from gluing
           words together across forced line breaks; block layout ignores it. */
        return (
          <Fragment key={lineIndex}>
            <span className={`word-line ${lineClassName}`}>{content}</span>{" "}
          </Fragment>
        );
      })}
    </Tag>
  );
}
