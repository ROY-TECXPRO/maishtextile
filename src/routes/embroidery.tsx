import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container, CtaBand, Reveal, SectionHead, meta } from "@/components/site";
import { IMG } from "@/lib/site";

export const Route = createFileRoute("/embroidery")({
  head: () =>
    meta(
      "Custom Embroidery & Garment Branding — Maish Narok",
      "Embroidered company logos, school badges, names, caps, workwear and hotel uniforms.",
    ),
  component: Embroidery,
});

const flow = ["Garment Selection", "Logo or Design", "Embroidery", "Finished Garment"];

function Embroidery() {
  const [pos, setPos] = useState(50);
  const [step, setStep] = useState(0);
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
            poster="/embroidery1.webp"
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
          >
            <source src="/vida.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 pb-16">
          <p className="eyebrow">Embroidery</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.9] sm:text-6xl md:text-8xl">
            Your Brand, Stitched to Last.
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90 md:text-xl">
            Logos, school badges, names and branding on uniforms, caps and workwear.
          </p>
        </div>
      </section>
      <Container>
        <SectionHead
          eyebrow="Before & after"
          title="Plain to Branded"
          text="Drag the slider to compare a plain garment with the embroidered finish (illustrative)."
        />
        <div className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden select-none">
          <img
            src={IMG.embroidery}
            alt="Polo shirt with embroidered logo"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={IMG.embroidery}
              alt="Same polo shirt before embroidery"
              className="absolute inset-0 h-full w-full object-cover blur-md grayscale"
              loading="lazy"
            />
            <span className="absolute left-3 top-3 bg-navy px-3 py-1 text-xs font-bold uppercase text-navy-foreground">
              Plain
            </span>
          </div>
          <span className="absolute right-3 top-3 bg-signal px-3 py-1 text-xs font-bold uppercase text-signal-foreground">
            Embroidered
          </span>
          <div
            className="pointer-events-none absolute inset-y-0 w-1 bg-signal"
            style={{ left: `${pos}%` }}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(+e.target.value)}
            aria-label="Compare before and after"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </Container>
      <section className="bg-navy text-navy-foreground">
        <Container>
          <p className="eyebrow">How it works (illustrative)</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {flow.map((f, i) => (
              <button
                key={f}
                onClick={() => setStep(i)}
                className={`p-6 text-left transition-colors ${step >= i ? "bg-signal text-signal-foreground" : "bg-navy-foreground/5"}`}
              >
                <span className="font-display text-3xl font-black">{i + 1}</span>
                <p className="mt-2 font-bold uppercase">{f}</p>
              </button>
            ))}
          </div>
          <Reveal className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              "Company logos",
              "School badges",
              "Name embroidery",
              "Embroidered workwear",
              "Hotel uniforms",
              "Caps & garments",
            ].map((x) => (
              <div key={x} className="border border-navy-foreground/15 p-5 font-semibold">
                {x}
              </div>
            ))}
          </Reveal>
        </Container>
      </section>
      <CtaBand title="Send Us Your Logo — We'll Stitch It." />
    </>
  );
}
