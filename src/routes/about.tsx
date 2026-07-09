import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import aboutImg from "@/assets/about.jpg";
import { clients } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Concepts in Motion" },
      {
        name: "description",
        content:
          "We are a boutique creative marketing agency in Goa. We build brand legacies through strategy, craft, and human-first storytelling.",
      },
      { property: "og:title", content: "About — Concepts in Motion" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="pt-24 md:pt-32 pb-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <span className="label-eyebrow text-charcoal/60">The studio</span>
          <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-balance max-w-[18ch]">
            A studio for brands with something to say.
          </h1>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1440px] mx-auto">
          <img
            src={aboutImg}
            alt="Editorial photograph of a plated dish at a modern restaurant"
            loading="lazy"
            width={1400}
            height={1000}
            className="w-full aspect-[7/5] object-cover rounded-sm"
          />
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 border-t border-ink/5">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="label-eyebrow text-charcoal/60">Our story</span>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg md:text-xl leading-relaxed text-pretty">
            <p>
              Concepts in Motion began as a small studio in Goa with an obsession for craft and a
              refusal to shout. We work with founders, chefs, hoteliers, and cultural entrepreneurs
              who care as much about the details as we do.
            </p>
            <p>
              Every project starts with a long conversation and a slow read. We spend more time
              listening than pitching, and more time editing than adding. What we ship should feel
              inevitable — like it could not have been anything else.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 border-t border-ink/5">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="label-eyebrow text-charcoal/60">Approach</span>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                t: "Strategy first",
                d: "Every visual decision follows a clear thesis about who the brand is and who it's for.",
              },
              {
                t: "Editorial craft",
                d: "We treat a caption like a headline and a grid like a magazine spread.",
              },
              {
                t: "Slow work",
                d: "We take fewer clients and give them more of our attention. It is the only way we know how to work.",
              },
              {
                t: "Quiet confidence",
                d: "Restraint over decoration. Substance over trend. Meaning over noise.",
              },
            ].map((v) => (
              <div key={v.t}>
                <h3 className="text-xl font-medium mb-3">{v.t}</h3>
                <p className="text-charcoal/70 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 border-t border-ink/5">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="label-eyebrow text-charcoal/60">Who we work with</span>
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-wrap gap-x-10 gap-y-6 opacity-70">
              {clients.map((c) => (
                <span key={c.name} className={`text-lg ${c.style}`}>
                  {c.display}
                </span>
              ))}
            </div>
            <p className="mt-10 max-w-[52ch] text-charcoal/70 leading-relaxed">
              Hospitality. Real estate. Lifestyle. Food & drink. Wellness. Cultural institutions. If
              your brand values substance over noise, we should probably talk.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
