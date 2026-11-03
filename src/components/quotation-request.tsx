import { useState, type FormEvent } from "react";
import { X, FileText, Send } from "lucide-react";
import { CATEGORIES, SITE, waLink } from "@/lib/site";

type Errors = Partial<Record<"name" | "org" | "contact" | "product" | "qty", string>>;

export function QuotationRequest({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as {
      name?: string;
      org?: string;
      contact?: string;
      product?: string;
      qty?: string;
      notes?: string;
      type?: string;
    };
    const errs: Errors = {};
    if (!d.name?.trim()) errs.name = "Please enter your full name.";
    if (!d.contact?.trim() || d.contact.trim().length < 6)
      errs.contact = "Please enter a phone number or email.";
    if (!d.product) errs.product = "Please choose a product or service.";
    if (!d.type) errs.type = "Please select quotation or invoice.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    const msg = [
      `Hello Maish, ${d.type === "quotation" ? "request for quotation" : "invoice request"}:`,
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
    setSubmitting(false);
  };

  if (!isOpen) return null;

  const field =
    "mt-1.5 w-full border border-input bg-background px-4 py-3 text-base outline-none focus:border-primary";
  const label = "text-sm font-bold uppercase tracking-wider";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request Quotation or Invoice"
      className="fixed inset-0 z-[60] grid place-items-center bg-navy/80 p-4 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-card text-card-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center bg-navy text-navy-foreground rounded-full hover:bg-navy/80"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="p-6 md:p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-signal" />
            <h3 className="mt-4 text-2xl font-black uppercase">
              Request {done ? "Sent" : "Quotation / Invoice"}
            </h3>
            <p className="mt-2 text-muted-foreground">
              Fill in your details and we'll send it via WhatsApp.
            </p>
          </div>
        </div>
        {!done ? (
          <form onSubmit={submit} noValidate className="p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <label className={label} htmlFor="type">
                Request type *
              </label>
              <label className={label} htmlFor="type">
                {" "}
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="quotation"
                  defaultChecked
                  className="h-4 w-4 text-signal border-border focus:ring-signal"
                />
                <span className="text-sm font-medium">Quotation</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="invoice"
                  className="h-4 w-4 text-signal border-border focus:ring-signal"
                />
                <span className="text-sm font-medium">Invoice</span>
              </label>
            </div>
            {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}

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
              <input
                id="org"
                name="org"
                className={field}
                placeholder="Company, school, hotel, etc."
              />
            </div>
            <div>
              <label className={label} htmlFor="contact">
                Phone or email *
              </label>
              <input
                id="contact"
                name="contact"
                className={field}
                aria-invalid={!!errors.contact}
              />
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
            <div>
              <label className={label} htmlFor="notes">
                Additional requirements
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className={field}
                placeholder="Colours, sizes, branding details, delivery location..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-signal px-6 py-4 font-bold uppercase tracking-wider text-signal-foreground hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              {submitting ? "Sending…" : "Send via WhatsApp"}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Your request opens in WhatsApp to {SITE.phone} — nothing is stored on this website.
            </p>
          </form>
        ) : (
          <div className="p-6 md:p-8 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-signal/10">
              <FileText className="h-8 w-8 text-signal" />
            </div>
            <h4 className="text-xl font-black">Request Sent!</h4>
            <p className="mt-2 text-muted-foreground">
              WhatsApp opened with your{" "}
              {errors.type === "invoice" ? "invoice request" : "quotation request"}. Tap send there
              to deliver it to Maish.
            </p>
            <button
              onClick={() => {
                setDone(false);
                setErrors({});
              }}
              className="mt-6 bg-signal px-6 py-3 font-bold text-signal-foreground"
            >
              Send Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
