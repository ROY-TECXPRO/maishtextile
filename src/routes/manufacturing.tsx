import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { Container, CtaBand, Reveal, SectionHead, meta } from "@/components/site";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { IMG } from "@/lib/site";

export const Route = createFileRoute("/manufacturing")({
  head: () =>
    meta(
      "Manufacturing | From Fabric to Finished Garment — Maish",
      "How uniforms and garments move from fabric selection through cutting, sewing, embroidery and quality inspection.",
    ),
  component: Manufacturing,
});

const steps = [
  {
    t: "Fabric & material selection",
    img: IMG.fabrics,
    desc: "Premium fabrics are sourced and selected based on durability, comfort, and industry requirements. Each material is tested for colorfastness, shrinkage, and tensile strength before approval.",
  },
  {
    t: "Pattern design & garment preparation",
    img: "/pattern.webp",
    desc: "Technical patterns are developed using CAD software, optimized for material yield and fit. Patterns are graded across size ranges and marked for efficient cutting layouts.",
  },
  {
    t: "Cutting & sizing",
    img: "/cutting.webp",
    desc: "Computer-controlled cutters and manual techniques precision-cut fabric layers. Each piece is labeled, bundled, and tracked through production for size accuracy and traceability.",
  },
  {
    t: "Sewing & assembly",
    img: "/sewing.webp",
    desc: "Skilled operators assemble garment components using industrial machines. Stitch types, seam allowances, and reinforcement points follow spec sheets for each garment category.",
  },
  {
    t: "Embroidery & branding",
    imgs: ["/embroidery1.webp", "/image 1 (8).jpeg", "/embroidery3.webp"],
    desc: "Logos and branding are digitized and embroidered with color-matched threads. Placement is verified against approved artwork before production runs begin.",
  },
  {
    t: "Quality inspection",
    img: "/embroidery2.jpeg",
    desc: "Every garment passes through multi-point inspection: stitch integrity, measurements, labeling, and visual defects. Failed items are repaired or rejected per quality standards.",
  },
  {
    t: "Trimming & finishing",
    img: "/trim.jpeg",
    desc: "Loose threads are trimmed, seams are cleaned, and garments receive final pressing. Buttons, zippers, and fasteners are checked for secure attachment. Each piece is inspected for finish quality before packing.",
  },
  {
    t: "Finished garments ready for delivery",
    imgs: ["/denim.jpeg", "/industry.jpeg"],
    desc: "Approved garments are pressed, folded, poly-bagged, and packed by order. Final shipment checks confirm quantities, sizes, and documentation before dispatch.",
  },
];

function Manufacturing() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <>
      <section className="relative flex min-h-svh items-center overflow-hidden bg-navy text-navy-foreground">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/pattern.webp"
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
          >
            <source src="/video 3.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-24">
          <p className="eyebrow">Manufacturing</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.9] sm:text-6xl md:text-8xl">
            From Fabric to Finished Garment.
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90 md:text-xl">
            An overview of the garment-making journey.
          </p>
        </div>
      </section>
      <Container>
        <SectionHead
          eyebrow="The process"
          title="Eight Steps to Quality"
          text="Illustrative steps using representative textile-industry imagery — not footage filmed at Maish premises. Click any step for details."
        />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 80}>
              <li
                className="group overflow-hidden border border-border bg-card cursor-pointer"
                onClick={() => setOpenStep(i)}
              >
                {s.imgs ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-3 gap-1 p-1">
                      {s.imgs.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${s.t} ${idx + 1}`}
                          loading="lazy"
                          width={400}
                          height={304}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.t}
                      loading="lazy"
                      width={1200}
                      height={912}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex items-baseline gap-4 p-5">
                  <span className="font-display text-4xl font-black text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold uppercase">{s.t}</h3>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        {openStep !== null && (
          <Dialog open={openStep !== null} onOpenChange={(open) => !open && setOpenStep(null)}>
            <DialogTrigger asChild>
              <div className="hidden" />
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
              <div className="relative">
                {steps[openStep].imgs ? (
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {steps[openStep].imgs.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${steps[openStep].t} ${idx + 1}`}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={steps[openStep].img}
                    alt={steps[openStep].t}
                    className="w-full h-auto object-cover"
                  />
                )}
                <DialogClose className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-navy/90 text-navy-foreground hover:bg-navy">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </div>
              <DialogHeader className="p-4 md:p-6">
                <DialogTitle className="text-2xl font-black uppercase">
                  {steps[openStep].t}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {steps[openStep].desc}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </Container>
      <CtaBand />
    </>
  );
}
