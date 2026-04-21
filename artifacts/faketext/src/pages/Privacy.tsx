import { useSeo } from "@/lib/seo";

export default function Privacy() {
  useSeo({
    title: "Privacy — FakeText.fun",
    description: "FakeText.fun is privacy-first. Your fake chat content never leaves your browser. No accounts, no tracking, no uploads.",
    path: "/privacy",
  });
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-neutral dark:prose-invert">
      <h1 className="font-display">Privacy</h1>
      <p>FakeText.fun runs entirely in your browser. The fake chats and comments you build, the avatars you upload, and the screenshots you generate <strong>never leave your device</strong>. We don't have a server that stores your content because we don't need one.</p>
      <h2>What we collect</h2>
      <p>We use minimal, privacy-respecting analytics to understand which generators are popular. We don't sell data and we don't use intrusive trackers.</p>
      <h2>Cookies</h2>
      <p>We use a single localStorage flag to remember your dark/light mode preference. That's it.</p>
    </div>
  );
}
