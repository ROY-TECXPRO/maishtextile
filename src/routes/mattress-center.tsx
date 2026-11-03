import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Container, CtaBand, Reveal, SectionHead, meta } from "@/components/site";
import { IMG, waLink } from "@/lib/site";

export const Route = createFileRoute("/mattress-center")({
  head: () =>
    meta(
      "Maish Mattress Center | Bobmil, Maharaja, Primefoam, Ndovu",
      "Quality mattresses and bedding — multiple brands, one roof, in Narok CBD.",
    ),
  component: Mattress,
});

interface MattressBrand {
  name: string;
  group: string;
  desc: string;
  img?: string;
  imgs?: string[];
  items: string[];
  to: string;
}

const brands: MattressBrand[] = [
  {
    name: "Bobmil",
    group: "Mattresses",
    desc: "Trusted Kenyan mattress brand with durable spring and foam options.",
    img: IMG.mattress,
    items: [
      "Bonnel spring mattresses",
      "Memory foam mattresses",
      "Orthopedic support options",
      "Multiple size availability",
      "10-year warranty",
    ],
    to: "/mattress-center",
  },
  {
    name: "Maharaja",
    group: "Mattresses",
    desc: "Premium spring and orthopedic mattresses for superior comfort.",
    imgs: ["/Spring Mattress.jpeg", "/Orthopedic spring mattress_They engineered for….jpeg"],
    items: [
      "Spring Mattress — durable coil system",
      "Orthopedic spring mattress — engineered for spinal support",
      "High-density comfort layers",
      "Breathable fabric covers",
      "Hotel-grade durability",
    ],
    to: "/mattress-center",
  },
  {
    name: "Primefoam",
    group: "Mattresses",
    desc: "High-density foam mattresses designed for deep sleep and comfort.",
    img: "/How to Choose the Right Mattress for Deep Sleep & Comfort.jpeg",
    items: [
      "High-resilience foam core",
      "Pressure-relieving comfort layers",
      "Hypoallergenic materials",
      "Cool-sleep technology",
      "Ideal for all sleeping positions",
    ],
    to: "/mattress-center",
  },
  {
    name: "Ndovu",
    group: "Mattresses",
    desc: "Strong and durable mattresses built to last.",
    imgs: ["/mattress.jpeg", "/686236062002348997.jpeg"],
    items: [
      "Heavy-duty spring construction",
      "Reinforced edge support",
      "Long-lasting comfort layers",
      "Value for money",
      "Popular for institutions and homes",
    ],
    to: "/mattress-center",
  },
];

function Mattress() {
  const [openBrand, setOpenBrand] = useState<MattressBrand | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpenBrand(null);
  };

  useEffect(() => {
    if (openBrand) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openBrand]);

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
            poster="/mattress.jpeg"
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
          >
            <source src="/mattress.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 pb-16">
          <p className="eyebrow">Mattress Center</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.9] sm:text-6xl md:text-8xl">
            Multiple Brands, One Roof.
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90 md:text-xl">
            Quality mattresses and bedding in Narok CBD.
          </p>
        </div>
      </section>
      <Container>
        <SectionHead
          eyebrow="Our brands"
          title="Explore Mattress Brands"
          text="Visit the showroom or message us for current sizes and availability for each brand."
        />
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {brands.map((b, i) => (
            <Reveal key={b.name} delay={i * 80}>
              <article
                className="group relative aspect-[4/3] overflow-hidden bg-navy text-navy-foreground cursor-pointer"
                onClick={() => setOpenBrand(b)}
              >
                {b.imgs ? (
                  <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                    {b.imgs.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${b.name} mattress ${idx + 1}`}
                        loading="lazy"
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={b.img}
                    alt={`${b.name} mattress display`}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 2 ? "scale-x-[-1]" : ""}`}
                  />
                )}
                <div className="hero-overlay absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <h3 className="text-3xl font-black uppercase md:text-5xl">{b.name}</h3>
                  <span className="text-xs font-bold uppercase text-signal">View details</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
      <CtaBand title="Find Your Perfect Mattress — Visit Us in Narok CBD." />
      {openBrand && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openBrand.name}
          className="fixed inset-0 z-[60] grid place-items-center bg-navy/80 p-4 backdrop-blur"
          onClick={() => setOpenBrand(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-card text-card-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1">
                {(openBrand.imgs ? openBrand.imgs : [openBrand.img!]).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${openBrand.name} mattress ${idx + 1}`}
                    className="aspect-[16/9] w-full object-cover"
                  />
                ))}
              </div>
              <button
                onClick={() => setOpenBrand(null)}
                aria-label="Close"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-navy text-navy-foreground"
              >
                <X />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <p className="eyebrow">{openBrand.group}</p>
              <h3 className="mt-2 text-2xl font-black uppercase">{openBrand.name}</h3>
              <p className="mt-3 text-muted-foreground">{openBrand.desc}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {openBrand.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waLink(
                    `Hello Maish, I'm interested in ${openBrand.name} mattresses. Which sizes are available?`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-signal px-5 py-3 text-sm font-bold text-signal-foreground"
                >
                  Enquire on WhatsApp
                </a>
                <a
                  href={openBrand.to}
                  onClick={() => setOpenBrand(null)}
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
