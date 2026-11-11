import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Menu,
  X,
  Moon,
  Sun,
  ArrowUp,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
  ArrowRight,
  FileText,
  Send,
} from "lucide-react";
import { NAV, SITE, STATS, CATEGORIES, waLink, type Category } from "@/lib/site";
import { QuotationRequest } from "./quotation-request";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = sessionStorage.getItem("maish-theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    sessionStorage.setItem("maish-theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-10 w-10 place-items-center rounded-sm border border-navy-foreground/20 text-navy-foreground hover:bg-navy-foreground/10"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-navy/95 py-2 shadow-card backdrop-blur" : "bg-navy/40 py-4 backdrop-blur-sm"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 text-navy-foreground">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img src="/favicon.webp" alt="Maish" className="h-9 w-9" />
            <span className="leading-tight">
              <span className="block font-display text-sm font-black tracking-wider">MAISH</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] opacity-70">
                Textile · Mattress
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            {NAV.slice(1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-sm px-2.5 py-2 text-sm font-medium opacity-80 hover:opacity-100"
                activeProps={{ className: "!opacity-100 text-signal" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setQuoteOpen(true)}
              className="hidden bg-signal px-4 py-2.5 text-sm font-bold text-signal-foreground hover:brightness-110 flex items-center gap-2 sm:inline-flex"
              aria-label="Request quotation or invoice"
            >
              <FileText className="h-4 w-4" />
              Get a Quote
            </button>
            <Link
              to="/contact"
              className="hidden bg-signal px-4 py-2.5 text-sm font-bold text-signal-foreground hover:brightness-110 sm:inline-block"
            >
              Corporate Enquiry
            </Link>
            <button
              className="grid h-10 w-10 place-items-center xl:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            className="mx-4 mt-3 max-h-[80vh] overflow-y-auto border-t border-navy-foreground/15 bg-navy pb-4 xl:hidden"
            aria-label="Mobile"
          >
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block border-b border-navy-foreground/10 px-2 py-3.5 text-base font-medium text-navy-foreground"
                activeProps={{ className: "text-signal" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 block bg-signal py-3.5 text-center font-bold text-signal-foreground"
            >
              Request a Corporate Enquiry
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                setQuoteOpen(true);
              }}
              className="mt-4 mx-2 w-full bg-signal py-3.5 text-center font-bold text-signal-foreground flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Get a Quote / Invoice
            </button>
          </nav>
        )}
      </header>
      <QuotationRequest isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}

