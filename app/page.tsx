import { Hero } from "@/components/hero";
import { LatestRoofs } from "@/components/latest-roofs";
import { LocaleProvider } from "@/components/locale-context";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";

export default function Page() {
  return (
    <LocaleProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <main id="main">
        {/* Sections 1 + 2 share the sky gradient, cloud glow and grid lines. */}
        <div className="page">
          <div className="gridlines" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <Hero />
          <LatestRoofs />
        </div>

        <Services />
      </main>

      <SiteFooter />
    </LocaleProvider>
  );
}
