import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-4">
      <div className="max-w-md text-center">
        <span className="label-eyebrow text-charcoal/60">404 / Not found</span>
        <h1 className="mt-6 text-5xl font-medium tracking-tight text-ink">Off the map.</h1>
        <p className="mt-4 text-sm text-charcoal/70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bone transition-colors hover:bg-charcoal"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-medium tracking-tight text-ink">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-charcoal/70">
          Something went wrong on our end. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bone transition-colors hover:bg-charcoal"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-transparent px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Concepts in Motion — Boutique creative marketing agency, Goa" },
      {
        name: "description",
        content:
          "Concepts in Motion is a boutique creative marketing agency in Goa turning ideas into experiences through brand strategy, content, and creative direction.",
      },
      { name: "author", content: "Concepts in Motion" },
      { property: "og:title", content: "Concepts in Motion" },
      {
        property: "og:description",
        content: "Turning ideas into experiences. A boutique creative marketing agency in Goa.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Concepts in Motion" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@conceptsinmotion" },
      { name: "theme-color", content: "#f5f2ed" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Concepts in Motion",
          url: "https://conceptsinmotion.in",
          email: "conceptsinmotion.in@gmail.com",
          slogan: "Turning ideas into experiences.",
          address: { "@type": "PostalAddress", addressLocality: "Goa", addressCountry: "IN" },
          sameAs: ["https://instagram.com/conceptsinmotion.in"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
