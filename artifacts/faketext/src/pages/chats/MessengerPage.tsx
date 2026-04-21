import { useState } from "react";
import { ChevronLeft, Phone, Video, Info, Mic, Plus, Image as ImgIcon, Sticker, Camera, ThumbsUp } from "lucide-react";
import { ChatMessage, ChatConfig, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { MessageEditor, ContactPanel, Avatar, StatusBar } from "@/components/MessageEditor";
import { useSeo } from "@/lib/seo";

const initialMsgs: ChatMessage[] = [
  { id: uid(), sender: "them", text: "u up?", time: "11:42 PM" },
  { id: uid(), sender: "me", text: "yeah what's up", time: "11:43 PM", status: "read" },
  { id: uid(), sender: "them", text: "wanna grab pizza tomorrow", time: "11:43 PM" },
  { id: uid(), sender: "me", text: "i was literally just thinking about pizza", time: "11:44 PM", status: "read" },
];

export default function MessengerPage() {
  useSeo({
    title: "Fake Messenger Chat Generator — Facebook Messenger | FakeText.fun",
    description: "Generate fake Facebook Messenger chat screenshots with blue gradient bubbles. Free download.",
    path: "/chat/messenger",
  });
  const [config, setConfig] = useState<ChatConfig>({
    contactName: "Jordan", online: true, time: "11:44", battery: 64, carrier: "5G", dark: false,
  });
  const [messages, setMessages] = useState<ChatMessage[]>(initialMsgs);
  return (
    <GeneratorLayout
      title="Fake Messenger Chat Generator"
      description="Mock a Facebook Messenger conversation with the iconic blue gradient bubbles."
      filename="fake-messenger.png"
      controls={<><ContactPanel config={config} setConfig={setConfig} /><MessageEditor messages={messages} setMessages={setMessages} /></>}
      preview={<MessengerPreview config={config} messages={messages} />}
      faqs={[
        { q: "Why is the bubble a blue gradient?", a: "Messenger uses a blue→purple gradient for outgoing messages. We replicate it." },
      ]}
    />
  );
}

function MessengerPreview({ config, messages }: { config: ChatConfig; messages: ChatMessage[] }) {
  const dark = config.dark;
  const bg = dark ? "#000" : "#fff";
  const fg = dark ? "#fff" : "#000";
  const them = dark ? "#3a3b3c" : "#e4e6eb";
  return (
    <div className="rounded-[2.4rem] bg-black p-2 shadow-2xl" style={{ width: 360 }}>
      <div className="rounded-[2rem] overflow-hidden flex flex-col" style={{ background: bg, color: fg, height: 720 }}>
        <StatusBar time={config.time} battery={config.battery} dark={dark} />
        <div className="flex items-center px-3 py-2 gap-2 border-b" style={{ borderColor: dark ? "#222" : "#e5e5e7" }}>
          <ChevronLeft className="w-6 h-6 text-blue-500" />
          <Avatar src={config.contactAvatar} name={config.contactName} className="w-9 h-9" color="bg-blue-500" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{config.contactName}</div>
            <div className="text-[11px] opacity-60">{config.online ? "Active now" : "Active 5m ago"}</div>
          </div>
          <Phone className="w-5 h-5 text-blue-500" />
          <Video className="w-5 h-5 text-blue-500" />
          <Info className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1 overflow-hidden px-3 py-3 space-y-1.5">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-end gap-2 ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
              {m.sender === "them" && <Avatar src={config.contactAvatar} name={config.contactName} className="w-6 h-6" color="bg-blue-500" />}
              <div className="max-w-[72%]">
                {m.image && <img src={m.image} alt="" className="rounded-2xl max-w-full mb-1 max-h-48 object-cover" />}
                <div className="px-3 py-2 rounded-3xl text-[14px] leading-snug whitespace-pre-wrap"
                     style={m.sender === "me"
                       ? { background: "linear-gradient(135deg,#0084ff,#a020f0)", color: "#fff" }
                       : { background: them, color: fg }}>
                  {m.isVoice ? <span className="flex items-center gap-2"><Mic className="w-3.5 h-3.5" /> {m.voiceLen ?? "0:09"}</span> : m.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-2 py-2 flex items-center gap-2 border-t" style={{ borderColor: dark ? "#222" : "#e5e5e7" }}>
          <Plus className="w-6 h-6 text-blue-500" />
          <Camera className="w-6 h-6 text-blue-500" />
          <ImgIcon className="w-6 h-6 text-blue-500" />
          <Mic className="w-6 h-6 text-blue-500" />
          <div className="flex-1 px-3 py-1.5 rounded-full text-sm" style={{ background: dark ? "#222" : "#f0f2f5", color: dark ? "#888" : "#999" }}>Aa</div>
          <ThumbsUp className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </div>
  );
}
