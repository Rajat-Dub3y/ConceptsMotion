import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="pt-32 pb-12 px-6 border-t border-ink/5 bg-bone">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 mb-24">
          <div>
            <h2 className="text-4xl md:text-5xl font-medium mb-8 tracking-tight text-balance">
              Ready to move together?
            </h2>
            <p className="text-base text-pretty max-w-[56ch] text-charcoal/70 mb-10">
              We are currently accepting new projects. Reach out to start a conversation about your
              brand's next chapter.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="bg-ink text-bone px-5 py-2.5 rounded-full text-sm font-medium hover:bg-charcoal transition-colors"
              >
                Send an inquiry
              </Link>
              <Link
                to="/work"
                className="border border-ink/15 text-ink px-5 py-2.5 rounded-full text-sm font-medium hover:bg-ink/5 transition-colors"
              >
                View our work
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 text-sm">
            <div className="space-y-4">
              <span className="label-eyebrow opacity-40 block">Connect</span>
              <nav className="flex flex-col gap-2">
                <a
                  href="https://instagram.com/conceptsinmotion.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  LinkedIn
                </a>
                <a
                  href="https://wa.me/919167430791"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  WhatsApp
                </a>
              </nav>
            </div>
            <div className="space-y-4">
              <span className="label-eyebrow opacity-40 block">Inquiries</span>
              <a
                href="mailto:conceptsinmotion.in@gmail.com"
                className="hover:underline underline-offset-4"
              >
                conceptsinmotion.in@gmail.com
              </a>
              <p className="text-charcoal/60">Goa, India</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-10 border-t border-ink/5">
          <span className="text-6xl md:text-9xl font-medium tracking-tighter opacity-[0.06] leading-none select-none">
            Concepts in Motion
          </span>
          <p className="label-eyebrow opacity-40">
            © {new Date().getFullYear()} Concepts in Motion. All rights reserved.
          </p>
        </div>
      </div>
      <a
        href="https://wa.me/919167430791"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-ink text-bone rounded-full h-12 px-5 flex items-center gap-2 text-sm font-medium shadow-lg hover:bg-charcoal transition-colors"
      >
        <span className="size-2 rounded-full bg-bone/80" />
        WhatsApp
      </a>
    </footer>
  );
}
