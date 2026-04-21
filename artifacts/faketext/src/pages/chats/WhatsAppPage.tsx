import { useState } from "react";
import { ArrowLeft, Phone, Video, MoreVertical, Plus, Smile, Mic, Camera, Check, CheckCheck, Play } from "lucide-react";
import { ChatMessage, ChatConfig, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { MessageEditor, ContactPanel, Avatar, StatusBar } from "@/components/MessageEditor";
import { useSeo } from "@/lib/seo";

const initialMsgs: ChatMessage[] = [
  { id: uid(), sender: "them", text: "Hey! Where are you?", time: "10:42", status: "read" },
  { id: uid(), sender: "me", text: "Just left the office, on my way 🚗", time: "10:43", status: "read" },
  { id: uid(), sender: "them", text: "Okay perfect, I ordered already", time: "10:43", status: "read" },
  { id: uid(), sender: "me", text: "You're the best 🙏", time: "10:44", status: "delivered" },
];

export default function WhatsAppPage() {
  useSeo({
    title: "Fake WhatsApp Chat Generator — Free, No Watermark | FakeText.fun",
    description: "Create a realistic fake WhatsApp chat screenshot in seconds. Add messages, voice notes, read receipts and download as PNG. Free & no signup.",
    path: "/chat/whatsapp",
  });

  const [config, setConfig] = useState<ChatConfig>({
    contactName: "Sara ❤️", online: true, time: "10:44", battery: 87, carrier: "WhatsApp", dark: true,
  });
  const [messages, setMessages] = useState<ChatMessage[]>(initialMsgs);

  return (
    <GeneratorLayout
      title="Fake WhatsApp Chat Generator"
      description="Build a pixel-accurate WhatsApp chat screenshot. Edit messages, add voice notes, attach images, set read receipts."
      filename="fake-whatsapp.png"
      controls={
        <>
          <ContactPanel config={config} setConfig={setConfig} />
          <MessageEditor messages={messages} setMessages={setMessages} />
        </>
      }
      preview={<WhatsAppPreview config={config} messages={messages} />}
      faqs={[
        { q: "How do I add a green check mark / read receipt?", a: "Each message you send (your side) has a status dropdown: sent, delivered, or read. Read shows the blue double-tick." },
        { q: "Can I make it look like the dark mode WhatsApp?", a: "Yes — toggle 'Dark phone theme' in the contact panel." },
        { q: "Can I attach an image to a message?", a: "Yes, click the image icon on any message to upload a photo." },
      ]}
    />
  );
}

function WhatsAppPreview({ config, messages }: { config: ChatConfig; messages: ChatMessage[] }) {
  const dark = config.dark;
  const bg = dark ? "#0b141a" : "#efeae2";
  const headerBg = dark ? "#202c33" : "#075e54";
  const meBubble = dark ? "#005c4b" : "#d9fdd3";
  const themBubble = dark ? "#202c33" : "#ffffff";
  const meText = dark ? "#fff" : "#000";
  const themText = dark ? "#fff" : "#000";

  return (
    <div className="rounded-[2.4rem] bg-black p-2 shadow-2xl" style={{ width: 360 }}>
      <div className="rounded-[2rem] overflow-hidden flex flex-col" style={{ background: bg, height: 720 }}>
        <div style={{ background: headerBg }}>
          <StatusBar time={config.time} battery={config.battery} dark />
          <div className="flex items-center gap-3 px-3 py-2 text-white">
            <ArrowLeft className="w-5 h-5" />
            <Avatar src={config.contactAvatar} name={config.contactName} className="w-9 h-9" color="bg-emerald-600" />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{config.contactName}</div>
              <div className="text-[11px] opacity-80">{config.online ? "online" : "last seen recently"}</div>
            </div>
            <Video className="w-5 h-5 opacity-90" />
            <Phone className="w-5 h-5 opacity-90" />
            <MoreVertical className="w-5 h-5 opacity-90" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-2 space-y-1.5"
             style={{ backgroundColor: bg, backgroundImage: dark ? "radial-gradient(circle at 20% 20%, #15252e 1px, transparent 1px)" : "radial-gradient(circle at 20% 20%, #d8d2c4 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[78%] rounded-lg px-2 py-1 shadow-sm relative"
                   style={{
                     background: m.sender === "me" ? meBubble : themBubble,
                     color: m.sender === "me" ? meText : themText,
                     borderTopRightRadius: m.sender === "me" ? 0 : 8,
                     borderTopLeftRadius: m.sender === "them" ? 0 : 8,
                   }}>
                {m.image && <img src={m.image} alt="" className="rounded-md max-w-full mb-1 max-h-48 object-cover" />}
                {m.isVoice ? (
                  <div className="flex items-center gap-2 px-1 py-1 min-w-[180px]">
                    <Play className="w-4 h-4" fill="currentColor" />
                    <div className="flex-1 h-1 bg-current opacity-30 rounded">
                      <div className="h-1 bg-current rounded" style={{ width: "30%" }} />
                    </div>
                    <span className="text-xs opacity-80">{m.voiceLen ?? "0:12"}</span>
                  </div>
                ) : (
                  <div className="text-[14px] leading-snug whitespace-pre-wrap break-words pr-12">{m.text}</div>
                )}
                <div className="float-right -mt-3 ml-2 flex items-center gap-1 text-[10px] opacity-70">
                  <span>{m.time}</span>
                  {m.sender === "me" && (
                    m.status === "read" ? <CheckCheck className="w-3.5 h-3.5 text-sky-400" /> :
                    m.status === "delivered" ? <CheckCheck className="w-3.5 h-3.5" /> :
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <div style={{ clear: "both" }} />
              </div>
            </div>
          ))}
        </div>

        <div className={`px-2 py-2 flex items-center gap-2 ${dark ? "bg-[#0b141a]" : ""}`}>
          <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-full ${dark ? "bg-[#202c33] text-zinc-300" : "bg-white text-zinc-500"}`}>
            <Smile className="w-5 h-5" />
            <span className="flex-1 text-sm">Message</span>
            <Plus className="w-5 h-5" />
            <Camera className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
