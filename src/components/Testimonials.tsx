import { testimonialsFallback } from "@/lib/site-data";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-24 md:py-32 px-6 bg-ink text-bone">
      <div className="max-w-[1440px] mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonialsFallback.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-full flex-shrink-0 text-center px-4"
              >
                <div className="mb-8 flex justify-center">
                  <div className="size-1 bg-bone/30 rounded-full" />
                </div>

                <blockquote className="text-3xl md:text-5xl serif-italic leading-tight text-pretty max-w-[22ch] mx-auto mb-12">
                  "{testimonial.quote}"
                </blockquote>

                <cite className="not-italic">
                  <span className="block label-eyebrow opacity-60 mb-1">
                    {testimonial.role}
                  </span>
                  <span className="text-sm font-medium">
                    {testimonial.client}
                  </span>
                </cite>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials