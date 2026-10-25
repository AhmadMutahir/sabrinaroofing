"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { brand } from "@/lib/content";
import { useLocale } from "./locale-context";
import { RoofMark } from "./roof-mark";

export function SiteFooter() {
  const { t } = useLocale();
  const { footer, nav, services } = t;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top" id="quote">
          <div>
            <p className="eyebrow eyebrow--chip">
              {brand.city}, {brand.state}
            </p>
            <h2 className="footer__title">{footer.title}</h2>
          </div>

          <div className="footer__actions">
            <a className="btn-solid" href={brand.phoneHref}>
              <Phone size={16} strokeWidth={2} aria-hidden="true" />
              {brand.phone}
            </a>
            <a className="cta-ghost" href={`mailto:${brand.email}`}>
              {footer.email}
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer__grid">
          <div>
            <div className="footer__brand-row">
              <RoofMark />
              <span>Sabrina</span>
            </div>
            <p className="footer__blurb">{footer.blurb}</p>
            <div className="footer__badges">
              {footer.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>

          <div>
            <h2>{footer.servicesHeading}</h2>
            <ul>
              {services.items.map((item) => (
                <li key={item.title}>
                  <a href="#services">{item.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>{footer.contactHeading}</h2>
            <ul>
              <li>
                <a href={brand.phoneHref}>
                  <Phone size={13} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`}>
                  <Mail size={13} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
                  {brand.email}
                </a>
              </li>
              <li>
                <MapPin size={13} aria-hidden="true" style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
                {brand.address.street}
                <br />
                {brand.address.city}, {brand.address.region} {brand.address.postalCode}
              </li>
            </ul>
          </div>

          <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
            <div id="financing">
              <h2>{footer.financingHeading}</h2>
              <div className="footer__financing">
                <strong>0% APR · 12 months</strong>
                <br />
                {footer.financing}
              </div>
            </div>
            <div>
              <h2>{footer.hoursHeading}</h2>
              <ul>
                {footer.hours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p style={{ margin: 0 }}>{footer.rights}</p>
          <div className="footer__legal">
            {footer.legal.map((item) => (
              <a key={item} href="#top">
                {item}
              </a>
            ))}
            <span>Demo content</span>
          </div>
        </div>

        <p className="sr-only">
          {nav.map((item) => item.label).join(", ")} — {brand.name}, {brand.address.street},{" "}
          {brand.address.city}, {brand.address.region}.
        </p>
      </div>
    </footer>
  );
}
