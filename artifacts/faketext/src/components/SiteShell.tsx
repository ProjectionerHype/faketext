import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Moon, Sun, MessageCircle, MessageSquareText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark, LogoWordmark } from "@/components/Logo";

function useDark() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const s = localStorage.getItem("ft_dark");
    if (s) return s === "1";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("ft_dark", dark ? "1" : "0");
  }, [dark]);
  return [dark, setDark] as const;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useDark();
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();
  const [loc] = useLocation();

  useEffect(() => { setOpen(false); window.scrollTo({ top: 0 }); }, [loc]);

  const links = [
    { href: "/chat", label: "Chats", icon: MessageCircle },
    { href: "/comments", label: "Comments", icon: MessageSquareText },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoMark className="w-9 h-9 group-hover:scale-105 transition-transform drop-shadow-[0_4px_12px_rgba(168,85,247,0.35)]" />
            <LogoWordmark />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition">
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
              className="ml-2 w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>
          <div className="md:hidden flex items-center gap-1">
            <button onClick={() => setDark(!dark)} className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setOpen(!open)} className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="px-3 py-2 rounded-lg hover:bg-muted">{l.label}</Link>
              ))}
              <Button onClick={() => navigate("/chat")} className="mt-2">Make a fake chat</Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LogoMark className="w-8 h-8" />
              <LogoWordmark className="text-lg" />
            </div>
            <p className="text-muted-foreground">The internet's most fun fake chat & comment generator. 100% free, runs in your browser.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Chat generators</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/chat/whatsapp" className="hover:text-foreground">Fake WhatsApp Chat</Link></li>
              <li><Link href="/chat/imessage" className="hover:text-foreground">Fake iMessage</Link></li>
              <li><Link href="/chat/instagram" className="hover:text-foreground">Fake Instagram DM</Link></li>
              <li><Link href="/chat/messenger" className="hover:text-foreground">Fake Messenger</Link></li>
              <li><Link href="/chat/telegram" className="hover:text-foreground">Fake Telegram</Link></li>
              <li><Link href="/chat/discord" className="hover:text-foreground">Fake Discord</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Comment generators</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/comments/youtube" className="hover:text-foreground">Fake YouTube Comments</Link></li>
              <li><Link href="/comments/instagram" className="hover:text-foreground">Fake Instagram Post</Link></li>
              <li><Link href="/comments/twitter" className="hover:text-foreground">Fake Tweet (X)</Link></li>
              <li><Link href="/comments/tiktok" className="hover:text-foreground">Fake TikTok Comments</Link></li>
              <li><Link href="/comments/facebook" className="hover:text-foreground">Fake Facebook Post</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">About</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
            </ul>
            <div className="mt-4 text-xs text-muted-foreground">
              For entertainment & educational use only. Don't use to deceive, harass, or commit fraud.
            </div>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} faketext.fun · Made for creators, pranksters, and storytellers.
        </div>
      </footer>
    </div>
  );
}
