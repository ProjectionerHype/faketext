import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { CommentItem, PostConfig, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { PostPanel, CommentsEditor, fmtCount, VerifiedBadge } from "@/components/CommentEditor";
import { Avatar } from "@/components/MessageEditor";
import { useSeo } from "@/lib/seo";

const initialComments: CommentItem[] = [
  { id: uid(), author: "rosie.creates", text: "this is iconic 😭🤌", time: "2h", likes: 423, verified: true },
  { id: uid(), author: "_marc.eats", text: "needed this on my feed today", time: "1h", likes: 88 },
  { id: uid(), author: "haus.of.lila", text: "okay how do I get on this energy", time: "44m", likes: 14 },
];

export default function InstagramCommentsPage() {
  useSeo({
    title: "Fake Instagram Post Generator | FakeText.fun",
    description: "Generate a fake Instagram post with comments, verified author, like and share counts. Free PNG download.",
    path: "/comments/instagram",
  });
  const [post, setPost] = useState<PostConfig>({
    author: "studio.aurora", handle: "studio.aurora", verified: true,
    text: "softest light we've ever shot. ✨ behind the scenes of our spring campaign drops next week.",
    likes: 12400, shares: 0, time: "3 HOURS AGO", dark: true,
  });
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  return (
    <GeneratorLayout
      title="Fake Instagram Post Generator"
      description="Build a fake Instagram post with verified author, photo, caption, likes, and a comment section."
      filename="fake-instagram-post.png"
      controls={<><PostPanel config={post} setConfig={setPost} label="Post" /><CommentsEditor comments={comments} setComments={setComments} supportPin={false} /></>}
      preview={<IGPreview post={post} comments={comments} />}
    />
  );
}

function IGPreview({ post, comments }: { post: PostConfig; comments: CommentItem[] }) {
  const dark = post.dark;
  const bg = dark ? "#000" : "#fff";
  const fg = dark ? "#fff" : "#000";
  const muted = dark ? "#a8a8a8" : "#737373";
  const border = dark ? "#262626" : "#dbdbdb";
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border" style={{ width: 480, background: bg, color: fg, borderColor: border }}>
      <div className="flex items-center gap-3 p-3">
        <div className="w-9 h-9 rounded-full p-[2px]" style={{ background: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)" }}>
          <Avatar src={post.avatar} name={post.author} className="w-full h-full border-2" color="bg-fuchsia-500" />
        </div>
        <div className="flex-1 text-sm font-semibold flex items-center gap-1">{post.author}{post.verified && <VerifiedBadge size={12} />}</div>
        <MoreHorizontal className="w-5 h-5" />
      </div>
      <div className="aspect-square w-full" style={{ background: post.image ? undefined : "linear-gradient(135deg,#fbcfe8,#fed7aa,#fde68a)" }}>
        {post.image && <img src={post.image} alt="" className="w-full h-full object-cover" />}
      </div>
      <div className="p-3 flex items-center gap-4">
        <Heart className="w-7 h-7" />
        <MessageCircle className="w-6 h-6" />
        <Send className="w-6 h-6" />
        <Bookmark className="w-6 h-6 ml-auto" />
      </div>
      <div className="px-3 pb-2">
        <div className="text-sm font-semibold">{fmtCount(post.likes)} likes</div>
        <div className="text-sm mt-1"><span className="font-semibold mr-1">{post.author}</span>{post.text}</div>
        <div className="text-sm mt-1" style={{ color: muted }}>View all {comments.length} comments</div>
        <div className="mt-2 space-y-2">
          {comments.map((c) => (
            <div key={c.id} className="text-sm flex items-start gap-2">
              <div className="flex-1">
                <span className="font-semibold mr-1 inline-flex items-center gap-1">{c.author}{c.verified && <VerifiedBadge size={10} />}</span>
                {c.text}
                <div className="text-xs mt-0.5" style={{ color: muted }}>{c.time} · Reply · {fmtCount(c.likes)} likes</div>
              </div>
              <Heart className="w-3.5 h-3.5 mt-1" />
            </div>
          ))}
        </div>
        <div className="text-[10px] uppercase mt-3" style={{ color: muted }}>{post.time}</div>
      </div>
    </div>
  );
}
