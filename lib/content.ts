export type Locale = "en" | "es";

export type NavItem = { label: string; href: string; icon?: boolean };

export type Project = {
  src: string;
  alt: string;
  title: string;
  detail: string;
  meta: string;
  width: number;
  height: number;
};

export type Service = {
  title: string;
  body: string;
  meta: string;
};

export type Copy = {
  htmlLang: string;
  metaTitle: string;
  metaDescription: string;
  navLabel: string;
  nav: NavItem[];
  cta: string;
  langLabel: string;
  hero: {
    h1: string[];
    srSubtitle: string;
    tagline: string;
    taglineLines: string[];
    houseAlt: string;
    explore: string;
    exploreHref: string;
    videoCaption: string;
    videoCaptionLines: string[];
    liveLabel: string;
    progressLabel: string;
    partLabel: string;
  };
  latest: {
    heading: string[];
    galleryLabel: string;
    cards: Project[];
  };
  services: {
    eyebrow: string;
    title: string;
    lede: string;
    items: Service[];
  };
  footer: {
    title: string;
    call: string;
    email: string;
    blurb: string;
    badges: string[];
    servicesHeading: string;
    contactHeading: string;
    hoursHeading: string;
    hours: string[];
    financingHeading: string;
    financing: string;
    rights: string;
    legal: string[];
  };
};

export const brand = {
  name: "Sabrina Roofing & Exteriors",
  short: "Sabrina Roofing",
  city: "Dallas",
  state: "TX",
  phone: "+1 (214) 555-0134",
  phoneHref: "tel:+12145550134",
  email: "hello@sabrinaroofing.com",
  address: {
    street: "4312 Maple Avenue, Suite 210",
    city: "Dallas",
    region: "TX",
    postalCode: "75219",
    country: "US",
  },
  url: "https://sabrina-roofing.vercel.app",
  foundingYear: 2014,
};

/* Demo imagery. Self-hosted in /public by default (zero third-party requests);
   a source-only deploy switches to remote photos that Vercel optimizes at the edge. */
const remoteAssets = process.env.NEXT_PUBLIC_REMOTE_ASSETS === "1";

const files = remoteAssets
  ? [
      {
        src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&h=1125&fit=crop&q=72&fm=jpg",
        width: 900,
        height: 1125,
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1125&fit=crop&q=72&fm=jpg",
        width: 900,
        height: 1125,
      },
      {
        src: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=900&h=1125&fit=crop&q=72&fm=jpg",
        width: 900,
        height: 1125,
      },
    ]
  : [
      { src: "/images/project-1.webp", width: 896, height: 1200 },
      { src: "/images/project-2.webp", width: 896, height: 1200 },
      { src: "/images/project-3.webp", width: 896, height: 1200 },
    ];

const projectsEn: Project[] = [
  {
    ...files[0],
    alt: "Charcoal architectural shingle roof on a white craftsman home in Oak Lawn, Dallas",
    title: "Oak Lawn craftsman",
    detail: "Architectural shingle",
    meta: "2025",
  },
  {
    ...files[1],
    alt: "Dark bronze standing seam metal roof on a modern cedar and concrete home in Lakewood, Dallas",
    title: "Lakewood modern",
    detail: "Standing seam metal",
    meta: "2025",
  },
  {
    ...files[2],
    alt: "Sabrina Roofing crew installing architectural shingles and ridge vent on a Dallas home",
    title: "Preston Hollow",
    detail: "Full tear-off & rebuild",
    meta: "2024",
  },
];

const projectsEs: Project[] = [
  {
    ...files[0],
    alt: "Techo de teja arquitectónica gris carbón en una casa estilo craftsman de Oak Lawn, Dallas",
    title: "Oak Lawn",
    detail: "Teja arquitectónica",
    meta: "2025",
  },
  {
    ...files[1],
    alt: "Techo de metal de junta alzada en bronce oscuro en una casa moderna de Lakewood, Dallas",
    title: "Lakewood moderno",
    detail: "Metal de junta alzada",
    meta: "2025",
  },
  {
    ...files[2],
    alt: "Equipo de Sabrina Roofing instalando tejas arquitectónicas y ventilación de cumbrera en Dallas",
    title: "Preston Hollow",
    detail: "Retiro y reconstrucción",
    meta: "2024",
  },
];

