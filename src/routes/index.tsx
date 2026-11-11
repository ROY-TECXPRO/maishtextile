import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import {
  CategoryGrid,
  Container,
  CtaBand,
  Reveal,
  SectionHead,
  Stats,
  meta,
} from "@/components/site";
import { GlassButton } from "@/components/ui/glass-button";
import { EnquiryForm } from "@/components/enquiry-form";
import { IMG } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Maish Textile Industry & Mattress Center | Uniforms, PPE & Bedding — Narok",
      "Professional uniforms, industrial PPE, embroidery, school uniforms, textiles, bedding and mattresses from Narok CBD, Kenya.",
    ),
  component: Home,
});

function Home() {
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
            poster="/hero-factory.webp"
            className="absolute inset-0 h-full w-full object-cover object-[30%_center]"
            aria-hidden="true"
          >
            <source src="/showroom.webm" type="video/webm" />
          </video>
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-24">
          <p className="eyebrow">Narok, Kenya · Since 27 years in the market</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black uppercase leading-[0.9] sm:text-6xl md:text-8xl">
            Engineering Quality.
            <br />
            <span className="text-signal">Stitching Excellence.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90 md:text-xl">
            From professional uniforms and industrial protective wear to custom embroidery,
            institutional clothing, textiles, mattresses and bedding — discover dependable solutions
            from Maish in Narok, Kenya.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GlassButton
              variant="signal"
              size="lg"
              onClick={() => {
                document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Our Capabilities
            </GlassButton>
            <Link
              to="/contact"
              prefetchIntent="hover"
              className="border border-navy-foreground/40 px-7 py-4 font-bold uppercase tracking-wider hover:bg-navy-foreground/10 rounded-md glass-hover glass-fill"
            >
              Request a Corporate Enquiry
            </Link>
          </div>
        </div>
        <a
          href="#about"
          aria-label="Scroll down"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-70"
        >
          <ChevronDown />
        </a>
      </section>

      <Container>
        <div id="about" className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={IMG.fabrics}
              alt="Rolls of navy, khaki, maroon and grey uniform fabric"
              loading="lazy"
              width={1200}
              height={912}
              className="aspect-[4/3] w-full object-cover shadow-card"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">About Maish</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-none md:text-5xl">
              Built on Experience. Driven by Quality.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Maish supplies uniforms, protective wear, institutional garments, embroidery,
              textiles, mattresses and bedding to organisations, schools and families. Every order
              is handled with care — from fabric choice to the finished, branded garment.
            </p>
            <Link
              to="/about"
              prefetchIntent="hover"
              className="mt-6 inline-block font-bold uppercase tracking-wider text-primary hover:underline glass-hover"
            >
              More about us →
            </Link>
          </Reveal>
        </div>
        <div className="mt-16">
          <Stats />
        </div>
      </Container>

      <section id="capabilities" className="bg-muted">
        <Container>
          <SectionHead
            eyebrow="Products & Services"
            title="Everything Your Team Wears"
            text="Tap any category to see what's included and send an enquiry."
          />
          <CategoryGrid />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Mattress Center</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-none md:text-5xl">
              Quality Mattresses and Bedding — Multiple Brands, One Roof.
            </h2>
            <p className="mt-5 opacity-80">Bobmil · Maharaja · Primefoam · Ndovu</p>
            <Link
              to="/mattress-center"
              prefetchIntent="hover"
              className="mt-8 inline-block bg-signal text-signal-foreground rounded-md px-7 py-4 font-bold uppercase tracking-wider glass-hover glass-fill"
            >
              Explore Mattress Brands
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={IMG.mattress}
              alt="Mattress showroom with several mattresses on display"
              loading="lazy"
              width={1200}
              height={912}
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <Container>
        <SectionHead
          eyebrow="Corporate Enquiries"
          title="Equip Your Team with Quality Uniforms."
          text="Factories, schools, hotels, conservancies, security companies, tour operators and corporates — tell us what you need."
        />
        <EnquiryForm />
      </Container>
      <CtaBand />
    </>
  );
}
