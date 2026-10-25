"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { House, Menu, X } from "lucide-react";
import { brand } from "@/lib/content";
import { useLocale, locales } from "./locale-context";
import { RoofMark } from "./roof-mark";

type DelayStyle = CSSProperties & { "--nav-delay": string };

const delay = (ms: number): DelayStyle => ({ "--nav-delay": `${ms}ms` });

export function SiteHeader() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  /* Close the drawer on Escape, on outside click and when we return to desktop. */
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 861px)");
    const onResize = () => mq.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onResize);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="header" ref={menuRef}>
      <a
        className="header__brand header__item"
        href="#top"
        style={delay(100)}
        aria-label={`${brand.name} — ${t.nav[0].label}`}
      >
        <RoofMark className="header__logo" />
        <span className="header__wordmark">Sabrina</span>
      </a>

      <nav className="header__nav" aria-label={t.navLabel}>
        {t.nav.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={`header__item pill${index === 0 ? " pill--active" : ""}`}
            style={delay(200 + index * 80)}
            aria-current={index === 0 ? "page" : undefined}
          >
            {item.icon ? <House size={15} strokeWidth={2} aria-hidden="true" /> : null}
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header__tools">
        <div
          className="lang header__item"
          style={delay(520)}
          role="group"
          aria-label={t.langLabel}
        >
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              className="lang__btn"
              aria-pressed={locale === code}
              onClick={() => setLocale(code)}
            >
              <span className="sr-only">{t.langLabel}: </span>
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        <a
          className="cta-ghost cta-ghost--desktop header__item"
          href="#quote"
          style={delay(600)}
        >
          {t.cta}
        </a>

        <button
          type="button"
          className="burger header__item"
          style={delay(650)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <div className="mobile-menu" id="mobile-menu">
          {t.nav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={index === 0 ? "is-active" : undefined}
              aria-current={index === 0 ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.icon ? (
                <House size={15} strokeWidth={2} aria-hidden="true" />
              ) : null}
              {item.label}
            </a>
          ))}
          <a href="#quote" onClick={() => setOpen(false)}>
            {t.cta}
          </a>
        </div>
      ) : null}
    </header>
  );
}
