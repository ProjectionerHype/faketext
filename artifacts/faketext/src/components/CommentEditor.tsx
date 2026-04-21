import { CommentItem, PostConfig, uid } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, ArrowUp, ArrowDown, Reply } from "lucide-react";

export function PostPanel({
  config, setConfig, includeImage = true, includeViews = false, label = "Post",
}: { config: PostConfig; setConfig: (c: PostConfig) => void; includeImage?: boolean; includeViews?: boolean; label?: string }) {
  async function handleAvatar(file: File | null) {
    if (!file) return setConfig({ ...config, avatar: undefined });
    const r = new FileReader(); r.onload = () => setConfig({ ...config, avatar: r.result as string }); r.readAsDataURL(file);
  }
  async function handleImage(file: File | null) {
    if (!file) return setConfig({ ...config, image: undefined });
    const r = new FileReader(); r.onload = () => setConfig({ ...config, image: r.result as string }); r.readAsDataURL(file);
  }
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        <div><Label className="text-xs">Author name</Label><Input value={config.author} onChange={(e) => setConfig({ ...config, author: e.target.value })} /></div>
        <div><Label className="text-xs">Handle</Label><Input value={config.handle} onChange={(e) => setConfig({ ...config, handle: e.target.value })} /></div>
      </div>
      <div><Label className="text-xs">Avatar</Label><input type="file" accept="image/*" onChange={(e) => handleAvatar(e.target.files?.[0] ?? null)} className="text-xs" /></div>
      {includeImage && <div><Label className="text-xs">Post image (optional)</Label><input type="file" accept="image/*" onChange={(e) => handleImage(e.target.files?.[0] ?? null)} className="text-xs" /></div>}
      <div><Label className="text-xs">Post text</Label><Textarea value={config.text} onChange={(e) => setConfig({ ...config, text: e.target.value })} /></div>
      <div className="flex items-center justify-between"><Label className="text-xs">Verified</Label><Switch checked={config.verified} onCheckedChange={(v) => setConfig({ ...config, verified: v })} /></div>
      <div className="grid grid-cols-3 gap-2">
        <div><Label className="text-xs">Likes</Label><Input type="number" value={config.likes} onChange={(e) => setConfig({ ...config, likes: Number(e.target.value) })} /></div>
        <div><Label className="text-xs">Shares</Label><Input type="number" value={config.shares ?? 0} onChange={(e) => setConfig({ ...config, shares: Number(e.target.value) })} /></div>
        {includeViews && <div><Label className="text-xs">Views</Label><Input type="number" value={config.views ?? 0} onChange={(e) => setConfig({ ...config, views: Number(e.target.value) })} /></div>}
      </div>
      <div><Label className="text-xs">Posted</Label><Input value={config.time} onChange={(e) => setConfig({ ...config, time: e.target.value })} /></div>
      <div className="flex items-center justify-between"><Label className="text-xs">Dark mode</Label><Switch checked={config.dark} onCheckedChange={(v) => setConfig({ ...config, dark: v })} /></div>
    </div>
  );
}

