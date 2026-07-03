import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { projects } from "@/lib/site-data";

export const Route = createFileRoute("/work/")({
  component: WorkIndex,
  head: () => ({
    meta: [
      { title: "Work — Concepts in Motion" },
      {
        name: "description",
        content: "Selected work from Concepts in Motion — a boutique creative agency in Goa.",
      },
      { property: "og:title", content: "Work — Concepts in Motion" },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
});

function WorkIndex() {
  return (
    <SiteLayout>
      <section className="pt-24 md:pt-32 pb-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <span className="label-eyebrow text-charcoal/60">Archive</span>
          <h1 className="mt-6 text-5xl md:text-7xl font-medium tracking-tight text-balance max-w-[20ch]">
            Selected work, quietly assembled.
          </h1>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <div className="w-full aspect-[4/5] overflow-hidden rounded-sm bg-smoke">
                <img
                  src={p.cover}
                  alt={`${p.title} — ${p.client}`}
                  loading="lazy"
                  width={1000}
                  height={1250}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-medium tracking-tight">{p.title}</h2>
                  <p className="mt-1 text-sm text-charcoal/60">
                    {p.client} — {p.category}
                  </p>
                </div>
                <span className="serif-italic text-sm">{p.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
