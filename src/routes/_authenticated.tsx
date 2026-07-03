import { createFileRoute, Outlet, redirect, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    // Verify admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id);
    const isAdmin = (roles ?? []).some((r) => r.role === "admin");
    return { user: data.user, isAdmin };
  },
  component: AdminShell,
});

function AdminShell() {
  const { user, isAdmin } = Route.useRouteContext() as {
    user: { email?: string };
    isAdmin: boolean;
  };
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate({ to: "/auth", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function signOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-medium tracking-tight">Access restricted.</h1>
          <p className="mt-3 text-charcoal/70">
            Your account ({user.email}) is signed in but does not have admin access. Ask an existing
            admin to grant you the role.
          </p>
          <button
            onClick={signOut}
            className="mt-8 rounded-full bg-ink text-bone px-5 py-2.5 text-sm font-medium hover:bg-charcoal transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone flex flex-col">
      <header className="border-b border-ink/10 px-6 py-4 flex items-center justify-between bg-bone sticky top-0 z-40">
        <div className="flex items-center gap-8">
          <Link to="/admin" className="font-medium">
            CIM Admin
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-charcoal/80">
            <Link to="/admin" activeOptions={{ exact: true }} activeProps={{ className: "text-ink underline underline-offset-4" }}>
              Dashboard
            </Link>
            <Link to="/admin/leads" activeProps={{ className: "text-ink underline underline-offset-4" }}>
              Leads
            </Link>
            <Link to="/admin/testimonials" activeProps={{ className: "text-ink underline underline-offset-4" }}>
              Testimonials
            </Link>
            <Link to="/admin/portfolio" activeProps={{ className: "text-ink underline underline-offset-4" }}>
              Portfolio
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden sm:inline text-charcoal/60">{user.email}</span>
          <button
            onClick={signOut}
            disabled={signingOut}
            className="text-charcoal/80 hover:text-ink"
          >
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </header>
      <main className="flex-1 px-6 py-10 max-w-[1200px] w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
