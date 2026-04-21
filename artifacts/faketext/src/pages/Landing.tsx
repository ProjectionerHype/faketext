import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  ArrowRight, MessageCircle, MessageSquareText, Download, Zap, Lock, Palette,
  Smartphone, Sparkles, Check, Heart, Star,
} from "lucide-react";
import {
  SiWhatsapp, SiInstagram, SiTiktok, SiYoutube, SiFacebook, SiTelegram, SiDiscord, SiX, SiApple,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/lib/seo";

const chatApps = [
  { href: "/chat/whatsapp", name: "WhatsApp", color: "from-green-500 to-emerald-500", Icon: SiWhatsapp },
  { href: "/chat/imessage", name: "iMessage", color: "from-blue-500 to-cyan-500", Icon: SiApple },
  { href: "/chat/instagram", name: "Instagram DM", color: "from-fuchsia-500 to-orange-500", Icon: SiInstagram },
  { href: "/chat/messenger", name: "Messenger", color: "from-sky-500 to-violet-500", Icon: SiFacebook },
  { href: "/chat/telegram", name: "Telegram", color: "from-cyan-500 to-blue-600", Icon: SiTelegram },
  { href: "/chat/discord", name: "Discord", color: "from-indigo-500 to-violet-700", Icon: SiDiscord },
];

const commentApps = [
  { href: "/comments/youtube", name: "YouTube", color: "from-red-500 to-rose-600", Icon: SiYoutube },
  { href: "/comments/instagram", name: "Instagram", color: "from-fuchsia-500 to-orange-500", Icon: SiInstagram },
  { href: "/comments/twitter", name: "Twitter / X", color: "from-zinc-700 to-black", Icon: SiX },
  { href: "/comments/tiktok", name: "TikTok", color: "from-pink-500 to-cyan-400", Icon: SiTiktok },
  { href: "/comments/facebook", name: "Facebook", color: "from-sky-500 to-blue-700", Icon: SiFacebook },
];

const useCases = [
  { title: "Memes that go viral", body: "Set up the perfect group chat punchline. The internet runs on fake screenshots — make yours look real." },
  { title: "Prank your friends", body: "Send your group chat a 'leaked' iMessage and watch the chaos unfold. Just admit it's fake afterwards." },
  { title: "Content creators", body: "Reels, Shorts and TikToks need believable chat clips. Build them in seconds, drop them into your edit." },
  { title: "Storytelling & fiction", body: "Writing a thriller? A Wattpad romance? A YouTube story-time? Show, don't tell — with screenshots." },
  { title: "Education & training", body: "Teach digital safety, scam awareness, or media literacy with realistic mockups instead of slideshows." },
  { title: "Marketing & UX mockups", body: "Designers and marketers use fake chats to mock testimonials, onboarding flows, and product demos." },
];

const faqs = [
  { q: "Is FakeText.fun really free?", a: "Yes — every generator is 100% free, with no signup, no watermark, and no upload limits. Everything runs in your browser." },
  { q: "Are my chats stored anywhere?", a: "Nope. We don't have a server for your content. Your messages, avatars, and screenshots never leave your device — your privacy stays intact." },
  { q: "Which chat apps are supported?", a: "WhatsApp, iMessage, Instagram DM, Facebook Messenger, Telegram and Discord — and we keep adding more. Each one matches the real app's look as closely as possible." },
  { q: "Which comment platforms can I fake?", a: "YouTube, Instagram posts, Twitter/X tweets, TikTok comments, and Facebook posts — with verified badges, like counts, replies, and pinned comments." },
  { q: "How do I download my fake chat as an image?", a: "Hit the Download PNG button on any generator. You'll get a high-resolution screenshot ready for Reels, TikTok, Twitter, or your group chat." },
  { q: "Is it legal to use a fake chat generator?", a: "Yes for memes, jokes, storytelling, and education. It is NOT okay to use fake chats to defraud, harass, blackmail, or impersonate someone in a way that causes real harm. Don't be that person." },
  { q: "Will this work on my phone?", a: "Absolutely. The whole site is built mobile-first — you can build, edit and download fake chats entirely from your phone." },
  { q: "Can I add reactions, voice notes and read receipts?", a: "Yes — message status (sent / delivered / read), voice note styling, image attachments, typing indicators, dark mode, online status, time of day and more." },
];

export default function Landing() {
  useSeo({
    title: "FakeText.fun — Free Fake Chat & Comments Generator (WhatsApp, iMessage, YouTube)",
    description: "Create realistic fake text message screenshots and fake social media comments instantly. WhatsApp, iMessage, Instagram, YouTube, TikTok, Twitter/X, and more. Free, no signup, no watermark.",
    path: "/",
  });

  useEffect(() => {
    const id = "ft-jsonld";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = id;
    s.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "FakeText.fun",
      url: "https://faketext.fun",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Free fake chat and fake social media comments generator. WhatsApp, iMessage, Instagram, YouTube, TikTok, Twitter and more.",
    });
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden grid-bg noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" /> 100% free · no signup · no watermark
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              The internet's most fun <span className="gradient-text">fake chat</span> &amp; <span className="gradient-text">comment</span> generator.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Build pixel-accurate fake WhatsApp, iMessage, Instagram, YouTube, TikTok and Twitter screenshots in seconds.
              Perfect for memes, pranks, content creators and storytellers.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/chat">
                <Button size="lg" className="rounded-xl text-base font-semibold px-6 h-14 w-full sm:w-auto">
                  <MessageCircle className="w-5 h-5 mr-2" /> Make a fake chat
                </Button>
              </Link>
              <Link href="/comments">
                <Button size="lg" variant="outline" className="rounded-xl text-base font-semibold px-6 h-14 w-full sm:w-auto">
                  <MessageSquareText className="w-5 h-5 mr-2" /> Fake comments <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> No watermark</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Runs in your browser</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Mobile friendly</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.92, rotate: 4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <HeroPreview />
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF / LOGO STRIP */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Pixel-perfect simulators for every chat &amp; comment app you actually use</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground">
            {[SiWhatsapp, SiApple, SiInstagram, SiFacebook, SiTelegram, SiDiscord, SiYoutube, SiX, SiTiktok].map((Icon, i) => (
              <Icon key={i} className="w-7 h-7 hover:text-foreground transition" />
            ))}
          </div>
        </div>
      </section>

      {/* CHAT GRID */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-sm font-semibold text-primary mb-2">Chat generators</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Pick your chat app</h2>
              <p className="text-muted-foreground mt-2 max-w-xl">Each simulator looks exactly like the real thing — bubbles, status bars, read receipts, the whole deal.</p>
            </div>
            <Link href="/chat" className="text-sm font-semibold text-primary hover:underline">View all chats →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chatApps.map((app, i) => (
              <motion.div key={app.href} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={app.href}>
                  <div className="group rounded-2xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 cursor-pointer h-full hover-elevate">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                      <app.Icon className="w-7 h-7" />
                    </div>
                    <div className="font-display text-xl font-semibold">Fake {app.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">Chat generator</div>
                    <div className="mt-4 text-sm font-medium text-primary inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      Open <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENTS GRID */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-sm font-semibold text-accent mb-2">Comment generators</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Fake comments &amp; social posts</h2>
              <p className="text-muted-foreground mt-2 max-w-xl">Mock up viral tweets, YouTube comment threads, TikTok comment sections and Instagram posts.</p>
            </div>
            <Link href="/comments" className="text-sm font-semibold text-accent hover:underline">View all →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {commentApps.map((app, i) => (
              <motion.div key={app.href} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={app.href}>
                  <div className="group rounded-2xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 cursor-pointer h-full hover-elevate">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-md mb-3`}>
                      <app.Icon className="w-6 h-6" />
                    </div>
                    <div className="font-semibold">{app.name}</div>
                    <div className="text-xs text-muted-foreground">Fake comments</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-primary mb-2">How it works</div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold">From idea to screenshot in 30 seconds.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: Palette, title: "1. Pick a platform", body: "WhatsApp, iMessage, YouTube, TikTok, Twitter/X — choose any chat or comment generator." },
              { Icon: Zap, title: "2. Edit the conversation", body: "Type messages, swap who's sending, set the time, battery, online status, verified badges and likes." },
              { Icon: Download, title: "3. Download the PNG", body: "Hit download for a high-resolution screenshot. Drop it in a Reel, a tweet, or your group chat." },
            ].map((s) => (
              <div key={s.title} className="p-8 rounded-2xl border border-border bg-card hover-elevate">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <s.Icon className="w-6 h-6" />
                </div>
                <div className="font-display text-xl font-semibold mb-2">{s.title}</div>
                <p className="text-muted-foreground text-sm">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-accent mb-2">Use cases</div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold">Made for memes. Ready for anything.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u, i) => (
              <motion.div key={u.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-7 rounded-2xl border border-border bg-card">
                <Star className="w-5 h-5 text-accent mb-3" />
                <div className="font-display text-lg font-semibold mb-2">{u.title}</div>
                <p className="text-sm text-muted-foreground">{u.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { Icon: Lock, title: "100% private", body: "Zero uploads. Everything happens on your device." },
            { Icon: Smartphone, title: "Mobile first", body: "Build and download from your phone." },
            { Icon: Heart, title: "Truly free", body: "No paywall, no signup, no watermark." },
            { Icon: Sparkles, title: "Pixel accurate", body: "We obsess over making each app look real." },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-card border border-border">
              <f.Icon className="w-6 h-6 text-primary mb-3" />
              <div className="font-semibold">{f.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO CONTENT BLOCK */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 prose prose-neutral dark:prose-invert">
          <h2 className="font-display">The best free fake text & chat generator on the internet</h2>
          <p>
            FakeText.fun is a free online fake chat generator and fake comments generator that lets you build
            convincing screenshots of conversations from the apps everyone already uses — WhatsApp, iMessage,
            Instagram DM, Facebook Messenger, Telegram and Discord — plus mockups of YouTube comments,
            TikTok comments, Twitter (X) replies, Instagram posts and Facebook posts. There's no signup,
            no watermark and no upload limit. Everything runs locally in your browser.
          </p>
          <h3>Why creators love a great fake chat generator</h3>
          <p>
            If you've scrolled TikTok or Instagram Reels for ten minutes you've already seen a dozen fake
            chats — story-time creators, sketch comedians, brand marketers and meme accounts all use them
            because a believable screenshot grabs attention faster than any video intro. With FakeText.fun
            you can generate a fake WhatsApp chat, a fake iMessage iPhone screenshot, or a fake Instagram
            DM in under a minute, customize every detail (name, avatar, time, battery, read receipts, voice
            notes, image attachments, typing indicators) and export a high-resolution PNG ready for your
            edit.
          </p>
          <h3>What about fake comments?</h3>
          <p>
            The fake comment generators recreate the look of YouTube comment threads, TikTok comment
            sections, Twitter/X replies, Instagram posts and Facebook posts — including verified badges,
            like counts, pinned comments and replies. Storytellers and content creators use them to mock
            up reactions for viral story videos, while educators and digital-safety trainers use them to
            illustrate scams and misinformation in a way slideshows never could.
          </p>
          <h3>Use it responsibly</h3>
          <p>
            FakeText.fun is built for entertainment and educational use. Don't use it to deceive, defraud,
            harass or impersonate real people in ways that cause harm. Be the kind of creator the internet
            actually likes.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-semibold text-primary mb-2">FAQ</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Quick questions, quick answers</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card p-5 hover-elevate">
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-10 sm:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 grid-bg" />
            <h2 className="relative font-display text-3xl sm:text-5xl font-bold leading-tight">Make your first fake chat now.</h2>
            <p className="relative mt-3 opacity-90 max-w-xl mx-auto">No signup. No watermark. Just open it and go.</p>
            <div className="relative mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/chat/whatsapp">
                <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 font-semibold h-14 px-6 w-full sm:w-auto">
                  <SiWhatsapp className="w-5 h-5 mr-2" /> Fake WhatsApp Chat
                </Button>
              </Link>
              <Link href="/comments/youtube">
                <Button size="lg" variant="outline" className="rounded-xl bg-transparent border-white text-white hover:bg-white/10 font-semibold h-14 px-6 w-full sm:w-auto">
                  <SiYoutube className="w-5 h-5 mr-2" /> Fake YouTube Comments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-10 bg-gradient-to-br from-primary/30 via-accent/30 to-orange-300/30 blur-3xl rounded-full" />
      <div className="relative grid grid-cols-2 gap-4">
        {/* Phone preview */}
        <div className="rounded-[2.2rem] bg-black p-2 shadow-2xl rotate-[-4deg]">
          <div className="rounded-[1.8rem] overflow-hidden bg-[#0b141a] aspect-[9/19] flex flex-col">
            <div className="bg-[#202c33] text-white px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center font-bold">M</div>
              <div className="text-sm">
                <div className="font-semibold">Mom 💚</div>
                <div className="text-[10px] text-green-300">online</div>
              </div>
            </div>
            <div className="flex-1 p-3 space-y-2 bg-[#0b141a]" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, #15252e 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
              <div className="max-w-[80%] bg-white text-black rounded-lg rounded-tl-none px-3 py-2 text-xs shadow">Did you eat?</div>
              <div className="ml-auto max-w-[80%] bg-[#005c4b] text-white rounded-lg rounded-tr-none px-3 py-2 text-xs shadow">yes mom 😅</div>
              <div className="max-w-[80%] bg-white text-black rounded-lg rounded-tl-none px-3 py-2 text-xs shadow">Send pic</div>
            </div>
          </div>
        </div>
        {/* iMessage preview */}
        <div className="rounded-[2.2rem] bg-black p-2 shadow-2xl rotate-[5deg] mt-12">
          <div className="rounded-[1.8rem] overflow-hidden bg-white aspect-[9/19] flex flex-col">
            <div className="bg-[#f6f6f6] text-black px-4 py-3 text-center border-b border-zinc-200">
              <div className="text-xs">iMessage</div>
              <div className="text-sm font-semibold">Sam ✨</div>
            </div>
            <div className="flex-1 p-3 space-y-2 bg-white">
              <div className="max-w-[80%] bg-zinc-200 text-black rounded-2xl px-3 py-2 text-xs">are we still on for tonight?</div>
              <div className="ml-auto max-w-[80%] bg-blue-500 text-white rounded-2xl px-3 py-2 text-xs">absolutely 🍕</div>
              <div className="ml-auto max-w-[80%] bg-blue-500 text-white rounded-2xl px-3 py-2 text-xs">7pm same place</div>
              <div className="text-[10px] text-zinc-400 text-right">Read 6:42 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
