import { ReactNode, useRef, useState } from "react";
import { Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadPng, copyPng } from "@/lib/download";

interface Props {
  title: string;
  description: string;
  controls: ReactNode;
  preview: ReactNode;
  filename?: string;
  faqs?: { q: string; a: string }[];
  intro?: ReactNode;
}

export function GeneratorLayout({ title, description, controls, preview, filename = "faketext.png", faqs, intro }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    if (!ref.current) return;
    setBusy(true);
    try { await downloadPng(ref.current, filename); } finally { setBusy(false); }
  }
  async function handleCopy() {
    if (!ref.current) return;
    setBusy(true);
    try {
      const ok = await copyPng(ref.current);
      if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500); }
    } finally { setBusy(false); }
  }

  return (
    <div>
      <div className="border-b border-border bg-gradient-to-b from-muted/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{description}</p>
          {intro && <div className="mt-4 max-w-3xl text-sm text-muted-foreground">{intro}</div>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[400px_1fr] gap-6">
        <aside className="rounded-2xl border border-border bg-card p-5 space-y-5 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          {controls}
        </aside>

        <section>
          <div className="flex items-center justify-end gap-2 mb-3">
            <Button onClick={handleCopy} variant="outline" disabled={busy} className="rounded-lg">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy PNG"}
            </Button>
            <Button onClick={handleDownload} disabled={busy} className="rounded-lg font-semibold">
              <Download className="w-4 h-4 mr-2" /> Download PNG
            </Button>
          </div>
          <div className="flex justify-center">
            <div ref={ref} className="inline-block">{preview}</div>
          </div>
        </section>
      </div>

      {faqs && faqs.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-display text-2xl font-bold mb-4">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border border-border bg-card p-4">
                <summary className="cursor-pointer font-semibold list-none flex items-center justify-between">
                  {f.q} <span className="text-primary">+</span>
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
