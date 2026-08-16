import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getPublishedPortfolioProjects } from "@/lib/site-data";

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params }) => {
    const project = (await getPublishedPortfolioProjects()).find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Concepts in Motion" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.title} — ${p.client} — Concepts in Motion` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.title} — ${p.client}` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: p.cover },
        { property: "og:url", content: `/work/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/work/${p.slug}` }],
    };
  },
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
  errorComponent: () => (
    <SiteLayout>
      <div className="py-32 px-6 text-center">
        <p className="text-lg">Something went wrong loading this project.</p>
      </div>
    </SiteLayout>
  ),
});

function ProjectNotFound() {
  return (
    <SiteLayout>
      <div className="py-32 px-6 text-center max-w-md mx-auto">
        <span className="label-eyebrow text-charcoal/60">Not found</span>
        <h1 className="mt-6 text-4xl font-medium tracking-tight">Project not available.</h1>
        <p className="mt-4 text-charcoal/70">This project may have moved or been unpublished.</p>
        <Link
          to="/work"
          className="mt-8 inline-flex items-center rounded-full bg-ink text-bone px-5 py-2.5 text-sm font-medium hover:bg-charcoal transition-colors"
        >
          Back to work
        </Link>
      </div>
    </SiteLayout>
  );
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData();

  const gallery = p.images?.length ? p.images : [p.cover];
  const hero = gallery[0] ?? p.cover;
  const portrait = gallery[1]; // undefined if only 1 image
  const gridLeft = gallery[2]; // undefined if fewer than 3 images
  const gridRight = gallery[3]; // undefined if fewer than 4 images

  return (
    <SiteLayout>
      {/* Header bar */}
      <section className="pt-20 md:pt-24 pb-6 px-6 border-b border-ink/10">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight">{p.title}</h1>
          <div className="flex items-center gap-3 label-eyebrow text-charcoal/60 text-xs">
            <span>{p.client}</span>
            <span>/</span>
            <span>{p.year}</span>
          </div>
        </div>
      </section>

      {/* Hero anchor */}
      <section className="px-6 pt-10 pb-14 md:pb-16">
        <div className="max-w-[1200px] mx-auto">
          <img
            src={hero}
            alt={`${p.title} — hero`}
            width={1920}
            height={900}
            fetchPriority="high"
            className="w-full max-h-[60vh] aspect-[16/9] object-cover rounded-sm"
          />
        </div>
      </section>

      {/* Split row — overview left, portrait image right (only if a 2nd image exists) */}
      <section className="px-6 pb-14 md:pb-16">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className={portrait ? "md:col-span-5" : "md:col-span-7"}>
            <span className="label-eyebrow text-charcoal/60 text-xs">Overview</span>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-pretty">
              {p.description}
            </p>
            <div className="mt-6 text-xs text-charcoal/60">{p.category}</div>
          </div>
          {portrait && (
            <div className="md:col-span-7">
              <img
                src={portrait}
                alt={`${p.title} — detail`}
                width={1000}
                height={750}
                loading="lazy"
                className="w-full max-h-[45vh] aspect-[4/3] object-cover rounded-sm"
              />
            </div>
          )}
        </div>
      </section>

      {/* Closing grid — adapts to 1 or 2 remaining images, hidden if none */}
      {gridLeft && (
        <section className="px-6 pb-20 md:pb-24">
          <div
            className={`max-w-[1200px] mx-auto grid gap-4 md:gap-6 ${
              gridRight ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            <img
              src={gridLeft}
              alt={`${p.title} — image 3`}
              width={gridRight ? 700 : 1200}
              height={gridRight ? 500 : 675}
              loading="lazy"
              className={`w-full object-cover rounded-sm ${
                gridRight ? "max-h-[38vh] aspect-[7/5]" : "max-h-[50vh] aspect-[16/9]"
              }`}
            />
            {gridRight && (
              <img
                src={gridRight}
                alt={`${p.title} — image 4`}
                width={700}
                height={500}
                loading="lazy"
                className="w-full max-h-[38vh] aspect-[7/5] object-cover rounded-sm"
              />
            )}
          </div>
        </section>
      )}

      {/* Footer nav */}
      <section className="pb-24 px-6 border-t border-ink/5 pt-10">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link to="/work" className="label-eyebrow hover:opacity-60 transition-opacity text-xs">
            ← All work
          </Link>
          <Link to="/contact" className="label-eyebrow hover:opacity-60 transition-opacity text-xs">
            Start a project →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}