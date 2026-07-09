import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const leads = useQuery({
    queryKey: ["admin", "leads-summary"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("id, name, email, company, created_at, status")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });
  const pendingTestimonials = useQuery({
    queryKey: ["admin", "pending-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, client, quote, approved, created_at")
        .eq("approved", false)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-medium tracking-tight">Overview</h1>
        <p className="mt-2 text-charcoal/70">Latest activity across the site.</p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Recent leads</h2>
          <Link to="/admin/leads" className="label-eyebrow hover:opacity-60">
            View all →
          </Link>
        </div>
        <div className="border border-ink/10 rounded-sm divide-y divide-ink/10">
          {leads.isLoading && <div className="p-6 text-charcoal/60">Loading…</div>}
          {leads.data?.length === 0 && <div className="p-6 text-charcoal/60">No leads yet.</div>}
          {leads.data?.map((l) => (
            <div key={l.id} className="p-5 flex flex-wrap justify-between gap-4">
              <div>
                <div className="font-medium">
                  {l.name} {l.company && <span className="text-charcoal/60">— {l.company}</span>}
                </div>
                <div className="text-sm text-charcoal/60">{l.email}</div>
              </div>
              <div className="text-sm text-charcoal/60">
                {new Date(l.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Pending testimonials</h2>
          <Link to="/admin/testimonials" className="label-eyebrow hover:opacity-60">
            Manage →
          </Link>
        </div>
        <div className="border border-ink/10 rounded-sm divide-y divide-ink/10">
          {pendingTestimonials.isLoading && <div className="p-6 text-charcoal/60">Loading…</div>}
          {pendingTestimonials.data?.length === 0 && (
            <div className="p-6 text-charcoal/60">Nothing pending.</div>
          )}
          {pendingTestimonials.data?.map((t) => (
            <div key={t.id} className="p-5">
              <p className="serif-italic">"{t.quote}"</p>
              <p className="mt-2 text-sm text-charcoal/60">— {t.client}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
