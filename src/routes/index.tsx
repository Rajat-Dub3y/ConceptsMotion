import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  services,
  clients,
  testimonialsFallback,
  getPublishedPortfolioProjects,
} from "@/lib/site-data";
import heroImg from "@/assets/hero.jpg";
import Testimonials from "@/components/Testimonials";

export const Route = createFileRoute("/")({
  loader: async () => ({ projects: await getPublishedPortfolioProjects() }),
  component: Home,
  head: () => ({
    meta: [
      { title: "Concepts in Motion — Turning ideas into experiences" },
      {
        name: "description",
        content:
          "Boutique creative marketing agency based in Goa. Brand strategy, content, and creative direction for brands that value substance.",
      },
      { property: "og:title", content: "Concepts in Motion" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const { projects } = Route.useLoaderData();

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 md:pb-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] text-balance max-w-[20ch] mb-12 tracking-tight animate-fade-up">
            Turning ideas into experiences.
          </h1>
          <div className="flex justify-end">
            <p className="text-base md:text-lg max-w-[52ch] text-pretty text-charcoal/80 leading-relaxed">
              At Concepts In Motion, we specialize in storytelling, content strategy, and social media management. 
              We handle everything from high-level planning to day-to-day execution, building your brand's presence 
              with content that connects
            </p>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="px-6 pb-24">
        <div className="max-w-[1440px] mx-auto">
          <img
            src={heroImg}
            alt="Warm morning light through a linen curtain in a minimalist Goan interior"
            width={1920}
            height={1280}
            fetchPriority="high"
            className="w-full aspect-[16/9] object-cover rounded-sm"
          />
        </div>
      </section>

      {/* About preview */}
      <section className="py-24 md:py-32 px-6 bg-ink text-bone">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-end">
          <div>
            <span className="label-eyebrow opacity-50 block mb-8">01 / Identity</span>
            <h2 className="text-3xl md:text-4xl font-medium leading-tight text-balance max-w-[40ch] tracking-tight">
              We believe in quiet confidence and the power of human-first storytelling.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-base md:text-lg max-w-[56ch] text-pretty opacity-80 leading-relaxed">
              Our approach is rooted in the philosophy of a heavy matte magazine — intentional,
              weighted, and timeless. We don't chase trends; we build legacies through meticulous
              brand strategy and creative direction.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-bone text-ink px-5 py-2.5 rounded-full text-sm font-medium hover:bg-bone/90 transition-colors"
            >
              Learn our story
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-12 border-b border-ink/10 pb-4">
            <span className="label-eyebrow">02 / Capabilities</span>
            <span className="serif-italic hidden sm:inline">Specialized Creative Solutions</span>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-1">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to="/services"
                hash={s.slug}
                className="group py-5 border-b border-ink/5 flex justify-between items-center hover:border-ink transition-colors"
              >
                <span className="text-lg group-hover:translate-x-1 transition-transform">
                  {s.title}
                </span>
                <span className="label-eyebrow opacity-40">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="py-24 md:py-32 px-6 bg-smoke/40">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <span className="label-eyebrow block mb-4">03 / Case Studies</span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Selected works</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                className={`space-y-4 group ${i === 1 ? "lg:mt-16" : ""}`}
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
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{p.client}</p>
                    <p className="text-xs text-charcoal/60 mt-1">{p.category}</p>
                  </div>
                  <span className="serif-italic text-sm">{p.year}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm label-eyebrow hover:opacity-60 transition-opacity"
            >
              View archive →
            </Link>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 border-y border-ink/5">
        <div className="max-w-[1440px] mx-auto px-6">
          <span className="label-eyebrow opacity-60 block mb-10 text-center">Selected clients</span>
          <div className="flex flex-wrap px-10 items-center justify-between gap-x-12 gap-y-8 opacity-100">
            {clients.map((c) => (
              <img
                key={c.name}
                src={c.logo}
                alt={c.name}
                loading="lazy"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <Testimonials/>
    </SiteLayout>
  );
}
