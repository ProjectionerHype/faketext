import { useState } from "react";
import { ChevronLeft, Video, Plus, Mic, Camera } from "lucide-react";
import { ChatMessage, ChatConfig, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { MessageEditor, ContactPanel, Avatar, StatusBar } from "@/components/MessageEditor";
import { useSeo } from "@/lib/seo";

const initialMsgs: ChatMessage[] = [
  { id: uid(), sender: "them", text: "are we still on for tonight?", time: "6:38 PM" },
  { id: uid(), sender: "me", text: "absolutely 🍕", time: "6:40 PM", status: "read" },
  { id: uid(), sender: "me", text: "7pm same place?", time: "6:40 PM", status: "read" },
  { id: uid(), sender: "them", text: "perfect see you then ✨", time: "6:42 PM" },
];

export default function IMessagePage() {
  useSeo({
    title: "Fake iMessage Generator — iPhone Text Messages | FakeText.fun",
    description: "Create realistic fake iPhone iMessage screenshots. Blue and grey bubbles, read receipts, dark mode. Free download as PNG.",
    path: "/chat/imessage",
  });

  const [config, setConfig] = useState<ChatConfig>({
    contactName: "Sam ✨", online: true, time: "9:41", battery: 92, carrier: "Verizon LTE", dark: false,
  });
  const [messages, setMessages] = useState<ChatMessage[]>(initialMsgs);

  return (
    <GeneratorLayout
      title="Fake iMessage Generator"
      description="Build a believable iPhone iMessage screenshot. Blue bubbles, grey replies, read receipts and the iOS status bar."
      filename="fake-imessage.png"
      controls={
        <>
          <ContactPanel config={config} setConfig={setConfig} />
          <MessageEditor messages={messages} setMessages={setMessages} />
        </>
      }
      preview={<IMessagePreview config={config} messages={messages} />}
      faqs={[
        { q: "Can I make it look like dark mode iOS?", a: "Yes, toggle the dark theme switch in the contact panel." },
        { q: "How do I show 'Read 6:42 PM' under my message?", a: "Set the status of your last sent message to 'read' — the indicator will appear automatically." },
      ]}
    />
  );
}

function IMessagePreview({ config, messages }: { config: ChatConfig; messages: ChatMessage[] }) {
  const dark = config.dark;
  const bg = dark ? "#000" : "#fff";
  const fg = dark ? "#fff" : "#000";
  const them = dark ? "#26252a" : "#e9e9eb";
  const headerBg = dark ? "#1c1c1e" : "#f6f6f6";
  const lastMeIdx = [...messages].map((m, i) => ({ m, i })).reverse().find((x) => x.m.sender === "me")?.i ?? -1;

  return (
    <div className="rounded-[2.4rem] bg-black p-2 shadow-2xl" style={{ width: 360 }}>
      <div className="rounded-[2rem] overflow-hidden flex flex-col" style={{ background: bg, color: fg, height: 720 }}>
        <div style={{ background: headerBg, color: fg }} className="border-b" >
          <StatusBar time={config.time} battery={config.battery} carrier={config.carrier} dark={dark} />
          <div className="flex items-center px-3 py-2">
            <div className="flex items-center gap-1 text-[#0a84ff] w-16">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">5</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <Avatar src={config.contactAvatar} name={config.contactName} className="w-9 h-9" color="bg-zinc-400" />
              <div className="text-[11px] mt-1 flex items-center gap-1">{config.contactName} <span className="opacity-50">›</span></div>
            </div>
            <div className="w-16 flex justify-end"><Video className="w-5 h-5 text-[#0a84ff]" /></div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-3 py-3 space-y-1">
          <div className="text-center text-[11px] opacity-60 mb-3">iMessage · Today {config.time}</div>
          {messages.map((m, i) => (
            <div key={m.id}>
              <div className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[75%]">
                  {m.image && <img src={m.image} alt="" className="rounded-2xl max-w-full mb-1 max-h-48 object-cover" />}
                  {m.isVoice ? (
                    <div className={`flex items-center gap-2 rounded-full px-3 py-2 ${m.sender === "me" ? "bg-[#0a84ff] text-white" : ""}`}
                         style={m.sender === "them" ? { background: them, color: fg } : {}}>
                      <Mic className="w-3.5 h-3.5" />
                      <div className="w-24 h-3 flex items-center gap-0.5">
                        {Array.from({ length: 18 }).map((_, k) => (
                          <span key={k} className="w-0.5 bg-current rounded" style={{ height: `${4 + (k % 5) * 2}px` }} />
                        ))}
                      </div>
                      <span className="text-[10px] opacity-80">{m.voiceLen ?? "0:08"}</span>
                    </div>
                  ) : (
                    <div className={`px-3 py-2 rounded-[20px] text-[15px] leading-snug whitespace-pre-wrap ${m.sender === "me" ? "bg-[#0a84ff] text-white" : ""}`}
                         style={m.sender === "them" ? { background: them, color: fg } : {}}>
                      {m.text}
                    </div>
                  )}
                  {m.sender === "me" && i === lastMeIdx && m.status === "read" && (
                    <div className="text-[10px] text-right opacity-50 mt-0.5">Read {m.time}</div>
                  )}
                  {m.sender === "me" && i === lastMeIdx && m.status === "delivered" && (
                    <div className="text-[10px] text-right opacity-50 mt-0.5">Delivered</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`px-2 py-2 flex items-center gap-2 border-t`} style={{ borderColor: dark ? "#222" : "#e5e5e7" }}>
          <Plus className="w-7 h-7 text-[#0a84ff]" />
          <div className={`flex-1 px-3 py-1.5 rounded-full text-sm flex items-center justify-between border`}
               style={{ borderColor: dark ? "#333" : "#d1d1d4", color: dark ? "#777" : "#999" }}>
            iMessage <Mic className="w-4 h-4" />
          </div>
          <Camera className="w-6 h-6 text-[#0a84ff]" />
        </div>
      </div>
    </div>
  );
}
