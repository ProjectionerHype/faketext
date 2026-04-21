import { useState } from "react";
import { ThumbsUp, MessageCircle, Share2, Globe, MoreHorizontal } from "lucide-react";
import { CommentItem, PostConfig, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { PostPanel, CommentsEditor, fmtCount, VerifiedBadge } from "@/components/CommentEditor";
import { Avatar } from "@/components/MessageEditor";
import { useSeo } from "@/lib/seo";

const initialComments: CommentItem[] = [
  { id: uid(), author: "Aunt Linda", text: "So proud of you sweetie!! ❤️❤️❤️", time: "2h", likes: 42 },
  { id: uid(), author: "Mark Stevens", text: "When's the next one? Save me a seat", time: "1h", likes: 8 },
];

export default function FacebookPage() {
  useSeo({
    title: "Fake Facebook Post Generator | FakeText.fun",
    description: "Mock a fake Facebook post with comments, likes, shares, reactions and the classic blue chrome.",
    path: "/comments/facebook",
  });
  const [post, setPost] = useState<PostConfig>({
    author: "Jamie Carter", handle: "Jamie Carter", verified: false,
    text: "Just signed the lease on the new bakery 🍞 thank you to everyone who's supported the journey so far!",
    likes: 1843, shares: 127, time: "2 hrs", dark: false,
  });
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  return (
    <GeneratorLayout
      title="Fake Facebook Post Generator"
      description="Build a Facebook-style post with reactions, comments and shares."
      filename="fake-facebook-post.png"
      controls={<><PostPanel config={post} setConfig={setPost} label="Post" /><CommentsEditor comments={comments} setComments={setComments} supportPin={false} supportHearted={false} /></>}
      preview={<FBPreview post={post} comments={comments} />}
    />
  );
}

function FBPreview({ post, comments }: { post: PostConfig; comments: CommentItem[] }) {
  const dark = post.dark;
  const bg = dark ? "#242526" : "#fff";
  const fg = dark ? "#e4e6eb" : "#050505";
  const muted = dark ? "#b0b3b8" : "#65676b";
  const border = dark ? "#3a3b3c" : "#ced0d4";
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border" style={{ width: 540, background: bg, color: fg, borderColor: border }}>
      <div className="p-3 flex items-center gap-3">
        <Avatar src={post.avatar} name={post.author} className="w-10 h-10" color="bg-blue-500" />
        <div className="flex-1">
          <div className="font-semibold text-sm flex items-center gap-1">{post.author}{post.verified && <VerifiedBadge size={12} color="#1877f2" />}</div>
          <div className="text-xs flex items-center gap-1" style={{ color: muted }}>{post.time} · <Globe className="w-3 h-3" /></div>
        </div>
        <MoreHorizontal style={{ color: muted }} />
      </div>
      <div className="px-3 pb-3 text-[15px] whitespace-pre-wrap">{post.text}</div>
      {post.image && <img src={post.image} alt="" className="w-full max-h-96 object-cover" />}
      <div className="px-3 py-2 flex items-center justify-between text-xs" style={{ color: muted }}>
        <div className="flex items-center gap-1">
          <span className="inline-flex">
            <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px]"><ThumbsUp className="w-2.5 h-2.5" /></span>
            <span className="w-4 h-4 -ml-1 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px]">❤</span>
          </span>
          <span className="ml-1">{fmtCount(post.likes)}</span>
        </div>
        <div>{comments.length} comments · {fmtCount(post.shares ?? 0)} shares</div>
      </div>
      <div className="border-t border-b grid grid-cols-3 text-sm" style={{ borderColor: border, color: muted }}>
        <button className="py-2 flex items-center justify-center gap-2 hover:bg-black/5"><ThumbsUp className="w-4 h-4" /> Like</button>
        <button className="py-2 flex items-center justify-center gap-2 hover:bg-black/5"><MessageCircle className="w-4 h-4" /> Comment</button>
        <button className="py-2 flex items-center justify-center gap-2 hover:bg-black/5"><Share2 className="w-4 h-4" /> Share</button>
      </div>
      <div className="p-3 space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-2">
            <Avatar name={c.author} className="w-8 h-8" color="bg-violet-500" />
            <div className="flex-1">
              <div className="rounded-2xl px-3 py-2 inline-block" style={{ background: dark ? "#3a3b3c" : "#f0f2f5" }}>
                <div className="font-semibold text-xs flex items-center gap-1">{c.author}{c.verified && <VerifiedBadge size={10} color="#1877f2" />}</div>
                <div className="text-sm mt-0.5 whitespace-pre-wrap">{c.text}</div>
              </div>
              <div className="text-xs mt-1 flex items-center gap-3" style={{ color: muted }}>
                <span>{c.time}</span><span className="font-semibold">Like ({fmtCount(c.likes)})</span><span className="font-semibold">Reply</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
