import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { submitLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Concepts in Motion" },
      {
        name: "description",
        content: "Start a conversation with Concepts in Motion — boutique creative marketing in Goa.",
      },
      { property: "og:title", content: "Contact — Concepts in Motion" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const send = useServerFn(submitLead);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
    };
    setState("sending");
    setError(null);
    try {
      await send({ data });
      setState("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <SiteLayout>
      <section className="pt-24 md:pt-32 pb-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <span className="label-eyebrow text-charcoal/60">Get in touch</span>
          <h1 className="mt-6 text-5xl md:text-7xl font-medium tracking-tight text-balance max-w-[18ch]">
            Let's create something meaningful.
          </h1>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
          <aside className="md:col-span-4 space-y-10">
            <div>
              <span className="label-eyebrow opacity-60 block mb-3">Direct</span>
              <a href="mailto:conceptsinmotion.in@gmail.com" className="block text-lg hover:underline underline-offset-4">
                conceptsinmotion.in@gmail.com
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="block text-lg hover:underline underline-offset-4 mt-2">
                WhatsApp
              </a>
            </div>
            <div>
              <span className="label-eyebrow opacity-60 block mb-3">Social</span>
              <a href="https://instagram.com/conceptsinmotion.in" target="_blank" rel="noreferrer" className="block text-lg hover:underline underline-offset-4">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="block text-lg hover:underline underline-offset-4 mt-2">
                LinkedIn
              </a>
            </div>
            <div>
              <span className="label-eyebrow opacity-60 block mb-3">Studio</span>
              <p className="text-lg">Goa, India</p>
            </div>
          </aside>

          <div className="md:col-span-8">
            {state === "sent" ? (
              <div className="border border-ink/10 rounded-sm p-10 text-center">
                <span className="serif-italic text-2xl block mb-3">Thank you.</span>
                <p className="text-charcoal/70">
                  Your message is in. We reply personally, usually within two working days.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="mt-6 label-eyebrow hover:opacity-60 transition-opacity"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Name" name="name" required />
                  <Field label="Company" name="company" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>
                <Field label="Message" name="message" as="textarea" required />
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                {error && (
                  <p className="text-sm text-destructive" role="alert">{error}</p>
                )}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-charcoal/50 max-w-xs">
                    By sending, you agree to be contacted about your inquiry.
                  </p>
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="bg-ink text-bone px-6 py-3 rounded-full text-sm font-medium hover:bg-charcoal transition-colors disabled:opacity-50"
                  >
                    {state === "sending" ? "Sending…" : "Send message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  as = "input",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
}) {
  const commonCls =
    "w-full bg-transparent border-b border-ink/20 py-3 text-base text-ink placeholder:text-charcoal/40 focus:outline-none focus:border-ink transition-colors";
  return (
    <label className="block">
      <span className="label-eyebrow opacity-60 block mb-2">
        {label} {required && <span aria-hidden>*</span>}
      </span>
      {as === "textarea" ? (
        <textarea name={name} required={required} rows={5} className={commonCls} />
      ) : (
        <input name={name} type={type} required={required} className={commonCls} />
      )}
    </label>
  );
}
