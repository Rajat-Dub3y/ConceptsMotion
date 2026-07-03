import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/portfolio")({
  component: PortfolioPage,
});

type Project = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  category: string | null;
  description: string | null;
  cover_image: string | null;
  year: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
};

const empty = {
  slug: "",
  title: "",
  client: "",
  category: "",
  description: "",
  cover_image: "",
  year: "",
  published: false,
};

function PortfolioPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ ...empty });
  const [editing, setEditing] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const list = useQuery({
    queryKey: ["admin", "portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });

  function loadInto(p: Project) {
    setEditing(p.id);
    setForm({
      slug: p.slug,
      title: p.title,
      client: p.client ?? "",
      category: p.category ?? "",
      description: p.description ?? "",
      cover_image: p.cover_image ?? "",
      year: p.year ?? "",
      published: p.published,
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const payload = {
      slug: form.slug,
      title: form.title,
      client: form.client || null,
      category: form.category || null,
      description: form.description || null,
      cover_image: form.cover_image || null,
      year: form.year || null,
      published: form.published,
    };
    const { error } = editing
      ? await supabase.from("portfolio").update(payload).eq("id", editing)
      : await supabase.from("portfolio").insert(payload);
    setBusy(false);
    if (!error) {
      setForm({ ...empty });
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin", "portfolio"] });
    } else {
      alert(error.message);
    }
  }

  async function togglePublished(p: Project) {
    await supabase.from("portfolio").update({ published: !p.published }).eq("id", p.id);
    qc.invalidateQueries({ queryKey: ["admin", "portfolio"] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    await supabase.from("portfolio").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin", "portfolio"] });
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">Portfolio</h1>
        <p className="mt-2 text-charcoal/70">
          Manage case studies. Published projects appear on the public work archive.
        </p>
      </div>

      <form onSubmit={save} className="border border-ink/10 rounded-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">
            {editing ? "Edit project" : "Add a project"}
          </h2>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({ ...empty });
              }}
              className="text-sm text-charcoal/60 hover:text-ink"
            >
              Cancel
            </button>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required />
          <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <Input label="Client" value={form.client} onChange={(v) => setForm({ ...form, client: v })} />
          <Input label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
          <Input label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
          <Input label="Cover image URL" value={form.cover_image} onChange={(v) => setForm({ ...form, cover_image: v })} />
        </div>
        <label className="block">
          <span className="label-eyebrow opacity-60 block mb-2">Description</span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-transparent border-b border-ink/20 py-2 focus:outline-none focus:border-ink"
          />
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published
        </label>
        <div className="flex justify-end">
          <button
            disabled={busy}
            className="rounded-full bg-ink text-bone px-5 py-2 text-sm hover:bg-charcoal transition-colors disabled:opacity-50"
          >
            {busy ? "Saving…" : editing ? "Save changes" : "Add project"}
          </button>
        </div>
      </form>

      <div className="border border-ink/10 rounded-sm divide-y divide-ink/10">
        {list.isLoading && <div className="p-6 text-charcoal/60">Loading…</div>}
        {list.data?.length === 0 && <div className="p-6 text-charcoal/60">No projects yet.</div>}
        {list.data?.map((p) => (
          <div key={p.id} className="p-5 flex flex-wrap justify-between gap-4 items-center">
            <div>
              <div className="font-medium">
                {p.title}
                {p.client && <span className="text-charcoal/60"> — {p.client}</span>}
              </div>
              <div className="text-sm text-charcoal/60">
                /{p.slug} · {p.category ?? "—"} · {p.year ?? "—"}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span
                className={`label-eyebrow px-2 py-1 rounded border ${
                  p.published ? "border-ink bg-ink text-bone" : "border-ink/15"
                }`}
              >
                {p.published ? "Live" : "Draft"}
              </span>
              <button
                onClick={() => togglePublished(p)}
                className="text-sm px-3 py-1 rounded-full border border-ink/15 hover:bg-ink/5"
              >
                {p.published ? "Unpublish" : "Publish"}
              </button>
              <button
                onClick={() => loadInto(p)}
                className="text-sm px-3 py-1 rounded-full border border-ink/15 hover:bg-ink/5"
              >
                Edit
              </button>
              <button
                onClick={() => remove(p.id)}
                className="text-sm px-3 py-1 rounded-full border border-destructive/40 text-destructive hover:bg-destructive/5"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="label-eyebrow opacity-60 block mb-2">{label}</span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-ink/20 py-2 focus:outline-none focus:border-ink"
      />
    </label>
  );
}