export function Footer() {
  return (
    <footer className="steel-lines bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-black">
            MAISH TEXTILE INDUSTRY
            <br />
            <span className="text-signal">& MAISH MATTRESS CENTER</span>
          </p>
          <p className="mt-4 max-w-md text-sm opacity-75">
            Uniforms, industrial protective wear, embroidery, school uniforms, textiles, bedding and
            mattresses — serving organisations and families from Narok, Kenya.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SITE.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="border border-navy-foreground/25 px-3 py-2 text-xs font-semibold uppercase tracking-wider hover:border-signal hover:text-signal"
              >
                {s.label} {SITE.handle}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            {NAV.slice(1).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-signal">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li>
              <a href={`tel:${SITE.phoneIntl}`} className="flex gap-2 hover:text-signal">
                <Phone className="h-4 w-4 shrink-0" /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.director.phoneIntl}`} className="flex gap-2 hover:text-signal">
                <Phone className="h-4 w-4 shrink-0" /> Director ({SITE.director.name}):{" "}
                {SITE.director.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <a
                href={SITE.mapLink}
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 hover:text-signal"
              >
                <MapPin className="h-4 w-4 shrink-0" /> {SITE.location}
              </a>
            </li>
            <li>
              <a href={`https://${SITE.website}`} className="flex gap-2 hover:text-signal">
                <Globe className="h-4 w-4 shrink-0" /> {SITE.website}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 px-4 py-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {SITE.name}. This website does not collect or store personal
        data; enquiries open in WhatsApp or your phone app.
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <a
        href={waLink("Hello Maish, I'd like to make an enquiry.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-signal text-signal-foreground shadow-card"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0 })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center bg-navy text-navy-foreground shadow-card"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  img,
}: {
  eyebrow: string;
  title: string;
  text: string;
  img: string;
}) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-navy text-navy-foreground">
      <img
        src={img}
        alt=""
        className="kenburns absolute inset-0 h-full w-full object-cover"
        width={1200}
        height={912}
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black uppercase leading-[0.95] md:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg opacity-85">{text}</p>
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black uppercase leading-none md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      if (reduce) return setN(value);
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1600);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <div className="grid grid-cols-2 border-l border-t border-border lg:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="border-b border-r border-border p-6 md:p-8">
          <p className="font-display text-4xl font-black text-primary md:text-6xl">
            <Counter value={s.value} suffix={s.suffix} />
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CategoryModal({ cat, onClose }: { cat: Category | null; onClose: () => void }) {
  useEffect(() => {
    if (!cat) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [cat, onClose]);
  if (!cat) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={cat.title}
      className="fixed inset-0 z-[60] grid place-items-center bg-navy/80 p-4 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-card text-card-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={cat.img} alt={cat.title} className="aspect-[16/9] w-full object-cover" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-navy text-navy-foreground"
          >
            <X />
          </button>
        </div>
        <div className="p-6 md:p-8">
          <p className="eyebrow">{cat.group}</p>
          <h3 className="mt-2 text-2xl font-black uppercase">{cat.title}</h3>
          <p className="mt-3 text-muted-foreground">{cat.desc}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {cat.items.map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 bg-signal" />
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink(`Hello Maish, I'd like to enquire about ${cat.title}.`)}
              target="_blank"
              rel="noreferrer"
              className="bg-signal px-5 py-3 text-sm font-bold text-signal-foreground"
            >
              Enquire on WhatsApp
            </a>
            <Link
              to={cat.to}
              onClick={onClose}
              className="border border-border px-5 py-3 text-sm font-bold hover:border-primary"
            >
              View Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryGrid({ ids, filters = true }: { ids?: string[]; filters?: boolean }) {
  const list = ids ? CATEGORIES.filter((c) => ids.includes(c.id)) : CATEGORIES;
  const groups = ["All", ...Array.from(new Set(list.map((c) => c.group)))];
  const [f, setF] = useState("All");
  const [active, setActive] = useState<Category | null>(null);
  const shown = f === "All" ? list : list.filter((c) => c.group === f);
  return (
    <>
      {filters && groups.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist">
          {groups.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={f === g}
              onClick={() => setF(g)}
              className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider ${f === g ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary"}`}
            >
              {g}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
        {shown.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 80}>
            <button
              onClick={() => setActive(c)}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-navy text-left text-navy-foreground"
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                width={1200}
                height={912}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="hero-overlay absolute inset-0 opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-6">
                <p className="eyebrow !text-[10px] md:!text-xs">{c.group}</p>
                <h3 className="mt-1 text-base font-black uppercase leading-tight md:text-2xl">
                  {c.title}
                </h3>
                <p className="mt-2 hidden text-sm opacity-80 md:block">{c.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-signal">
                  Explore{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      <CategoryModal cat={active} onClose={() => setActive(null)} />
    </>
  );
}

export function CtaBand({
  title = "Have a Specific Uniform or Garment Requirement? Let's Discuss It.",
}: {
  title?: string;
}) {
  return (
    <section className="steel-lines bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center">
        <h2 className="max-w-3xl text-2xl font-black uppercase leading-tight md:text-4xl">
          {title}
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${SITE.phoneIntl}`}
            className="bg-signal px-6 py-3.5 font-bold text-signal-foreground"
          >
            Call {SITE.phone}
          </a>
          <Link
            to="/contact"
            className="border border-primary-foreground/40 px-6 py-3.5 font-bold hover:bg-primary-foreground/10"
          >
            Send Enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-20 md:py-28 ${className}`}>{children}</section>
  );
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
