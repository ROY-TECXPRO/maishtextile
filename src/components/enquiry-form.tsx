import { useState, type FormEvent } from "react";
import { CATEGORIES, SITE, waLink } from "@/lib/site";

type Errors = Partial<Record<"name" | "contact" | "product", string>>;

export function EnquiryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as {
      name?: string;
      org?: string;
      contact?: string;
      product?: string;
      qty?: string;
      notes?: string;
    };
    const errs: Errors = {};
    if (!d.name?.trim()) errs.name = "Please enter your full name.";
    if (!d.contact?.trim() || d.contact.trim().length < 6)
      errs.contact = "Please enter a phone number or email.";
    if (!d.product) errs.product = "Please choose a product or service.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const msg = [
      "Hello Maish, corporate enquiry:",
      `Name: ${d.name}`,
      d.org && `Organisation: ${d.org}`,
      `Contact: ${d.contact}`,
      `Product/Service: ${d.product}`,
      d.qty && `Estimated quantity: ${d.qty}`,
      d.notes && `Requirements: ${d.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank", "noopener");
    setDone(true);
  };

  const field =
    "mt-1.5 w-full border border-input bg-background px-4 py-3 text-base outline-none focus:border-primary";
  const label = "text-sm font-bold uppercase tracking-wider";

  return (
    <form
      onSubmit={submit}
      noValidate
      className="grid gap-5 bg-card p-6 text-card-foreground shadow-card md:grid-cols-2 md:p-10"
    >
      <div>
        <label className={label} htmlFor="name">
          Full name *
        </label>
        <input id="name" name="name" className={field} aria-invalid={!!errors.name} />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
      </div>
      <div>
        <label className={label} htmlFor="org">
          Organisation
        </label>
        <input id="org" name="org" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="contact">
          Phone or email *
        </label>
        <input id="contact" name="contact" className={field} aria-invalid={!!errors.contact} />
        {errors.contact && <p className="mt-1 text-sm text-destructive">{errors.contact}</p>}
      </div>
      <div>
        <label className={label} htmlFor="product">
          Product or service *
        </label>
        <select
          id="product"
          name="product"
          defaultValue=""
          className={field}
          aria-invalid={!!errors.product}
        >
          <option value="" disabled>
            Select…
          </option>
          {CATEGORIES.map((c) => (
            <option key={c.id}>{c.title}</option>
          ))}
        </select>
        {errors.product && <p className="mt-1 text-sm text-destructive">{errors.product}</p>}
      </div>
      <div>
        <label className={label} htmlFor="qty">
          Estimated quantity
        </label>
        <input id="qty" name="qty" className={field} placeholder="Optional" />
      </div>
      <div className="md:col-span-2">
        <label className={label} htmlFor="notes">
          Additional requirements
        </label>
        <textarea id="notes" name="notes" rows={4} className={field} />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-signal px-6 py-4 font-bold uppercase tracking-wider text-signal-foreground hover:brightness-110 md:w-auto"
        >
          Send via WhatsApp
        </button>
        <p className="mt-3 text-sm text-muted-foreground">
          Your enquiry opens in WhatsApp to {SITE.phone} — nothing is stored on this website. Prefer
          to call? Dial{" "}
          <a className="font-bold text-primary" href={`tel:${SITE.phoneIntl}`}>
            {SITE.phone}
          </a>
          .
        </p>
        {done && (
          <p role="status" className="mt-3 border-l-4 border-signal bg-muted p-3 text-sm">
            WhatsApp opened with your message. Tap send there to deliver it to Maish.
          </p>
        )}
      </div>
    </form>
  );
}
