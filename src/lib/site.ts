import ppe from "@/assets/ppe.jpg";
import school from "@/assets/school.jpg";
import embroidery from "@/assets/embroidery.jpg";
import ranger from "@/assets/ranger.jpg";
import hospitality from "@/assets/hospitality.jpg";
import bedroom from "@/assets/bedroom.jpg";
import corporate from "@/assets/corporate.jpg";
import fabrics from "@/assets/fabrics.jpg";
import mattress from "@/assets/mattress.jpg";
import factory from "@/assets/hero-factory.jpg";

/** Editable company contact configuration — only verified details supplied by the client. */
export const SITE = {
  name: "Maish Textile Industry & Maish Mattress Center",
  short: "Maish",
  phone: "0799 921 036",
  phoneIntl: "+254799921036",
  whatsapp: "254799921036",
  director: { name: "Maish", title: "Director", phone: "0722 899 178", phoneIntl: "+254722899178" },
  website: "maishfashionboutique.co.ke",
  location: "Narok CBD, opposite Shell Petrol Station, Narok, Kenya",
  mapLink: "https://maps.app.goo.gl/Fn5SnhjLF4VsX4xs9",
  handle: "@maishboutique",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/maishboutique" },
    { label: "Instagram", href: "https://www.instagram.com/maishboutique" },
    { label: "TikTok", href: "https://www.tiktok.com/@maishboutique" },
  ],
};

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const IMG = {
  ppe,
  school,
  embroidery,
  ranger,
  hospitality,
  bedroom,
  corporate,
  fabrics,
  mattress,
  factory,
};

export type Category = {
  id: string;
  group: "Workwear" | "Uniforms" | "Branding" | "Home";
  title: string;
  img: string;
  desc: string;
  items: string[];
  to:
    | "/uniforms"
    | "/school-uniforms"
    | "/embroidery"
    | "/textiles"
    | "/mattress-center"
    | "/contact";
};

export const CATEGORIES: Category[] = [
  {
    id: "ppe",
    group: "Workwear",
    title: "Industrial Workwear & PPE",
    img: ppe,
    to: "/uniforms",
    desc: "Durable overalls, high-visibility clothing and protective wear for factories, warehouses and construction sites.",
    items: [
      "Industrial overalls",
      "Protective workwear",
      "Waterproof overalls",
      "Safety boots",
      "Reflective & hi-vis clothing",
      "Protective aprons",
      "Industrial uniforms",
      "Factory & workshop wear",
      "General workplace PPE",
    ],
  },
  {
    id: "security",
    group: "Uniforms",
    title: "Security & Professional Uniforms",
    img: corporate,
    to: "/uniforms",
    desc: "Smart, hard-wearing uniforms for security teams and professional staff.",
    items: [
      "Security guard uniforms",
      "Corporate security clothing",
      "Professional shirts & trousers",
      "Uniform jackets",
      "Workwear accessories",
    ],
  },
  {
    id: "ranger",
    group: "Uniforms",
    title: "Rangers & Conservancy",
    img: ranger,
    to: "/uniforms",
    desc: "Field-ready khaki uniforms built for long days outdoors in conservancies and parks.",
    items: [
      "Ranger uniforms",
      "Conservancy uniforms",
      "Khaki shirts & trousers",
      "Outdoor field clothing",
      "Durable field jackets",
      "Protective outdoor wear",
    ],
  },
  {
    id: "safari",
    group: "Uniforms",
    title: "Tour Guide & Safari",
    img: ranger,
    to: "/uniforms",
    desc: "Professional safari shirts, trousers and jackets for tourism and guiding teams.",
    items: [
      "Tour guide uniforms",
      "Safari shirts",
      "Khaki trousers",
      "Outdoor jackets",
      "Professional field uniforms",
    ],
  },
  {
    id: "hotel",
    group: "Uniforms",
    title: "Hotel & Hospitality",
    img: hospitality,
    to: "/uniforms",
    desc: "Coordinated kitchen, front-desk, restaurant and housekeeping uniforms.",
    items: [
      "Chef jackets & trousers",
      "Hospitality shirts",
      "Housekeeping uniforms",
      "Front-desk uniforms",
      "Waiter & waitress uniforms",
      "Waterproof & kitchen aprons",
    ],
  },
  {
    id: "school",
    group: "Uniforms",
    title: "School Uniforms — Countrywide",
    img: school,
    to: "/school-uniforms",
    desc: "Complete school uniforms for boys and girls, supplied to customers across Kenya.",
    items: [
      "Shirts, trousers & shorts",
      "Skirts & dresses",
      "Blazers & sweaters",
      "Ties & socks",
      "PE kits & tracksuits",
    ],
  },
  {
    id: "corporate",
    group: "Uniforms",
    title: "Corporate & Formal Wear",
    img: corporate,
    to: "/uniforms",
    desc: "Suits, Kaunda suits, blazers, polos and branded staff clothing.",
    items: [
      "Business suits",
      "Kaunda suits",
      "Blazers & formal trousers",
      "Corporate shirts",
      "Polo & round-neck T-shirts",
      "Corporate jackets",
      "Custom-branded clothing",
    ],
  },
  {
    id: "embroidery",
    group: "Branding",
    title: "Custom Embroidery & Branding",
    img: embroidery,
    to: "/embroidery",
    desc: "Logos, school badges and names stitched cleanly onto uniforms, caps and workwear.",
    items: [
      "Company logos",
      "School badges",
      "Name embroidery",
      "Embroidered workwear",
      "Hotel uniforms",
      "Caps & garments",
    ],
  },
  {
    id: "bedding",
    group: "Home",
    title: "Bedding, Curtains & Textiles",
    img: bedroom,
    to: "/textiles",
    desc: "Bed sheets, duvet covers, blankets, curtains and fabrics for homes and institutions.",
    items: [
      "Bed sheets",
      "Duvet covers",
      "Pillowcases",
      "Blankets",
      "Curtains & drapes",
      "Fabrics & materials",
    ],
  },
  {
    id: "mattress",
    group: "Home",
    title: "Mattress Center",
    img: mattress,
    to: "/mattress-center",
    desc: "Bobmil, Maharaja, Primefoam and Ndovu mattresses — multiple brands, one roof.",
    items: ["Bobmil", "Maharaja", "Primefoam", "Ndovu"],
  },
  {
    id: "custom",
    group: "Branding",
    title: "Custom Garments & Special Orders",
    img: fabrics,
    to: "/contact",
    desc: "Special institutional orders, custom designs and other textile requirements.",
    items: ["Custom designs", "Institutional orders", "Other garments", "Textile requirements"],
  },
];

export const STATS = [
  { value: 27, suffix: "", label: "Years in the market" },
  { value: 6, suffix: "", label: "Years serving the textile industry" },
  { value: 10000, suffix: "+", label: "Pieces supplied" },
  { value: 50, suffix: "+", label: "Organisations served" },
];

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/manufacturing", label: "Manufacturing" },
  { to: "/uniforms", label: "Uniforms & PPE" },
  { to: "/embroidery", label: "Embroidery" },
  { to: "/school-uniforms", label: "School Uniforms" },
  { to: "/textiles", label: "Textiles & Bedding" },
  { to: "/mattress-center", label: "Mattress Center" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;
