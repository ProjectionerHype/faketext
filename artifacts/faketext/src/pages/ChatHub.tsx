import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiWhatsapp, SiInstagram, SiFacebook, SiTelegram, SiDiscord, SiApple } from "react-icons/si";
import { useSeo } from "@/lib/seo";

const apps = [
  { href: "/chat/whatsapp", name: "WhatsApp", desc: "Pixel-perfect green-bubble chat with read receipts and voice notes.", color: "from-green-500 to-emerald-500", Icon: SiWhatsapp },
  { href: "/chat/imessage", name: "iMessage", desc: "Classic blue/grey iPhone chat bubbles, in iOS dark or light mode.", color: "from-blue-500 to-cyan-500", Icon: SiApple },
  { href: "/chat/instagram", name: "Instagram DM", desc: "Gradient header, story replies and seen status, just like real IG.", color: "from-fuchsia-500 to-orange-500", Icon: SiInstagram },
  { href: "/chat/messenger", name: "Messenger", desc: "Facebook Messenger blue bubbles with reactions.", color: "from-sky-500 to-violet-500", Icon: SiFacebook },
  { href: "/chat/telegram", name: "Telegram", desc: "Telegram light & dark themes with that signature blue.", color: "from-cyan-500 to-blue-600", Icon: SiTelegram },
  { href: "/chat/discord", name: "Discord", desc: "Server-style chat with usernames, timestamps and avatars.", color: "from-indigo-500 to-violet-700", Icon: SiDiscord },
];

export default function ChatHub() {
  useSeo({
    title: "Fake Chat Generators — WhatsApp, iMessage, Instagram & More | FakeText.fun",
    description: "Pick a fake chat generator: WhatsApp, iMessage, Instagram DM, Messenger, Telegram or Discord. Build realistic chat screenshots in seconds — free, no watermark.",
    path: "/chat",
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-2xl mb-12">
        <div className="text-sm font-semibold text-primary mb-2">Chat generators</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold">Fake chat generators</h1>
        <p className="text-muted-foreground mt-3">Choose your messaging app. Each one is built to match the real thing — bubbles, headers, status bars and all the little details that make a screenshot believable.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {apps.map((a) => (
          <Link key={a.href} href={a.href}>
            <div className="group p-6 rounded-2xl border border-border bg-card hover-elevate cursor-pointer h-full">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                <a.Icon className="w-7 h-7" />
              </div>
              <div className="font-display text-xl font-semibold">Fake {a.name}</div>
              <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
              <div className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-1">Open generator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
