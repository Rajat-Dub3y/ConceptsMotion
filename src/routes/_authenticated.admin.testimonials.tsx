import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  component: TestimonialsPage,
});

type Testimonial = {
  id: string;
  client: string;
  role: string | null;
  quote: string;
  approved: boolean;
  sort_order: number;
  created_at: string;
};

function TestimonialsPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ client: "", role: "", quote: "" });
  const [busy, setBusy] = useState(false);

  const list = useQuery({
    queryKey: ["admin", "testimonials-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("testimonials").insert({
      client: form.client,
      role: form.role || null,
      quote: form.quote,
      approved: false,
    });
    setBusy(false);
    if (!error) {
      setForm({ client: "", role: "", quote: "" });
      qc.invalidateQueries({ queryKey: ["admin", "testimonials-all"] });
      qc.invalidateQueries({ queryKey: ["admin", "pending-testimonials"] });
    }
  }

  async function toggle(id: string, approved: boolean) {
    await supabase.from("testimonials").update({ approved: !approved }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin", "testimonials-all"] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin", "testimonials-all"] });
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Testimonials</h1>
        <p className="mt-2 text-charcoal/70">Approved testimonials appear on the site.</p>
      </div>

      <form onSubmit={add} className="border border-ink/10 rounded-sm p-6 space-y-4">
        <h2 className="text-lg font-medium">Add a testimonial</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            required
            placeholder="Client (e.g. Maiora Realty)"
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            className="bg-transparent border-b border-ink/20 py-2 focus:outline-none focus:border-ink"
          />
          <input
            placeholder="Role (e.g. Founder)"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="bg-transparent border-b border-ink/20 py-2 focus:outline-none focus:border-ink"
          />
        </div>
        <textarea
          required
          rows={3}
          placeholder="Quote"
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          className="w-full bg-transparent border-b border-ink/20 py-2 focus:outline-none focus:border-ink"
        />
        <div className="flex justify-end">
          <button
            disabled={busy}
            className="rounded-full bg-ink text-bone px-5 py-2 text-sm hover:bg-charcoal transition-colors disabled:opacity-50"
          >
            {busy ? "Adding…" : "Add"}
          </button>
        </div>
      </form>

      <div className="border border-ink/10 rounded-sm divide-y divide-ink/10">
        {list.isLoading && <div className="p-6 text-charcoal/60">Loading…</div>}
        {list.data?.length === 0 && (
          <div className="p-6 text-charcoal/60">No testimonials yet.</div>
        )}
        {list.data?.map((t) => (
          <div key={t.id} className="p-5 space-y-3">
            <p className="serif-italic text-lg">"{t.quote}"</p>
            <div className="flex flex-wrap justify-between gap-3 items-center">
              <div className="text-sm">
                <span className="font-medium">{t.client}</span>
                {t.role && <span className="text-charcoal/60"> — {t.role}</span>}
              </div>
              <div className="flex gap-2 items-center">
                <span
                  className={`label-eyebrow px-2 py-1 rounded border ${
                    t.approved ? "border-ink bg-ink text-bone" : "border-ink/15"
                  }`}
                >
                  {t.approved ? "Approved" : "Pending"}
                </span>
                <button
                  onClick={() => toggle(t.id, t.approved)}
                  className="text-sm px-3 py-1 rounded-full border border-ink/15 hover:bg-ink/5"
                >
                  {t.approved ? "Unapprove" : "Approve"}
                </button>
                <button
                  onClick={() => remove(t.id)}
                  className="text-sm px-3 py-1 rounded-full border border-destructive/40 text-destructive hover:bg-destructive/5"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
