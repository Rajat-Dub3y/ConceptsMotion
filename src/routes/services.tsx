import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Concepts in Motion" },
      {
        name: "description",
        content:
          "Brand strategy, creative direction, content, social, PR, event marketing, and paid social — from a boutique studio in Goa.",
      },
      { property: "og:title", content: "Services — Concepts in Motion" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="pt-24 md:pt-32 pb-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <span className="label-eyebrow text-charcoal/60">Capabilities</span>
          <h1 className="mt-6 text-5xl md:text-7xl font-medium tracking-tight text-balance max-w-[20ch]">
            Ten disciplines, one point of view.
          </h1>
          <p className="mt-8 max-w-[52ch] text-lg text-charcoal/70 leading-relaxed">
            We shape brands end-to-end, but every engagement is scoped to the outcome, not the
            deliverable. Below is what we tend to be asked for.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="grid md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-14 border-t border-ink/10 scroll-mt-24"
            >
              <div className="md:col-span-2 label-eyebrow text-charcoal/50">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="md:col-span-4">
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-balance">
                  {s.title}
                </h2>
              </div>
              <div className="md:col-span-6">
                <p className="text-lg text-charcoal/80 leading-relaxed text-pretty">
                  {s.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
