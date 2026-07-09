import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const nav = [
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    /* Change: Dynamic background class depending on the 'open' state */
    <header 
      className={`sticky top-0 z-50 border-b border-ink/5 transition-colors duration-200 ${
        open ? "bg-bone" : "bg-bone/85 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-medium tracking-tight text-ink hover:opacity-70 transition-opacity"
          onClick={() => setOpen(false)}
        >
          Concepts in Motion
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:opacity-60 transition-opacity"
              activeProps={{ className: "underline underline-offset-8 decoration-1" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden text-sm label-eyebrow"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      
      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-bone z-40 px-6 py-12 animate-fade-up">
          <nav className="flex flex-col gap-8">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-4xl font-medium tracking-tight"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}