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
  return (
    <SiteLayout>
      <section className="pt-24 md:pt-32 pb-12 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-wrap items-center gap-3 label-eyebrow text-charcoal/60">
            <span>{p.client}</span>
            <span>/</span>
            <span>{p.category}</span>
            <span>/</span>
            <span>{p.year}</span>
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-medium tracking-tight text-balance max-w-[24ch]">
            {p.title}
          </h1>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1440px] mx-auto">
          <img
            src={p.cover}
            alt={`${p.title} cover`}
            width={1600}
            height={2000}
            className="w-full aspect-[4/5] md:aspect-[16/10] object-cover rounded-sm"
          />
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="label-eyebrow text-charcoal/60">Overview</span>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl md:text-2xl leading-relaxed text-pretty">{p.description}</p>
          </div>
        </div>
      </section>

      <section className="pb-32 px-6 border-t border-ink/5 pt-16">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <Link to="/work" className="label-eyebrow hover:opacity-60 transition-opacity">
            ← All work
          </Link>
          <Link to="/contact" className="label-eyebrow hover:opacity-60 transition-opacity">
            Start a project →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
