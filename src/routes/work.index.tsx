import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getPublishedPortfolioProjects } from "@/lib/site-data";
import { ProjectCarousel } from "@/components/site/ProjectCarousel";

export const Route = createFileRoute("/work/")({
  loader: async () => ({ projects: await getPublishedPortfolioProjects() }),
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

// Alternating vertical offset so equal-size cards still feel arranged, not gridded
const offsetPattern = ["", "lg:mt-20", "lg:mt-8", "lg:mt-28"];

function WorkIndex() {
  const { projects } = Route.useLoaderData();

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
        <div className="max-w-[1440px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className={`group ${offsetPattern[i % offsetPattern.length]}`}
            >
              <div className="w-full aspect-[3/4] overflow-hidden rounded-sm bg-smoke">
                <ProjectCarousel
                  images={p.images?.length ? p.images.slice(0, 4) : [p.cover]}
                  alt={`${p.title} — ${p.client}`}
                />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium tracking-tight leading-snug">{p.title}</h2>
                <p className="mt-1 text-xs text-charcoal/60">
                  {p.client}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-charcoal/50">{p.category}</span>
                  <span className="serif-italic text-xs">{p.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}