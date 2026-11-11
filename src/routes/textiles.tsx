import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Container, CtaBand, Reveal, SectionHead, meta } from "@/components/site";
import { IMG } from "@/lib/site";

export const Route = createFileRoute("/textiles")({
  head: () =>
    meta(
      "Bedding, Curtains & Textiles — Maish Narok",
      "Bed sheets, duvet covers, pillowcases, blankets, curtains, drapes and fabrics for homes, hotels and institutions.",
    ),
  component: Textiles,
});

interface TextileCategory {
  id: string;
  group: string;
  title: string;
  desc: string;
  coverImg: string;
  imgs: string[];
  items: string[];
  to: string;
}

const textileCategories: TextileCategory[] = [
  {
    id: "bed-sheets-pillowcases",
    group: "Bedding",
    title: "Bed sheets & pillowcases",
    desc: "Quality bed sheets and pillowcases for homes and institutions.",
    coverImg: "/bedsheets and pillows.webp",
    imgs: ["/bedsheets and pillows.webp", "/blankets.webp"],
    items: [
      "Fitted and flat bed sheets",
      "Pillowcases in multiple sizes",
      "Cotton and poly-cotton blends",
      "Hotel-grade durability",
      "Institutional bedding sets",
    ],
    to: "/textiles",
  },
  {
    id: "duvet-covers-blankets",
    group: "Bedding",
    title: "Duvet covers & blankets",
    desc: "Duvet covers and blankets for comfort and warmth.",
    coverImg: "/duvet covers.webp",
    imgs: ["/duvet.webp", "/duvets.webp", "/duvet covers.webp"],
    items: [
      "Duvet covers with button/zip closure",
      "Lightweight and heavyweight blankets",
      "Hotel and hospital specifications",
      "Easy-care fabrics",
      "Multiple color options",
    ],
    to: "/textiles",
  },
  {
    id: "curtains-drapes",
    group: "Home",
    title: "Curtains & drapes",
    desc: "Curtains and drapes for privacy and style.",
    coverImg: "/curtainss (2).webp",
    imgs: ["/curtains.webp", "/curtainss (2).webp", "/curtainss (3).webp"],
    items: [
      "Blackout and sheer curtains",
      "Custom-made drapes",
      "Hotel and institutional curtains",
      "Fire-retardant options available",
      "Track and pole systems",
    ],
    to: "/textiles",
  },
  {
    id: "fabrics-textile-materials",
    group: "Materials",
    title: "Fabrics & textile materials",
    desc: "Fabric materials for uniforms, institutions and home use.",
    coverImg: "/fabrics.webp",
    imgs: ["/uniform materials.webp", "/mint.webp", "/markintosh.webp", "/fabrics.webp"],
    items: [
      "Uniform and workwear fabrics",
      "Mint and markintosh materials",
      "Cotton, polyester and blends",
      "Institutional grade textiles",
      "Custom fabric sourcing",
    ],
    to: "/textiles",
  },
];

function Textiles() {
  const [openCategory, setOpenCategory] = useState<TextileCategory | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpenCategory(null);
  };

  useEffect(() => {
    if (openCategory) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openCategory]);

  return (
    <div className="bg-cream text-cream-foreground">
      <section className="relative flex min-h-svh items-center overflow-hidden bg-navy text-navy-foreground">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/bedroom.webp"
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
          >
            <source src="/videos.webm" type="video/webm" />
          </video>
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 pb-16">
          <p className="eyebrow">Textiles & Bedding</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.9] sm:text-6xl md:text-8xl">
            Comfort, Woven In.
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90 md:text-xl">
            Bedding, curtains and fabrics for homes, hotels and institutions.
          </p>
        </div>
      </section>
      <Container>
        <SectionHead eyebrow="Collections" title="For Homes & Institutions" />
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {textileCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 80}>
              <div
                className="group relative block aspect-[4/5] w-full overflow-hidden bg-navy text-left text-navy-foreground"
                onClick={() => setOpenCategory(cat)}
              >
                <img
                  src={cat.coverImg}
                  alt={cat.title}
                  loading="lazy"
                  width={400}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="hero-overlay absolute inset-0 opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-6">
                  <p className="eyebrow !text-[10px] md:!text-xs">{cat.group}</p>
                  <h3 className="mt-1 text-base font-black uppercase leading-tight md:text-2xl">
                    {cat.title}
                  </h3>
                  <p className="mt-2 hidden text-sm opacity-80 md:block">{cat.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-signal">
                    View details
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <CtaBand title="Outfitting a Hotel, School or Home? Talk to Us." />
      {openCategory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openCategory.title}
          className="fixed inset-0 z-[60] grid place-items-center bg-navy/80 p-4 backdrop-blur"
          onClick={() => setOpenCategory(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-card text-card-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1">
                {openCategory.imgs.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${openCategory.title} ${idx + 1}`}
                    className="aspect-[16/9] w-full object-cover"
                  />
                ))}
              </div>
              <button
                onClick={() => setOpenCategory(null)}
                aria-label="Close"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-navy text-navy-foreground"
              >
                <X />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <p className="eyebrow">{openCategory.group}</p>
              <h3 className="mt-2 text-2xl font-black uppercase">{openCategory.title}</h3>
              <p className="mt-3 text-muted-foreground">{openCategory.desc}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {openCategory.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/254799921036?text=${encodeURIComponent(`Hello Maish, I'd like to enquire about ${openCategory.title}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-signal px-5 py-3 text-sm font-bold text-signal-foreground"
                >
                  Enquire on WhatsApp
                </a>
                <a
                  href={openCategory.to}
                  onClick={() => setOpenCategory(null)}
                  className="border border-border px-5 py-3 text-sm font-bold hover:border-primary"
                >
                  View Page
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