export const copy: Record<Locale, Copy> = {
  en: {
    htmlLang: "en",
    metaTitle: "Sabrina Roofing & Exteriors | Dallas Roof Replacement & Repair",
    metaDescription:
      "Trusted Dallas roofing experts for roof replacement, storm damage repair and metal, tile and flat roofing. Licensed, insured, 25-year workmanship warranty. Free inspections.",
    navLabel: "Primary",
    nav: [
      { label: "Home", href: "#top", icon: true },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Financing", href: "#financing" },
    ],
    cta: "Free quote",
    langLabel: "Language",
    hero: {
      h1: ["Sabrina", "Roofing", "Exteriors"],
      srSubtitle:
        "Dallas roof replacement, roof repair and storm damage restoration since 2014.",
      tagline:
        "Trusted Dallas roofing experts for a stronger, safer, smarter home.",
      taglineLines: [
        "Trusted Dallas roofing",
        "experts for a stronger,",
        "safer, smarter home.",
      ],
      houseAlt:
        "Modern Dallas home with a newly installed architectural shingle roof",
      explore: "Explore projects",
      exploreHref: "#projects",
      videoCaption: "Find a roof that fits your home",
      videoCaptionLines: ["Find a roof that fits", "your home"],
      liveLabel: "Live",
      progressLabel: "Video progress",
      partLabel: "Play video part",
    },
    latest: {
      heading: ["Our", "Latest", "Roofs"],
      galleryLabel: "Recent roofing projects in Dallas",
      cards: projectsEn,
    },
    services: {
      eyebrow: "What we do",
      title: "Four trades, one crew, zero surprises.",
      lede: "Sabrina Roofing has protected Dallas homes since 2014 — 1,200+ roofs completed, fully insured crews, and a written warranty on every job.",
      items: [
        {
          title: "Roof replacement",
          body: "Full tear-off and rebuild with GAF and Owens Corning systems, plus upgraded ventilation and decking where it counts.",
          meta: "1–2 day install",
        },
        {
          title: "Storm & hail damage",
          body: "Emergency tarping, photo documentation and insurance paperwork handled for you after North Texas hail storms.",
          meta: "24/7 response",
        },
        {
          title: "Repairs & maintenance",
          body: "Leak tracing, flashing, gutters and seasonal tune-ups that catch small problems before they reach your ceiling.",
          meta: "Same-week visits",
        },
        {
          title: "Metal, tile & flat",
          body: "Standing seam metal, clay tile and TPO flat systems engineered for Texas heat, wind and rain.",
          meta: "All roof types",
        },
      ],
    },
    footer: {
      title: "Get a free roof inspection this week.",
      call: "Call",
      email: "Request an estimate",
      blurb:
        "Family-owned roofing contractor serving Dallas, Highland Park, Lakewood, Plano and the surrounding DFW area.",
      badges: ["Licensed & insured", "GAF Certified", "25-year warranty", "BBB A+"],
      servicesHeading: "Services",
      contactHeading: "Contact",
      hoursHeading: "Hours",
      hours: ["Mon–Fri · 7am–6pm", "Saturday · 8am–2pm", "Storm line · 24/7"],
      financingHeading: "Financing",
      financing:
        "0% APR for 12 months on approved credit, with fixed monthly payment plans up to 10 years. No prepayment penalty.",
      rights: `© ${new Date().getFullYear()} Sabrina Roofing & Exteriors. All rights reserved.`,
      legal: ["Privacy", "Terms", "Accessibility"],
    },
  },
  es: {
    htmlLang: "es",
    metaTitle: "Sabrina Roofing & Exteriors | Techos en Dallas: reemplazo y reparación",
    metaDescription:
      "Expertos en techos en Dallas: reemplazo de techo, reparación de daños por tormentas y sistemas de metal, teja y techo plano. Con licencia, asegurados y garantía de 25 años.",
    navLabel: "Principal",
    nav: [
      { label: "Inicio", href: "#top", icon: true },
      { label: "Servicios", href: "#services" },
      { label: "Proyectos", href: "#projects" },
      { label: "Financiamiento", href: "#financing" },
    ],
    cta: "Cotizar",
    langLabel: "Idioma",
    hero: {
      h1: ["Sabrina", "Roofing", "Exteriors"],
      srSubtitle:
        "Reemplazo de techos, reparaciones y daños por tormentas en Dallas desde 2014.",
      tagline:
        "Expertos en techos en Dallas para un hogar más fuerte y más seguro.",
      taglineLines: [
        "Expertos en techos en Dallas",
        "para un hogar más fuerte",
        "y más seguro.",
      ],
      houseAlt:
        "Casa moderna en Dallas con un techo de teja arquitectónica recién instalado",
      explore: "Ver proyectos",
      exploreHref: "#projects",
      videoCaption: "Encuentra el techo que tu hogar necesita",
      videoCaptionLines: ["Encuentra el techo que", "tu hogar necesita"],
      liveLabel: "En vivo",
      progressLabel: "Progreso del video",
      partLabel: "Reproducir la parte",
    },
    latest: {
      heading: ["Nuestros", "Últimos", "Techos"],
      galleryLabel: "Proyectos de techos recientes en Dallas",
      cards: projectsEs,
    },
    services: {
      eyebrow: "Lo que hacemos",
      title: "Cuatro oficios, un equipo, cero sorpresas.",
      lede: "Sabrina Roofing protege los hogares de Dallas desde 2014: más de 1,200 techos, equipos asegurados y garantía por escrito en cada trabajo.",
      items: [
        {
          title: "Reemplazo de techo",
          body: "Retiro completo y reconstrucción con sistemas GAF y Owens Corning, con ventilación y estructura mejoradas.",
          meta: "Instalación en 1–2 días",
        },
        {
          title: "Daños por granizo",
          body: "Protección de emergencia, documentación fotográfica y trámites de seguro después de las tormentas del norte de Texas.",
          meta: "Respuesta 24/7",
        },
        {
          title: "Reparación y mantenimiento",
          body: "Detección de fugas, tapajuntas, canaletas y revisiones de temporada que evitan problemas mayores.",
          meta: "Visitas en la semana",
        },
        {
          title: "Metal, teja y plano",
          body: "Metal de junta alzada, teja de barro y sistemas planos TPO diseñados para el calor y el viento de Texas.",
          meta: "Todo tipo de techo",
        },
      ],
    },
    footer: {
      title: "Recibe una inspección de techo gratis esta semana.",
      call: "Llamar",
      email: "Pedir presupuesto",
      blurb:
        "Contratista de techos familiar que atiende Dallas, Highland Park, Lakewood, Plano y el área de DFW.",
      badges: ["Con licencia", "Certificado GAF", "Garantía de 25 años", "BBB A+"],
      servicesHeading: "Servicios",
      contactHeading: "Contacto",
      hoursHeading: "Horario",
      hours: ["Lun–Vie · 7am–6pm", "Sábado · 8am–2pm", "Emergencias · 24/7"],
      financingHeading: "Financiamiento",
      financing:
        "0% de interés por 12 meses con crédito aprobado y planes de pago fijos hasta 10 años. Sin penalidad por pago anticipado.",
      rights: `© ${new Date().getFullYear()} Sabrina Roofing & Exteriors. Todos los derechos reservados.`,
      legal: ["Privacidad", "Términos", "Accesibilidad"],
    },
  },
};

export const locales: Locale[] = ["en", "es"];
