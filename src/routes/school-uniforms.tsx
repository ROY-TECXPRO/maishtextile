import { createFileRoute } from "@tanstack/react-router";
import { Container, CtaBand, PageHero, Reveal, SectionHead, meta } from "@/components/site";
import { IMG } from "@/lib/site";

export const Route = createFileRoute("/school-uniforms")({
  head: () =>
    meta(
      "School Uniforms Across Kenya — Maish Textile Industry",
      "Complete boys' and girls' school uniforms, blazers, sweaters, ties, socks, PE kits and tracksuits supplied countrywide.",
    ),
  component: School,
});

const items = [
  "Boys' complete uniforms",
  "Girls' complete uniforms",
  "School shirts",
  "Trousers & shorts",
  "Skirts & dresses",
  "Blazers",
  "Sweaters",
  "Ties",
  "Socks",
  "PE kits & sportswear",
  "Tracksuits",
  "Other school clothing",
];
const swatches = [
  { name: "Maroon", cls: "bg-[oklch(0.38_0.12_20)]" },
  { name: "Navy", cls: "bg-navy" },
  { name: "Bottle green", cls: "bg-[oklch(0.38_0.09_160)]" },
  { name: "Grey", cls: "bg-[oklch(0.55_0.01_250)]" },
];

function School() {
  return (
    <>
      <PageHero
        eyebrow="Countrywide supply"
        title="School Uniforms for Kenya."
        text="Complete coordinated outfits for boys and girls, supplied to customers across the country."
        img={IMG.school}
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHead
              eyebrow="Full range"
              title="Head to Toe"
              text="Every piece a school needs, plus embroidered badges."
            />
            <ul className="grid grid-cols-2 gap-px bg-border">
              {items.map((i) => (
                <li key={i} className="bg-background p-4 text-sm font-semibold">
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={IMG.school}
              alt="Students in maroon sweaters, white shirts and grey uniforms"
              loading="lazy"
              width={1200}
              height={912}
              className="aspect-[4/3] w-full object-cover shadow-card"
            />
            <p className="mt-6 eyebrow">Common sweater colours</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {swatches.map((s) => (
                <span key={s.name} className="flex items-center gap-2 text-sm">
                  <span className={`h-6 w-6 border border-border ${s.cls}`} />
                  {s.name}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Your school's own colours can be matched — ask us.
            </p>
          </Reveal>
        </div>
      </Container>
      <CtaBand title="Need Uniforms for Your School? Get a Quote." />
    </>
  );
}
