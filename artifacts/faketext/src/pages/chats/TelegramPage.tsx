import { useState } from "react";
import { ChevronLeft, Phone, MoreVertical, Paperclip, Smile, Mic, Check, CheckCheck } from "lucide-react";
import { ChatMessage, ChatConfig, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { MessageEditor, ContactPanel, Avatar, StatusBar } from "@/components/MessageEditor";
import { useSeo } from "@/lib/seo";

const initialMsgs: ChatMessage[] = [
  { id: uid(), sender: "them", text: "Hey! Did you read the docs I sent?", time: "14:21" },
  { id: uid(), sender: "me", text: "Yep, just finished. Brilliant stuff 👌", time: "14:23", status: "read" },
  { id: uid(), sender: "them", text: "Glad you liked it 😊", time: "14:24" },
];

export default function TelegramPage() {
  useSeo({
    title: "Fake Telegram Chat Generator | FakeText.fun",
    description: "Generate realistic fake Telegram chat screenshots with the signature blue ticks and themes. Free PNG download.",
    path: "/chat/telegram",
  });
  const [config, setConfig] = useState<ChatConfig>({
    contactName: "Maya", online: true, time: "14:24", battery: 73, carrier: "Telegram", dark: false,
  });
  const [messages, setMessages] = useState<ChatMessage[]>(initialMsgs);
  return (
    <GeneratorLayout
      title="Fake Telegram Chat Generator"
      description="Build a fake Telegram chat with the iconic blue interface and double-tick read receipts."
      filename="fake-telegram.png"
      controls={<><ContactPanel config={config} setConfig={setConfig} /><MessageEditor messages={messages} setMessages={setMessages} /></>}
      preview={<TelegramPreview config={config} messages={messages} />}
    />
  );
}

function TelegramPreview({ config, messages }: { config: ChatConfig; messages: ChatMessage[] }) {
  const dark = config.dark;
  const bg = dark ? "#0e1621" : "#cfd8e3";
  const fg = dark ? "#fff" : "#000";
  const headerBg = dark ? "#17212b" : "#517da2";
  const meBubble = dark ? "#2b5278" : "#effdde";
  const themBubble = dark ? "#182533" : "#fff";
  return (
    <div className="rounded-[2.4rem] bg-black p-2 shadow-2xl" style={{ width: 360 }}>
      <div className="rounded-[2rem] overflow-hidden flex flex-col" style={{ background: bg, height: 720 }}>
        <div style={{ background: headerBg, color: "#fff" }}>
          <StatusBar time={config.time} battery={config.battery} dark />
          <div className="flex items-center px-3 py-2 gap-3">
            <ChevronLeft className="w-5 h-5" />
            <Avatar src={config.contactAvatar} name={config.contactName} className="w-9 h-9" color="bg-cyan-600" />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{config.contactName}</div>
              <div className="text-[11px] opacity-80">{config.online ? "online" : "last seen recently"}</div>
            </div>
            <Phone className="w-5 h-5" />
            <MoreVertical className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1 overflow-hidden px-3 py-3 space-y-1.5" style={{ color: fg }}>
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[78%] rounded-2xl px-3 py-1.5 shadow"
                   style={{
                     background: m.sender === "me" ? meBubble : themBubble,
                     color: m.sender === "me" ? (dark ? "#fff" : "#000") : (dark ? "#fff" : "#000"),
                     borderTopRightRadius: m.sender === "me" ? 4 : 16,
                     borderTopLeftRadius: m.sender === "them" ? 4 : 16,
                   }}>
                {m.image && <img src={m.image} alt="" className="rounded-xl max-w-full mb-1 max-h-48 object-cover" />}
                <div className="text-[14px] leading-snug whitespace-pre-wrap pr-12">{m.isVoice ? <span className="flex items-center gap-2"><Mic className="w-3.5 h-3.5" /> {m.voiceLen ?? "0:11"}</span> : m.text}</div>
                <div className="float-right -mt-3 ml-2 text-[10px] opacity-60 flex items-center gap-1">
                  <span>{m.time}</span>
                  {m.sender === "me" && (m.status === "read" ? <CheckCheck className="w-3.5 h-3.5" /> : m.status === "delivered" ? <Check className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5 opacity-50" />)}
                </div>
                <div style={{ clear: "both" }} />
              </div>
            </div>
          ))}
        </div>
        <div className="px-2 py-2 flex items-center gap-2" style={{ background: dark ? "#17212b" : "#fff" }}>
          <Smile className="w-6 h-6" style={{ color: dark ? "#fff" : "#777" }} />
          <div className="flex-1 px-3 py-1.5 text-sm" style={{ color: dark ? "#888" : "#999" }}>Message</div>
          <Paperclip className="w-5 h-5" style={{ color: dark ? "#fff" : "#777" }} />
          <Mic className="w-5 h-5" style={{ color: dark ? "#fff" : "#777" }} />
        </div>
      </div>
    </div>
  );
}
