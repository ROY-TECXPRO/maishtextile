import { createFileRoute } from "@tanstack/react-router";
import { Globe, MapPin, MessageCircle, Phone, User } from "lucide-react";
import { Container, PageHero, SectionHead, meta } from "@/components/site";
import { EnquiryForm } from "@/components/enquiry-form";
import { IMG, SITE, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    meta(
      "Contact Maish | Narok CBD, Opposite Shell — 0799 921 036",
      "Call, WhatsApp or visit Maish Textile Industry & Mattress Center in Narok CBD, opposite Shell Petrol Station.",
    ),
  component: Contact,
});

function Contact() {
  const cards = [
    { icon: Phone, label: "Call us", value: SITE.phone, href: `tel:${SITE.phoneIntl}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: SITE.phone,
      href: waLink("Hello Maish, I'd like to make an enquiry."),
    },
    {
      icon: User,
      label: `Director — ${SITE.director.name}`,
      value: SITE.director.phone,
      href: `tel:${SITE.director.phoneIntl}`,
    },
    {
      icon: MapPin,
      label: "Visit",
      value: SITE.location,
      href: SITE.mapLink,
    },
    { icon: Globe, label: "Website", value: SITE.website, href: `https://${SITE.website}` },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Talk Uniforms."
        text={`Find us in ${SITE.location}. Follow ${SITE.handle} on all social media.`}
        img={IMG.corporate}
      />
      <Container>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group bg-background p-6 hover:bg-muted"
            >
              <c.icon className="h-6 w-6 text-signal" />
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {c.label}
              </p>
              <p className="mt-1 font-bold group-hover:text-primary">{c.value}</p>
            </a>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {SITE.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="border border-border px-4 py-2.5 text-sm font-bold hover:border-primary"
            >
              {s.label} · {SITE.handle}
            </a>
          ))}
        </div>
      </Container>
      <section className="bg-muted">
        <Container>
          <SectionHead eyebrow="Corporate enquiry" title="Equip Your Team with Quality Uniforms." />
          <EnquiryForm />
        </Container>
      </section>
    </>
  );
}
