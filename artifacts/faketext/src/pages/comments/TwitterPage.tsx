import { useState } from "react";
import { Heart, MessageCircle, Repeat2, BarChart2, Bookmark, Upload, MoreHorizontal } from "lucide-react";
import { CommentItem, PostConfig, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { PostPanel, CommentsEditor, fmtCount, VerifiedBadge } from "@/components/CommentEditor";
import { Avatar } from "@/components/MessageEditor";
import { useSeo } from "@/lib/seo";

const initialComments: CommentItem[] = [
  { id: uid(), author: "ramen_horoscope", handle: "@ramenh", text: "this might be the most important tweet of the year", time: "3h", likes: 2103, verified: false },
  { id: uid(), author: "Engineer Daily", handle: "@eng_daily", text: "saving this so I can pretend I came up with it later", time: "2h", likes: 412, verified: true },
  { id: uid(), author: "lou", handle: "@itslou", text: "no thoughts head empty just this", time: "1h", likes: 78 },
];

export default function TwitterPage() {
  useSeo({
    title: "Fake Tweet / X Post Generator | FakeText.fun",
    description: "Generate fake tweets and X posts with verified ticks, replies, likes and retweets. Looks just like the real thing.",
    path: "/comments/twitter",
  });
  const [post, setPost] = useState<PostConfig>({
    author: "elonmuckraker", handle: "@muckraker", verified: true,
    text: "if you're not making at least one questionable decision per day you're not really living",
    likes: 84200, shares: 12400, views: 2_400_000, time: "5h", dark: true,
  });
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  return (
    <GeneratorLayout
      title="Fake Tweet / X Post Generator"
      description="Mock a viral tweet (or X post) with verified author, replies, retweets, likes and view counts."
      filename="fake-tweet.png"
      controls={<><PostPanel config={post} setConfig={setPost} includeViews label="Tweet" /><CommentsEditor comments={comments} setComments={setComments} supportPin={false} supportHearted={false} /></>}
      preview={<TwitterPreview post={post} comments={comments} />}
      faqs={[
        { q: "Can I make a 'verified' (blue check) tweet?", a: "Yes, toggle the verified switch in the post panel." },
      ]}
    />
  );
}

function TwitterPreview({ post, comments }: { post: PostConfig; comments: CommentItem[] }) {
  const dark = post.dark;
  const bg = dark ? "#000" : "#fff";
  const fg = dark ? "#e7e9ea" : "#0f1419";
  const muted = dark ? "#71767b" : "#536471";
  const border = dark ? "#2f3336" : "#eff3f4";
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border" style={{ width: 560, background: bg, color: fg, borderColor: border }}>
      <div className="p-4">
        <div className="flex gap-3">
          <Avatar src={post.avatar} name={post.author} className="w-12 h-12" color="bg-zinc-700" />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-bold">{post.author}</span>
              {post.verified && <VerifiedBadge color="#1d9bf0" />}
              <span className="text-sm ml-1" style={{ color: muted }}>{post.handle}</span>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5" style={{ color: muted }} />
        </div>
        <div className="mt-2 text-[20px] leading-snug whitespace-pre-wrap">{post.text}</div>
        {post.image && <img src={post.image} alt="" className="mt-3 rounded-2xl border max-h-96 w-full object-cover" style={{ borderColor: border }} />}
        <div className="mt-3 text-sm flex items-center gap-2 flex-wrap" style={{ color: muted }}>
          <span>{post.time === "5h" ? "10:42 AM" : post.time}</span><span>·</span><span>{post.time === "5h" ? "Today" : ""}</span>
          {post.views !== undefined && <><span>·</span><span><b className="text-foreground" style={{ color: fg }}>{fmtCount(post.views)}</b> Views</span></>}
        </div>
        <div className="mt-3 pt-3 pb-2 border-t border-b flex items-center gap-6 text-sm" style={{ borderColor: border, color: muted }}>
          <span><b style={{ color: fg }}>{fmtCount(post.shares ?? 0)}</b> Reposts</span>
          <span><b style={{ color: fg }}>{Math.floor((post.shares ?? 0) / 5)}</b> Quotes</span>
          <span><b style={{ color: fg }}>{fmtCount(post.likes)}</b> Likes</span>
          <span><b style={{ color: fg }}>{fmtCount(Math.floor(post.likes / 8))}</b> Bookmarks</span>
        </div>
        <div className="py-2 flex items-center justify-between" style={{ color: muted }}>
          <MessageCircle className="w-5 h-5" />
          <Repeat2 className="w-5 h-5" />
          <Heart className="w-5 h-5" />
          <BarChart2 className="w-5 h-5" />
          <div className="flex items-center gap-3"><Bookmark className="w-5 h-5" /><Upload className="w-5 h-5" /></div>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: border }}>
        {comments.map((c) => (
          <div key={c.id} className="p-4 border-b flex gap-3" style={{ borderColor: border }}>
            <Avatar name={c.author} className="w-10 h-10" color="bg-violet-500" />
            <div className="flex-1">
              <div className="text-sm flex items-center gap-1">
                <span className="font-bold">{c.author}</span>
                {c.verified && <VerifiedBadge color="#1d9bf0" size={12} />}
                <span style={{ color: muted }}>{c.handle ?? "@" + c.author.toLowerCase().replace(/\s/g, "")}</span>
                <span style={{ color: muted }}>· {c.time}</span>
              </div>
              <div className="text-[15px] mt-0.5 whitespace-pre-wrap">{c.text}</div>
              <div className="mt-2 flex items-center justify-between text-sm" style={{ color: muted }}>
                <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {fmtCount(Math.floor(c.likes / 10))}</span>
                <span className="flex items-center gap-1"><Repeat2 className="w-4 h-4" /> {fmtCount(Math.floor(c.likes / 25))}</span>
                <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {fmtCount(c.likes)}</span>
                <span className="flex items-center gap-1"><BarChart2 className="w-4 h-4" /> {fmtCount(c.likes * 30)}</span>
                <span className="flex items-center gap-2"><Bookmark className="w-4 h-4" /><Upload className="w-4 h-4" /></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
