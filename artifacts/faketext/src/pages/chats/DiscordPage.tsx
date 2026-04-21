import { useState } from "react";
import { Hash, Bell, Pin, Users, Search, Inbox, HelpCircle, Plus, Gift, Sticker, Smile, Image as ImgIcon } from "lucide-react";
import { ChatMessage, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { MessageEditor, Avatar } from "@/components/MessageEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSeo } from "@/lib/seo";

interface DiscordCfg {
  channel: string;
  serverName: string;
  myName: string;
  themName: string;
  themColor: string;
  myColor: string;
}

const initialMsgs: ChatMessage[] = [
  { id: uid(), sender: "them", text: "did you push the build??", time: "Today at 3:14 PM" },
  { id: uid(), sender: "me", text: "yep, deploying now", time: "Today at 3:15 PM" },
  { id: uid(), sender: "them", text: "GOAT 🐐", time: "Today at 3:15 PM" },
];

export default function DiscordPage() {
  useSeo({
    title: "Fake Discord Chat Generator | FakeText.fun",
    description: "Generate realistic fake Discord channel chat screenshots with usernames, colors and timestamps.",
    path: "/chat/discord",
  });
  const [cfg, setCfg] = useState<DiscordCfg>({
    channel: "general", serverName: "the-best-server", myName: "you", themName: "darius",
    themColor: "#f59e0b", myColor: "#a855f7",
  });
  const [messages, setMessages] = useState<ChatMessage[]>(initialMsgs);
  return (
    <GeneratorLayout
      title="Fake Discord Chat Generator"
      description="Mock up a Discord channel conversation with usernames, colored handles and timestamps."
      filename="fake-discord.png"
      controls={
        <>
          <Label className="text-base font-semibold">Server</Label>
          <div><Label className="text-xs">Server name</Label><Input value={cfg.serverName} onChange={(e) => setCfg({ ...cfg, serverName: e.target.value })} /></div>
          <div><Label className="text-xs">Channel</Label><Input value={cfg.channel} onChange={(e) => setCfg({ ...cfg, channel: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><Label className="text-xs">Your name</Label><Input value={cfg.myName} onChange={(e) => setCfg({ ...cfg, myName: e.target.value })} /></div>
            <div><Label className="text-xs">Their name</Label><Input value={cfg.themName} onChange={(e) => setCfg({ ...cfg, themName: e.target.value })} /></div>
            <div><Label className="text-xs">Your color</Label><Input type="color" value={cfg.myColor} onChange={(e) => setCfg({ ...cfg, myColor: e.target.value })} /></div>
            <div><Label className="text-xs">Their color</Label><Input type="color" value={cfg.themColor} onChange={(e) => setCfg({ ...cfg, themColor: e.target.value })} /></div>
          </div>
          <MessageEditor messages={messages} setMessages={setMessages} meLabel={cfg.myName} themLabel={cfg.themName} showStatus={false} />
        </>
      }
      preview={<DiscordPreview cfg={cfg} messages={messages} />}
    />
  );
}

function DiscordPreview({ cfg, messages }: { cfg: DiscordCfg; messages: ChatMessage[] }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ width: 720, background: "#313338", color: "#dbdee1" }}>
      <div className="flex">
        <div style={{ background: "#1e1f22", width: 72 }} className="py-3 flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-bold">{cfg.serverName[0]?.toUpperCase()}</div>
          <div className="w-12 h-px bg-zinc-700" />
          <Plus className="w-6 h-6 text-emerald-400" />
        </div>
        <div style={{ background: "#2b2d31", width: 200 }} className="py-3 flex flex-col gap-1">
          <div className="px-3 pb-2 border-b border-zinc-800 font-semibold text-white">{cfg.serverName}</div>
          <div className="px-3 pt-2 text-[11px] uppercase tracking-wider text-zinc-400">Text Channels</div>
          <div className="px-2 mx-1 py-1.5 rounded text-zinc-200 flex items-center gap-2 text-sm bg-zinc-700/50"><Hash className="w-4 h-4" />{cfg.channel}</div>
          <div className="px-2 mx-1 py-1.5 rounded text-zinc-400 flex items-center gap-2 text-sm hover:bg-zinc-700/30"><Hash className="w-4 h-4" />random</div>
          <div className="px-2 mx-1 py-1.5 rounded text-zinc-400 flex items-center gap-2 text-sm hover:bg-zinc-700/30"><Hash className="w-4 h-4" />memes</div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="border-b border-zinc-800 px-4 py-3 flex items-center gap-3 text-white">
            <Hash className="w-5 h-5 text-zinc-400" />
            <span className="font-semibold">{cfg.channel}</span>
            <div className="ml-auto flex items-center gap-3 text-zinc-400">
              <Bell className="w-4 h-4" /><Pin className="w-4 h-4" /><Users className="w-4 h-4" /><Search className="w-4 h-4" /><Inbox className="w-4 h-4" /><HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="p-4 space-y-3" style={{ minHeight: 480 }}>
            {messages.map((m) => {
              const name = m.sender === "me" ? cfg.myName : cfg.themName;
              const color = m.sender === "me" ? cfg.myColor : cfg.themColor;
              return (
                <div key={m.id} className="flex gap-3">
                  <Avatar name={name} className="w-10 h-10" color="bg-zinc-600" />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold" style={{ color }}>{name}</span>
                      <span className="text-[11px] text-zinc-500">{m.time}</span>
                    </div>
                    {m.image && <img src={m.image} alt="" className="rounded-md max-w-sm mt-1 max-h-60 object-cover" />}
                    <div className="text-[15px] text-zinc-100 whitespace-pre-wrap">{m.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-3">
            <div className="bg-[#383a40] rounded-lg flex items-center px-3 py-2 gap-3 text-zinc-400">
              <Plus className="w-5 h-5" />
              <span className="flex-1">Message #{cfg.channel}</span>
              <Gift className="w-4 h-4" /><ImgIcon className="w-4 h-4" /><Sticker className="w-4 h-4" /><Smile className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
