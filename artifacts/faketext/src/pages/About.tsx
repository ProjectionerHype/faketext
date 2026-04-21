import { useSeo } from "@/lib/seo";

export default function About() {
  useSeo({
    title: "About FakeText.fun — The Free Fake Chat & Comments Generator",
    description: "Learn about FakeText.fun, a free privacy-friendly fake chat and comment generator built for memes, content creators and storytellers.",
    path: "/about",
  });
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-neutral dark:prose-invert">
      <h1 className="font-display">About FakeText.fun</h1>
      <p>FakeText.fun is a free, privacy-first fake chat and fake comments generator made for the people
      who actually live online — content creators, meme makers, story-time TikTokers, fiction writers,
      digital-safety educators, and anyone who's ever wanted to set up the perfect group-chat punchline.</p>
      <h2>What we believe</h2>
      <ul>
        <li><strong>It should be free.</strong> No paywall, no signup, no watermark.</li>
        <li><strong>It should be private.</strong> Your chats never leave your browser.</li>
        <li><strong>It should look real.</strong> We obsess over making each app look pixel-accurate.</li>
        <li><strong>It should be ethical.</strong> Don't use it to defraud or harass real people.</li>
      </ul>
      <h2>Disclaimer</h2>
      <p>FakeText.fun is for entertainment, education and creative storytelling. We are not affiliated with
      WhatsApp, Apple, Meta, Google, Telegram, Discord, or any other platform whose UI we reference.
      All trademarks are the property of their respective owners.</p>
    </div>
  );
}
