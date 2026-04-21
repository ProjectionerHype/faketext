import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, Music, Plus } from "lucide-react";
import { CommentItem, PostConfig, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { PostPanel, CommentsEditor, fmtCount, VerifiedBadge } from "@/components/CommentEditor";
import { Avatar } from "@/components/MessageEditor";
import { useSeo } from "@/lib/seo";

const initialComments: CommentItem[] = [
  { id: uid(), author: "kaleah_03", text: "this is unreal i cant", time: "2h", likes: 12400, hearted: true, pinned: true },
  { id: uid(), author: "themattexperience", text: "POV: you walk in mid-conversation 💀", time: "1h", likes: 4823, verified: true },
  { id: uid(), author: "tealemonade", text: "ok but the SONG", time: "32m", likes: 901 },
];

export default function TikTokPage() {
  useSeo({
    title: "Fake TikTok Comments Generator | FakeText.fun",
    description: "Generate fake TikTok video comment sections with hearts, replies, pinned and creator-liked comments.",
    path: "/comments/tiktok",
  });
  const [post, setPost] = useState<PostConfig>({
    author: "lemon.jpg", handle: "lemon.jpg", verified: true,
    text: "she said WHAT 🤯 #fyp #storytime #drama",
    likes: 1_240_000, shares: 84000, views: 12_400_000, time: "3-21", dark: true,
  });
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  return (
    <GeneratorLayout
      title="Fake TikTok Comments Generator"
      description="Mock a TikTok video comment section with hearts, pins, and creator likes."
      filename="fake-tiktok.png"
      controls={<><PostPanel config={post} setConfig={setPost} includeViews label="Video" /><CommentsEditor comments={comments} setComments={setComments} /></>}
      preview={<TikTokPreview post={post} comments={comments} />}
    />
  );
}

function TikTokPreview({ post, comments }: { post: PostConfig; comments: CommentItem[] }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl flex" style={{ width: 720, background: "#000", color: "#fff" }}>
      <div className="relative" style={{ width: 270, height: 580, background: post.image ? undefined : "linear-gradient(180deg,#0f172a,#7e22ce,#db2777)" }}>
        {post.image && <img src={post.image} alt="" className="w-full h-full object-cover" />}
        <div className="absolute bottom-3 left-3 right-12">
          <div className="font-semibold flex items-center gap-1">@{post.handle}{post.verified && <VerifiedBadge size={12} />}</div>
          <div className="text-sm mt-1">{post.text}</div>
          <div className="text-xs mt-2 flex items-center gap-1 opacity-80"><Music className="w-3 h-3" /> original sound · {post.author}</div>
        </div>
        <div className="absolute right-2 bottom-3 flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar src={post.avatar} name={post.author} className="w-11 h-11 border-2 border-white" color="bg-pink-500" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center"><Plus className="w-3 h-3" /></div>
          </div>
          <div className="flex flex-col items-center"><Heart className="w-7 h-7 fill-white" /><span className="text-xs">{fmtCount(post.likes)}</span></div>
          <div className="flex flex-col items-center"><MessageCircle className="w-7 h-7" /><span className="text-xs">{fmtCount(comments.length * 3500)}</span></div>
          <div className="flex flex-col items-center"><Bookmark className="w-7 h-7" /><span className="text-xs">{fmtCount(Math.floor(post.likes / 12))}</span></div>
          <div className="flex flex-col items-center"><Share2 className="w-7 h-7" /><span className="text-xs">{fmtCount(post.shares ?? 0)}</span></div>
        </div>
      </div>
      <div className="flex-1 p-4 bg-[#121212]">
        <div className="font-semibold mb-3 text-sm border-b border-zinc-800 pb-2">{fmtCount(comments.length * 3500)} comments</div>
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <Avatar name={c.author} className="w-9 h-9" color="bg-cyan-500" />
              <div className="flex-1">
                <div className="text-xs text-zinc-400 flex items-center gap-1">{c.author}{c.verified && <VerifiedBadge size={10} />}</div>
                <div className="text-sm mt-0.5 whitespace-pre-wrap">{c.text}</div>
                <div className="mt-1 flex items-center gap-3 text-xs text-zinc-400">
                  <span>{c.time}</span>
                  <span>Reply</span>
                  {c.pinned && <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[10px]">Pinned</span>}
                  {c.hearted && <span className="text-pink-400">❤ Liked by creator</span>}
                </div>
              </div>
              <div className="flex flex-col items-center text-xs text-zinc-400">
                <Heart className="w-4 h-4" />
                <span>{fmtCount(c.likes)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
