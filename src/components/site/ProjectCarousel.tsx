import { useState, useEffect, useRef } from "react";

interface ProjectCarouselProps {
  images: string[];
  alt: string;
}

export function ProjectCarousel({ images, alt }: ProjectCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, paused]);

  const goTo = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(index);
  };

  const step = (e: React.MouseEvent, dir: 1 | -1) => {
    e.preventDefault();
    e.stopPropagation();
    setActive((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div
      className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-smoke"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src + i}
          src={src}
          alt={`${alt} — image ${i + 1}`}
          loading="lazy"
          width={1000}
          height={1250}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => step(e, -1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ink/40 backdrop-blur-sm text-bone opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-ink/60"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => step(e, 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-ink/40 backdrop-blur-sm text-bone opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-ink/60"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                type="button"
                key={i}
                aria-label={`Go to image ${i + 1}`}
                onClick={(e) => goTo(e, i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-4 bg-bone" : "w-1.5 bg-bone/50 hover:bg-bone/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}