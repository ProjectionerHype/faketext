import { useState } from "react";
import { ChevronLeft, Phone, Video, Info, Camera, Mic, Image as ImgIcon, Sticker, Heart } from "lucide-react";
import { ChatMessage, ChatConfig, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { MessageEditor, ContactPanel, Avatar, StatusBar } from "@/components/MessageEditor";
import { useSeo } from "@/lib/seo";

const initialMsgs: ChatMessage[] = [
  { id: uid(), sender: "them", text: "did you see that reel I sent 😭", time: "2m ago" },
  { id: uid(), sender: "me", text: "STOP it's so good", time: "2m ago", status: "read" },
  { id: uid(), sender: "them", text: "right?? tag me in everything from now on", time: "1m ago" },
];

export default function InstagramPage() {
  useSeo({
    title: "Fake Instagram DM Generator — Direct Message Screenshots | FakeText.fun",
    description: "Create fake Instagram DM screenshots with the iconic gradient header. Free, realistic, downloadable as PNG.",
    path: "/chat/instagram",
  });

  const [config, setConfig] = useState<ChatConfig>({
    contactName: "alex.creates", online: true, time: "9:41", battery: 86, carrier: "5G", dark: true,
  });
  const [messages, setMessages] = useState<ChatMessage[]>(initialMsgs);

  return (
    <GeneratorLayout
      title="Fake Instagram DM Generator"
      description="Generate a fake Instagram direct message thread with the gradient header, active status, and seen indicator."
      filename="fake-instagram-dm.png"
      controls={
        <>
          <ContactPanel config={config} setConfig={setConfig} />
          <MessageEditor messages={messages} setMessages={setMessages} />
        </>
      }
      preview={<InstagramPreview config={config} messages={messages} />}
      faqs={[
        { q: "Why does Instagram DM look dark by default?", a: "Most users browse Instagram in dark mode — it's the most common look. Toggle the theme switch for the light variant." },
        { q: "Can I show a 'Seen' label?", a: "Set your last sent message to 'read' status." },
      ]}
    />
  );
}

function InstagramPreview({ config, messages }: { config: ChatConfig; messages: ChatMessage[] }) {
  const dark = config.dark;
  const bg = dark ? "#000" : "#fff";
  const fg = dark ? "#fff" : "#000";
  const them = dark ? "#262626" : "#efefef";
  const lastMeIdx = [...messages].map((m, i) => ({ m, i })).reverse().find((x) => x.m.sender === "me")?.i ?? -1;
  return (
    <div className="rounded-[2.4rem] bg-black p-2 shadow-2xl" style={{ width: 360 }}>
      <div className="rounded-[2rem] overflow-hidden flex flex-col" style={{ background: bg, color: fg, height: 720 }}>
        <div style={{ background: bg, color: fg }} className="border-b" >
          <StatusBar time={config.time} battery={config.battery} dark={dark} />
          <div className="flex items-center px-3 py-2 gap-2 border-b" style={{ borderColor: dark ? "#222" : "#dbdbdb" }}>
            <ChevronLeft className="w-6 h-6" />
            <Avatar src={config.contactAvatar} name={config.contactName} className="w-8 h-8" color="bg-fuchsia-500" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{config.contactName}</div>
              <div className="text-[11px] opacity-60">{config.online ? "Active now" : "Active 1h ago"}</div>
            </div>
            <Phone className="w-5 h-5" />
            <Video className="w-5 h-5" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden px-3 py-3 space-y-1.5">
          {messages.map((m, i) => (
            <div key={m.id} className={`flex items-end gap-2 ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
              {m.sender === "them" && <Avatar src={config.contactAvatar} name={config.contactName} className="w-6 h-6" color="bg-fuchsia-500" />}
              <div className="max-w-[72%]">
                {m.image && <img src={m.image} alt="" className="rounded-2xl max-w-full mb-1 max-h-48 object-cover" />}
                {m.isVoice ? (
                  <div className="rounded-full px-3 py-2 flex items-center gap-2 text-sm"
                       style={m.sender === "me"
                         ? { background: "linear-gradient(90deg,#7e3ff2,#ff2d75)", color: "#fff" }
                         : { background: them, color: fg }}>
                    <Mic className="w-3.5 h-3.5" />
                    <span className="text-xs">{m.voiceLen ?? "0:11"}</span>
                  </div>
                ) : (
                  <div className="px-3 py-2 rounded-3xl text-[14px] leading-snug whitespace-pre-wrap"
                       style={m.sender === "me"
                         ? { background: "linear-gradient(90deg,#7e3ff2,#ff2d75)", color: "#fff" }
                         : { background: them, color: fg }}>
                    {m.text}
                  </div>
                )}
                {m.sender === "me" && i === lastMeIdx && m.status === "read" && (
                  <div className="text-[10px] text-right opacity-60 mt-0.5">Seen</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-2 py-2 flex items-center gap-2 border-t" style={{ borderColor: dark ? "#222" : "#dbdbdb" }}>
          <Camera className="w-7 h-7 p-1.5 rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white" />
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: dark ? "#333" : "#dbdbdb" }}>
            <span className="flex-1 text-sm opacity-60">Message...</span>
            <Mic className="w-4 h-4 opacity-80" />
            <ImgIcon className="w-4 h-4 opacity-80" />
            <Sticker className="w-4 h-4 opacity-80" />
          </div>
          <Heart className="w-6 h-6 opacity-80" />
        </div>
      </div>
    </div>
  );
}
