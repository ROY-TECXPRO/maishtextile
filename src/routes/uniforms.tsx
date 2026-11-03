import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CategoryGrid, Container, CtaBand, SectionHead, Reveal, meta } from "@/components/site";
import { waLink } from "@/lib/site";
import { IMG } from "@/lib/site";

export const Route = createFileRoute("/uniforms")({
  head: () =>
    meta(
      "Uniforms & PPE | Workwear, Security, Hotel, Safari — Maish",
      "Industrial overalls, hi-vis wear, security, ranger, safari, hotel and corporate uniforms supplied from Narok, Kenya.",
    ),
  component: Uniforms,
});

interface CustomCategory {
  id: string;
  group: string;
  title: string;
  desc: string;
  imgs: string[];
  items: string[];
  to: string;
}

const customCategories: CustomCategory[] = [
  {
    id: "ranger-conservancy",
    group: "Uniforms",
    title: "Rangers & Conservancy",
    desc: "Field-ready khaki uniforms built for long days outdoors in conservancies and parks.",
    imgs: ["/beige guide.jpeg", "/navyblue guide.jpeg"],
    items: [
      "Ranger uniforms",
      "Conservancy uniforms",
      "Khaki shirts & trousers",
      "Outdoor field clothing",
      "Durable field jackets",
      "Protective outdoor wear",
    ],
    to: "/uniforms",
  },
  {
    id: "security-uniform",
    group: "Uniforms",
    title: "Security Uniform",
    desc: "Smart, hard-wearing uniforms for security teams and professional staff.",
    imgs: ["/824018063102049529.jpeg", "/shirt.jpeg", "/trouser.jpeg"],
    items: [
      "Security guard uniforms",
      "Corporate security clothing",
      "Professional shirts & trousers",
      "Uniform jackets",
      "Workwear accessories",
    ],
    to: "/uniforms",
  },
  {
    id: "conservancy-security-combat",
    group: "Uniforms",
    title: "Conservancy Security Combat",
    desc: "Combat-ready uniforms for conservancy security operations.",
    imgs: ["/combat.jpeg", "/side shirt.jpeg"],
    items: [
      "Combat uniforms",
      "Tactical field shirts",
      "Reinforced combat trousers",
      "Utility pocket vests",
      "Moisture-wicking base layers",
      "Protective outdoor wear",
    ],
    to: "/uniforms",
  },
  {
    id: "safety-boot",
    group: "Workwear",
    title: "Safety Boot",
    desc: "Steel-toe safety boots for industrial foot protection.",
    imgs: ["/safety boot.jpeg"],
    items: [
      "Steel toe safety boots",
      "Slip-resistant work boots",
      "Industrial footwear",
      "Construction safety boots",
      "Factory work boots",
    ],
    to: "/uniforms",
  },
  {
    id: "ppe-general",
    group: "Workwear",
    title: "PPE",
    desc: "General personal protective equipment for workplace safety.",
    imgs: ["/PPE.jpeg"],
    items: [
      "Protective equipment sets",
      "Industrial safety gear",
      "Workplace PPE kits",
      "Factory safety equipment",
      "Construction PPE",
    ],
    to: "/uniforms",
  },
  {
    id: "mask",
    group: "Workwear",
    title: "Mask",
    desc: "Protective masks for respiratory and contamination control.",
    imgs: ["/mask.jpeg"],
    items: [
      "Disposable protective masks",
      "Reusable respirator masks",
      "Dust and fume masks",
      "Cleanroom masks",
      "Industrial face masks",
    ],
    to: "/uniforms",
  },
  {
    id: "gloves",
    group: "Workwear",
    title: "Gloves",
    desc: "Protective gloves for hand safety in industrial work.",
    imgs: ["/gloves.jpeg"],
    items: [
      "Cut-resistant work gloves",
      "Chemical protection gloves",
      "Assembly and handling gloves",
      "Industrial safety gloves",
      "Multi-purpose work gloves",
    ],
    to: "/uniforms",
  },
  {
    id: "electro-abs",
    group: "Workwear",
    title: "Electro ABS",
    desc: "Electro ABS safety helmets for head protection.",
    imgs: ["/𝗘𝗹𝗲𝗰𝘁𝗿𝗼 𝗔𝗕𝗦.jpeg"],
    items: [
      "Electrical insulation helmets",
      "Arc flash protection headgear",
      "Industrial safety helmets",
      "Electrical work helmets",
      "Ventilated safety helmets",
    ],
    to: "/uniforms",
  },
  {
    id: "baritech",
    group: "Workwear",
    title: "Baritech",
    desc: "Baritech branded safety equipment.",
    imgs: ["/Baritech Asansör _ Logotype.jpeg"],
    items: [
      "Baritech safety components",
      "Industrial lift safety gear",
      "Certified safety equipment",
      "Specialized safety products",
    ],
    to: "/uniforms",
  },
  {
    id: "safety-metal-gloves",
    group: "Workwear",
    title: "Safety Metal Gloves",
    desc: "Metal mesh gloves for cut and heat protection.",
    imgs: ["/safety metal gloves.jpeg"],
    items: [
      "Stainless steel mesh gloves",
      "Cut and puncture resistant gloves",
      "Heat protection gloves",
      "Meat processing gloves",
      "Glass handling gloves",
      "Welding protection gloves",
    ],
    to: "/uniforms",
  },
  {
    id: "high-visibility-vest",
    group: "Workwear",
    title: "High Visibility Reflective Vest",
    desc: "Reflective safety vests for low-light visibility.",
    imgs: ["/High Visibility Reflective Vest.jpeg"],
    items: [
      "Fluorescent safety vests",
      "Reflective strip vests",
      "Roadwork safety vests",
      "Traffic control vests",
      "Night operation vests",
      "Warehouse visibility vests",
    ],
    to: "/uniforms",
  },
  {
    id: "overall",
    group: "Workwear",
    title: "Overall",
    desc: "Protective overalls for full-body coverage.",
    imgs: ["/overall.jpeg"],
    items: [
      "Protective work overalls",
      "Full-body coveralls",
      "Chemical resistant overalls",
      "Industrial overalls",
      "Reinforced knee overalls",
      "Multi-pocket work overalls",
    ],
    to: "/uniforms",
  },
  {
    id: "safetboot",
    group: "Workwear",
    title: "Safetboot",
    desc: "Safety boots for industrial foot protection.",
    imgs: ["/safetboot.jpeg"],
    items: [
      "Protective toe safety boots",
      "Anti-slip sole work boots",
      "Industrial safety footwear",
      "Moisture-wicking boots",
      "Shock-absorbing heel boots",
    ],
    to: "/uniforms",
  },
];

