import { createFileRoute } from "@tanstack/react-router";
import { Container, CtaBand, PageHero, Reveal, SectionHead, Stats, meta } from "@/components/site";
import { IMG, SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    meta(
      "About Maish Textile Industry | 27 Years in Narok",
      "27 years in the market, six years in textiles, 10,000+ pieces supplied and 50+ organisations served.",
    ),
  component: About,
});

const audiences = [
  "Factories",
  "Schools",
  "Hotels",
  "Conservancies",
  "Security companies",
  "Tour operators",
  "Construction & industrial businesses",
  "Corporate organisations",
  "Retail & institutional customers",
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Built on Experience. Driven by Quality."
        text="A Narok business with 27 years in the market and six years serving the textile industry."
        img={IMG.factory}
      />
      <Container>
        <Stats />
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHead eyebrow="What we do" title="Uniforms, Textiles & Comfort" />
            <p className="text-lg text-muted-foreground">
              We supply professional uniforms, industrial protective wear, school uniforms, custom
              embroidery, bedding, curtains, textiles and branded mattresses. Our team works with
              organisations of every size to deliver garments that look sharp and last.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Visit us at{" "}
              <a
                href={SITE.mapLink}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-signal"
              >
                {SITE.location}
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Who we serve</p>
            <ul className="mt-4 grid gap-px bg-border sm:grid-cols-2">
              {audiences.map((a) => (
                <li key={a} className="bg-background p-4 font-semibold">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
