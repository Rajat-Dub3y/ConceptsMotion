import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: LeadsPage,
});

type Lead = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
};

function LeadsPage() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"all" | "new" | "reviewed" | "archived">("all");
  const [q, setQ] = useState("");

  const leads = useQuery({
    queryKey: ["admin", "leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Lead[];
    },
  });

  const filtered = (leads.data ?? []).filter((l) => {
    if (filter !== "all" && l.status !== filter) return false;
    if (q) {
      const s = q.toLowerCase();
      return [l.name, l.email, l.company, l.message].some((f) =>
        (f ?? "").toLowerCase().includes(s),
      );
    }
    return true;
  });

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (!error) qc.invalidateQueries({ queryKey: ["admin", "leads"] });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Leads</h1>
        <p className="mt-2 text-charcoal/70">Contact-form submissions from the site.</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2 text-sm">
          {(["all", "new", "reviewed", "archived"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full border ${
                filter === f ? "bg-ink text-bone border-ink" : "border-ink/15 hover:bg-ink/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, company…"
          className="flex-1 min-w-[240px] bg-transparent border border-ink/15 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-ink"
        />
      </div>

      <div className="border border-ink/10 rounded-sm divide-y divide-ink/10">
        {leads.isLoading && <div className="p-6 text-charcoal/60">Loading…</div>}
        {!leads.isLoading && filtered.length === 0 && (
          <div className="p-6 text-charcoal/60">No leads match.</div>
        )}
        {filtered.map((l) => (
          <details key={l.id} className="group">
            <summary className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-ink/[0.02]">
              <div>
                <div className="font-medium">
                  {l.name}
                  {l.company && <span className="text-charcoal/60"> — {l.company}</span>}
                </div>
                <div className="text-sm text-charcoal/60">
                  {l.email}
                  {l.phone && <span> · {l.phone}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="label-eyebrow px-2 py-1 rounded border border-ink/15">
                  {l.status}
                </span>
                <span className="text-sm text-charcoal/60">
                  {new Date(l.created_at).toLocaleString()}
                </span>
              </div>
            </summary>
            <div className="px-5 pb-5 space-y-4">
              <p className="whitespace-pre-wrap text-charcoal/85 leading-relaxed border-l-2 border-ink/20 pl-4">
                {l.message}
              </p>
              <div className="flex gap-2 text-sm">
                {(["new", "reviewed", "archived"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(l.id, s)}
                    disabled={l.status === s}
                    className="px-3 py-1 rounded-full border border-ink/15 hover:bg-ink/5 disabled:opacity-40"
                  >
                    Mark {s}
                  </button>
                ))}
                <a
                  href={`mailto:${l.email}`}
                  className="ml-auto px-3 py-1 rounded-full bg-ink text-bone hover:bg-charcoal transition-colors"
                >
                  Reply
                </a>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