function Uniforms() {
  const [openCategory, setOpenCategory] = useState<CustomCategory | null>(null);

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
    <>
      <section className="relative flex min-h-svh items-center overflow-hidden bg-navy text-navy-foreground">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/beige guide.jpeg"
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 pb-16">
          <p className="eyebrow">Uniforms & PPE</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.9] sm:text-6xl md:text-8xl">
            Dressed for Every Workplace.
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90 md:text-xl">
            Industrial protective wear, security, conservancy, safari, hospitality and corporate
            uniforms.
          </p>
        </div>
      </section>
      <Container>
        <SectionHead
          eyebrow="Collections"
          title="Uniform Categories"
          text="Filter by type, then tap a card for the full list of garments. We don't claim specific safety certifications — ask us about fabric and specification options."
        />
        <CategoryGrid
          ids={["ppe", "security", "ranger", "safari", "hotel", "corporate", "school"]}
        />
        <SectionHead
          eyebrow="Featured Collections"
          title="Specialist Uniforms"
          text="Detailed views with multiple images per category."
        />
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
          {customCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 80}>
              <div
                className="group relative block aspect-[4/5] w-full overflow-hidden bg-navy text-left text-navy-foreground"
                onClick={() => setOpenCategory(cat)}
              >
                <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-1 p-1">
                  {cat.imgs.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${cat.title} ${idx + 1}`}
                      loading="lazy"
                      width={400}
                      height={500}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ))}
                </div>
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
      <CtaBand />
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
                {openCategory.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 bg-signal" />
                    {i}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waLink(`Hello Maish, I'd like to enquire about ${openCategory.title}.`)}
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
    </>
  );
}