export function CommentsEditor({
  comments, setComments, supportPin = true, supportHearted = true,
}: { comments: CommentItem[]; setComments: (c: CommentItem[]) => void; supportPin?: boolean; supportHearted?: boolean }) {
  function update(id: string, patch: Partial<CommentItem>) {
    setComments(comments.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }
  function remove(id: string) { setComments(comments.filter((c) => c.id !== id)); }
  function move(id: string, dir: -1 | 1) {
    const i = comments.findIndex((c) => c.id === id); const j = i + dir;
    if (i < 0 || j < 0 || j >= comments.length) return;
    const next = comments.slice(); [next[i], next[j]] = [next[j], next[i]]; setComments(next);
  }
  function addReply(id: string) {
    setComments(comments.map((c) => c.id === id
      ? { ...c, replies: [...(c.replies ?? []), { id: uid(), author: "user_99", text: "Real take", time: "1d", likes: 5 }] }
      : c));
  }
  function removeReply(id: string, rid: string) {
    setComments(comments.map((c) => c.id === id ? { ...c, replies: (c.replies ?? []).filter((r) => r.id !== rid) } : c));
  }
  function updateReply(id: string, rid: string, patch: Partial<CommentItem>) {
    setComments(comments.map((c) => c.id === id ? { ...c, replies: (c.replies ?? []).map((r) => r.id === rid ? { ...r, ...patch } : r) } : c));
  }
  function add() {
    setComments([...comments, { id: uid(), author: "newcomer", text: "first 🔥", time: "just now", likes: 12 }]);
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Comments</Label>
        <span className="text-xs text-muted-foreground">{comments.length}</span>
      </div>
      <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
        {comments.map((c, idx) => (
          <div key={c.id} className="rounded-lg border border-border p-3 bg-background space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Input value={c.author} onChange={(e) => update(c.id, { author: e.target.value })} className="text-xs h-7 w-32" placeholder="Author" />
                <label className="flex items-center gap-1 text-xs">
                  <input type="checkbox" checked={!!c.verified} onChange={(e) => update(c.id, { verified: e.target.checked })} /> verified
                </label>
              </div>
              <div className="flex gap-1">
                <button onClick={() => move(c.id, -1)} disabled={idx === 0} className="p-1 hover:bg-muted rounded disabled:opacity-30"><ArrowUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => move(c.id, 1)} disabled={idx === comments.length - 1} className="p-1 hover:bg-muted rounded disabled:opacity-30"><ArrowDown className="w-3.5 h-3.5" /></button>
                <button onClick={() => remove(c.id)} className="p-1 hover:bg-destructive/10 text-destructive rounded"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <Textarea value={c.text} onChange={(e) => update(c.id, { text: e.target.value })} className="text-sm min-h-[44px]" />
            <div className="flex items-center gap-2 flex-wrap">
              <Input value={c.time} onChange={(e) => update(c.id, { time: e.target.value })} className="text-xs h-7 w-20" placeholder="time" />
              <Input type="number" value={c.likes} onChange={(e) => update(c.id, { likes: Number(e.target.value) })} className="text-xs h-7 w-20" placeholder="likes" />
              {supportPin && <label className="text-xs flex items-center gap-1"><input type="checkbox" checked={!!c.pinned} onChange={(e) => update(c.id, { pinned: e.target.checked })} /> pinned</label>}
              {supportHearted && <label className="text-xs flex items-center gap-1"><input type="checkbox" checked={!!c.hearted} onChange={(e) => update(c.id, { hearted: e.target.checked })} /> ❤ creator</label>}
              <button onClick={() => addReply(c.id)} className="text-xs text-primary inline-flex items-center gap-1 hover:underline"><Reply className="w-3 h-3" /> reply</button>
            </div>
            {(c.replies ?? []).length > 0 && (
              <div className="pl-4 border-l-2 border-border space-y-2 mt-1">
                {(c.replies ?? []).map((r) => (
                  <div key={r.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Input value={r.author} onChange={(e) => updateReply(c.id, r.id, { author: e.target.value })} className="text-xs h-7 w-32" />
                      <button onClick={() => removeReply(c.id, r.id)} className="p-1 hover:bg-destructive/10 text-destructive rounded ml-auto"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <Textarea value={r.text} onChange={(e) => updateReply(c.id, r.id, { text: e.target.value })} className="text-sm min-h-[36px]" />
                    <div className="flex gap-2">
                      <Input value={r.time} onChange={(e) => updateReply(c.id, r.id, { time: e.target.value })} className="text-xs h-7 w-20" />
                      <Input type="number" value={r.likes} onChange={(e) => updateReply(c.id, r.id, { likes: Number(e.target.value) })} className="text-xs h-7 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Button onClick={add} className="w-full rounded-lg"><Plus className="w-4 h-4 mr-1" /> Add comment</Button>
    </div>
  );
}

export function fmtCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1) + "K";
  return n.toString();
}

export function VerifiedBadge({ color = "#1d9bf0", size = 14 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className="inline-block">
      <path fill={color} d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
    </svg>
  );
}
