import { ChatMessage, MsgStatus, Sender, uid } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowDown, ArrowUp, Image as ImageIcon, Mic, Plus, Trash2 } from "lucide-react";

interface Props {
  messages: ChatMessage[];
  setMessages: (m: ChatMessage[]) => void;
  meLabel?: string;
  themLabel?: string;
  showStatus?: boolean;
}

export function MessageEditor({ messages, setMessages, meLabel = "You", themLabel = "Them", showStatus = true }: Props) {
  function update(id: string, patch: Partial<ChatMessage>) {
    setMessages(messages.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }
  function remove(id: string) { setMessages(messages.filter((m) => m.id !== id)); }
  function move(id: string, dir: -1 | 1) {
    const i = messages.findIndex((m) => m.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= messages.length) return;
    const next = messages.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setMessages(next);
  }
  function add(sender: Sender) {
    setMessages([...messages, { id: uid(), sender, text: "New message", time: "10:00", status: "read" }]);
  }
  async function handleImage(id: string, file: File | null) {
    if (!file) { update(id, { image: undefined }); return; }
    const reader = new FileReader();
    reader.onload = () => update(id, { image: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Messages</Label>
        <span className="text-xs text-muted-foreground">{messages.length}</span>
      </div>
      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
        {messages.map((m, idx) => (
          <div key={m.id} className="rounded-lg border border-border p-3 bg-background">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex gap-1">
                <button
                  onClick={() => update(m.id, { sender: m.sender === "me" ? "them" : "me" })}
                  className={`text-xs px-2 py-1 rounded font-semibold ${m.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {m.sender === "me" ? meLabel : themLabel}
                </button>
                <button
                  onClick={() => update(m.id, { isVoice: !m.isVoice })}
                  className={`text-xs px-2 py-1 rounded ${m.isVoice ? "bg-accent text-accent-foreground" : "bg-muted"}`}
                  title="Voice note"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                <label className="text-xs px-2 py-1 rounded bg-muted cursor-pointer flex items-center" title="Attach image">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <input type="file" accept="image/*" hidden onChange={(e) => handleImage(m.id, e.target.files?.[0] ?? null)} />
                </label>
              </div>
              <div className="flex gap-1">
                <button onClick={() => move(m.id, -1)} disabled={idx === 0} className="p-1 hover:bg-muted rounded disabled:opacity-30"><ArrowUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => move(m.id, 1)} disabled={idx === messages.length - 1} className="p-1 hover:bg-muted rounded disabled:opacity-30"><ArrowDown className="w-3.5 h-3.5" /></button>
                <button onClick={() => remove(m.id)} className="p-1 hover:bg-destructive/10 text-destructive rounded"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            {!m.isVoice ? (
              <Textarea value={m.text} onChange={(e) => update(m.id, { text: e.target.value })} className="text-sm min-h-[44px]" />
            ) : (
              <Input value={m.voiceLen ?? "0:12"} onChange={(e) => update(m.id, { voiceLen: e.target.value })} placeholder="Voice length e.g. 0:12" className="text-sm" />
            )}
            {m.image && (
              <div className="mt-2 relative">
                <img src={m.image} alt="" className="rounded max-h-24" />
                <button onClick={() => update(m.id, { image: undefined })} className="absolute top-1 right-1 bg-black/60 text-white rounded px-1.5 text-xs">×</button>
              </div>
            )}
            <div className="mt-2 flex gap-2">
              <Input value={m.time} onChange={(e) => update(m.id, { time: e.target.value })} placeholder="10:42" className="text-xs h-8 w-24" />
              {showStatus && m.sender === "me" && (
                <select
                  value={m.status ?? "read"}
                  onChange={(e) => update(m.id, { status: e.target.value as MsgStatus })}
                  className="text-xs h-8 rounded border border-input bg-background px-2"
                >
                  <option value="sent">sent</option>
                  <option value="delivered">delivered</option>
                  <option value="read">read</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={() => add("them")} variant="outline" className="flex-1 rounded-lg"><Plus className="w-4 h-4 mr-1" /> {themLabel}</Button>
        <Button onClick={() => add("me")} className="flex-1 rounded-lg"><Plus className="w-4 h-4 mr-1" /> {meLabel}</Button>
      </div>
    </div>
  );
}

export function ContactPanel({
  config, setConfig, includeCarrier = true,
}: { config: any; setConfig: (c: any) => void; includeCarrier?: boolean }) {
  async function handleAvatar(file: File | null) {
    if (!file) { setConfig({ ...config, contactAvatar: undefined }); return; }
    const reader = new FileReader();
    reader.onload = () => setConfig({ ...config, contactAvatar: reader.result as string });
    reader.readAsDataURL(file);
  }
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">Contact</Label>
      <div>
        <Label className="text-xs">Name</Label>
        <Input value={config.contactName} onChange={(e) => setConfig({ ...config, contactName: e.target.value })} />
      </div>
      <div>
        <Label className="text-xs">Avatar</Label>
        <input type="file" accept="image/*" onChange={(e) => handleAvatar(e.target.files?.[0] ?? null)} className="text-xs" />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs">Online</Label>
        <Switch checked={config.online} onCheckedChange={(v) => setConfig({ ...config, online: v })} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Status bar time</Label>
          <Input value={config.time} onChange={(e) => setConfig({ ...config, time: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs">Battery %</Label>
          <Input type="number" value={config.battery} onChange={(e) => setConfig({ ...config, battery: Number(e.target.value) })} />
        </div>
      </div>
      {includeCarrier && (
        <div>
          <Label className="text-xs">Carrier</Label>
          <Input value={config.carrier} onChange={(e) => setConfig({ ...config, carrier: e.target.value })} />
        </div>
      )}
      <div className="flex items-center justify-between">
        <Label className="text-xs">Dark phone theme</Label>
        <Switch checked={config.dark} onCheckedChange={(v) => setConfig({ ...config, dark: v })} />
      </div>
    </div>
  );
}

export function Avatar({ src, name, className = "w-9 h-9", color = "bg-emerald-500" }: { src?: string; name: string; className?: string; color?: string }) {
  if (src) return <img src={src} alt="" className={`${className} rounded-full object-cover`} />;
  const letter = (name?.trim()?.[0] ?? "?").toUpperCase();
  return (
    <div className={`${className} rounded-full ${color} text-white font-bold flex items-center justify-center`}>
      {letter}
    </div>
  );
}

export function StatusBar({ time, battery, carrier, dark }: { time: string; battery: number; carrier?: string; dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-5 py-1 text-[11px] font-semibold ${dark ? "text-white" : "text-black"}`}>
      <span>{time}</span>
      <span className="flex items-center gap-1">
        {carrier && <span className="opacity-80">{carrier}</span>}
        <span>•••</span>
        <span>📶</span>
        <span className="ml-1 inline-flex items-center gap-0.5">
          <span>{battery}%</span>
          <span className="inline-block w-5 h-2.5 border rounded-sm relative" style={{ borderColor: dark ? "#fff" : "#000" }}>
            <span className="block h-full" style={{ width: `${Math.max(8, Math.min(100, battery))}%`, background: dark ? "#fff" : "#000" }} />
          </span>
        </span>
      </span>
    </div>
  );
}
