import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiYoutube, SiInstagram, SiX, SiTiktok, SiFacebook } from "react-icons/si";
import { useSeo } from "@/lib/seo";

const apps = [
  { href: "/comments/youtube", name: "YouTube", desc: "Mock realistic YouTube comment threads with replies, hearts and pinned comments.", color: "from-red-500 to-rose-600", Icon: SiYoutube },
  { href: "/comments/instagram", name: "Instagram", desc: "Fake an Instagram post with verified author, likes and comments.", color: "from-fuchsia-500 to-orange-500", Icon: SiInstagram },
  { href: "/comments/twitter", name: "Twitter / X", desc: "Generate a tweet (or X post) with replies, likes, retweets and verified ticks.", color: "from-zinc-700 to-black", Icon: SiX },
  { href: "/comments/tiktok", name: "TikTok", desc: "TikTok-style comment section with hearts and creator replies.", color: "from-pink-500 to-cyan-400", Icon: SiTiktok },
  { href: "/comments/facebook", name: "Facebook", desc: "Fake a Facebook post with comments, reactions and share counts.", color: "from-sky-500 to-blue-700", Icon: SiFacebook },
];

export default function CommentsHub() {
  useSeo({
    title: "Fake Comment Generators — YouTube, Instagram, Twitter, TikTok | FakeText.fun",
    description: "Generate fake YouTube comments, fake tweets, fake TikTok comments, fake Instagram and Facebook posts. Free, no watermark, realistic mockups.",
    path: "/comments",
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-2xl mb-12">
        <div className="text-sm font-semibold text-accent mb-2">Comment generators</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold">Fake comments &amp; posts</h1>
        <p className="text-muted-foreground mt-3">Mock viral tweets, YouTube reactions, TikTok threads and Instagram comments. Add verified badges, like counts, replies and pinned comments.</p>
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
