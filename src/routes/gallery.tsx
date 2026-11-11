import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Container, PageHero, SectionHead, meta } from "@/components/site";
import { IMG } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  head: () =>
    meta(
      "Gallery — Maish Textile Industry & Mattress Center",
      "A visual look at uniforms, PPE, embroidery, school wear, bedding and mattresses.",
    ),
  component: Gallery,
});

const pics = [
  { src: IMG.factory, alt: "Garment production floor" },
  { src: IMG.ppe, alt: "Industrial overalls and hi-vis vests" },
  { src: IMG.school, alt: "School uniforms" },
  { src: IMG.embroidery, alt: "Embroidery on a polo shirt" },
  { src: IMG.ranger, alt: "Ranger and safari uniforms" },
  { src: IMG.hospitality, alt: "Hotel and hospitality uniforms" },
  { src: IMG.corporate, alt: "Security uniforms and Kaunda suit" },
  { src: IMG.fabrics, alt: "Uniform fabric rolls" },
  { src: IMG.bedroom, alt: "Bedding and curtains" },
  { src: IMG.mattress, alt: "Mattress showroom" },
];

function Gallery() {
  const [i, setI] = useState<number | null>(null);
  useEffect(() => {
    if (i === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setI(null);
      if (e.key === "ArrowRight") setI((v) => (v! + 1) % pics.length);
      if (e.key === "ArrowLeft") setI((v) => (v! - 1 + pics.length) % pics.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [i]);
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="See the Range."
        text="Representative imagery — real Maish photos and videos will be added here."
        img={IMG.hospitality}
      />
      <Container>
        <SectionHead eyebrow="Collection" title="Tap to Enlarge" />
        <div className="columns-2 gap-3 md:columns-3 [&>button]:mb-3">
          {pics.map((p, n) => (
            <button
              key={p.alt}
              onClick={() => setI(n)}
              className="group block w-full overflow-hidden"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                width={1200}
                height={912}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${n % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
              />
            </button>
          ))}
        </div>
      </Container>
      {i !== null && pics[i] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={pics[i]!.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/95 p-4"
          onClick={() => setI(null)}
        >
          <img
            src={pics[i]!.src}
            alt={pics[i]!.alt}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Close"
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center bg-signal text-signal-foreground"
          >
            <X />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setI((i - 1 + pics.length) % pics.length);
            }}
            className="absolute left-2 grid h-12 w-12 place-items-center bg-navy-foreground/10 text-navy-foreground"
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setI((i + 1) % pics.length);
            }}
            className="absolute right-2 grid h-12 w-12 place-items-center bg-navy-foreground/10 text-navy-foreground"
          >
            <ChevronRight />
          </button>
          <p className="absolute bottom-4 text-sm text-navy-foreground">{pics[i]!.alt}</p>
        </div>
      )}
    </>
  );
}
