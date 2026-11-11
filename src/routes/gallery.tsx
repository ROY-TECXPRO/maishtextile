import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Container, PageHero, SectionHead, meta } from "@/components/site";
import { IMG } from "@/lib/site";
import { GlassButton } from "@/components/ui/glass-button";

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
  { src: "/beige guide.webp", alt: "Ranger conservancy uniform guide" },
  { src: "/navyblue guide.webp", alt: "Navy blue uniform guide" },
  { src: "/824018063102049529.webp", alt: "Security uniform shirt" },
  { src: "/shirt.webp", alt: "Professional shirt" },
  { src: "/trouser.webp", alt: "Uniform trousers" },
  { src: "/combat.webp", alt: "Combat uniform" },
  { src: "/side shirt.webp", alt: "Side shirt uniform" },
  { src: "/safety boot.webp", alt: "Safety boot" },
  { src: "/PPE.webp", alt: "Personal protective equipment" },
  { src: "/mask.webp", alt: "Protective mask" },
  { src: "/gloves.webp", alt: "Safety gloves" },
  { src: "/𝗘𝗹𝗲𝗰𝘁𝗿𝗼 𝗔𝗕𝗦.webp", alt: "Electro ABS safety helmet" },
  { src: "/Baritech Asansör _ Logotype.webp", alt: "Baritech safety logotype" },
  { src: "/safety metal gloves.webp", alt: "Safety metal mesh gloves" },
  { src: "/High Visibility Reflective Vest.webp", alt: "High visibility reflective vest" },
  { src: "/overall.webp", alt: "Protective overalls" },
  { src: "/safetboot.webp", alt: "Safety boot footwear" },
  { src: "/Spring Mattress.webp", alt: "Spring mattress" },
  { src: "/Orthopedic spring mattress_They engineered for….webp", alt: "Orthopedic spring mattress" },
  { src: "/How to Choose the Right Mattress for Deep Sleep & Comfort.webp", alt: "Mattress comfort guide" },
  { src: "/mattress.webp", alt: "Mattress display" },
  { src: "/686236062002348997.webp", alt: "Mattress brand" },
  { src: "/bedsheets and pillows.webp", alt: "Bed sheets and pillows" },
  { src: "/blankets.webp", alt: "Blankets" },
  { src: "/duvet covers.webp", alt: "Duvet covers" },
  { src: "/duvet.webp", alt: "Duvet" },
  { src: "/duvets.webp", alt: "Duvets collection" },
  { src: "/curtains.webp", alt: "Curtains" },
  { src: "/curtainss (1).webp", alt: "Curtains style 1" },
  { src: "/curtainss (2).webp", alt: "Curtains style 2" },
  { src: "/curtainss (3).webp", alt: "Curtains style 3" },
  { src: "/fabrics.webp", alt: "Uniform fabrics" },
  { src: "/uniform materials.webp", alt: "Uniform materials" },
  { src: "/mint.webp", alt: "Mint fabric" },
  { src: "/markintosh.webp", alt: "Markintosh fabric" },
  { src: "/denim.webp", alt: "Denim fabric" },
  { src: "/industry.webp", alt: "Industrial garments" },
  { src: "/trim.webp", alt: "Garment trim" },
  { src: "/pattern.webp", alt: "Garment pattern" },
  { src: "/cutting.webp", alt: "Fabric cutting" },
  { src: "/sewing.webp", alt: "Garment sewing" },
  { src: "/embroidery1.webp", alt: "Embroidery work" },
  { src: "/embroidery2.webp", alt: "Quality inspection" },
  { src: "/embroidery3.webp", alt: "Finished embroidery" },
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
        text="Representative imagery — real Maish photos and videos."
        img={IMG.hospitality}
      />
      <Container>
        <SectionHead eyebrow="Collection" title="Tap to Enlarge" />
        <div className="columns-1 sm:columns-2 md:columns-3 gap-3 [&>button]:mb-3">
          {pics.map((p, n) => (
            <button
              key={p.alt}
              onClick={() => setI(n)}
              className="group block w-full overflow-hidden rounded-md glass-hover btn-press"
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm"
          onClick={() => setI(null)}
        >
          <div className="relative max-h-[85vh] max-w-full">
            <img
              src={pics[i]!.src}
              alt={pics[i]!.alt}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <GlassButton
              variant="navy"
              size="sm"
              className="absolute right-4 top-4"
              onClick={() => setI(null)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </GlassButton>
            <GlassButton
              variant="ghost"
              size="sm"
              className="absolute left-4 top-4"
              onClick={(e) => {
                e.stopPropagation();
                setI((i - 1 + pics.length) % pics.length);
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </GlassButton>
            <GlassButton
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 translate-x-[50px]"
              onClick={(e) => {
                e.stopPropagation();
                setI((i + 1) % pics.length);
              }}
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </GlassButton>
          </div>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-navy-foreground bg-white/90 px-3 py-1 rounded-full backdrop-blur">
            {pics[i]!.alt}
          </p>
        </div>
      )}
    </>
  );
}
