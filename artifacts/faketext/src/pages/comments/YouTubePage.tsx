import { useState } from "react";
import { ThumbsUp, ThumbsDown, Heart, MoreVertical, Pin, MessageCircle } from "lucide-react";
import { CommentItem, PostConfig, uid } from "@/lib/types";
import { GeneratorLayout } from "@/components/GeneratorLayout";
import { PostPanel, CommentsEditor, fmtCount, VerifiedBadge } from "@/components/CommentEditor";
import { Avatar } from "@/components/MessageEditor";
import { useSeo } from "@/lib/seo";

const initialComments: CommentItem[] = [
  { id: uid(), author: "@HermanFromOhio", text: "Bro this video changed my life. Liked & subscribed instantly.", time: "2 days ago", likes: 4823, hearted: true, pinned: true,
    replies: [{ id: uid(), author: "@TheCreator", text: "Welcome to the family ❤", time: "2 days ago", likes: 187 }] },
  { id: uid(), author: "@LeahDoes", text: "Whoever's editing your videos deserves a raise. Insane work.", time: "1 day ago", likes: 1342 },
  { id: uid(), author: "@yt_oldhead", text: "Came for the thumbnail, stayed for the content. Internet still wins sometimes.", time: "5 hours ago", likes: 88 },
];

export default function YouTubePage() {
  useSeo({
    title: "Fake YouTube Comments Generator | FakeText.fun",
    description: "Generate realistic fake YouTube comment threads with hearts, pinned comments, replies and like counts. Free PNG download.",
    path: "/comments/youtube",
  });
  const [post, setPost] = useState<PostConfig>({
    author: "TheCreator", handle: "@TheCreator", verified: true, text: "I lived in a treehouse for 30 days — here's what happened",
    likes: 423000, shares: 0, views: 1842000, time: "2 days ago", dark: true,
  });
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  return (
    <GeneratorLayout
      title="Fake YouTube Comments Generator"
      description="Mock a viral YouTube comment thread — pinned comments, hearts from the creator, replies and like counts."
      filename="fake-youtube-comments.png"
      controls={<><PostPanel config={post} setConfig={setPost} includeImage={false} includeViews label="Video" /><CommentsEditor comments={comments} setComments={setComments} /></>}
      preview={<YouTubePreview post={post} comments={comments} />}
      faqs={[
        { q: "Can I add the creator's heart on a comment?", a: "Yes, toggle '❤ creator' on any comment to show the small red heart from the creator." },
        { q: "What's the difference between pinned and hearted?", a: "Pinned shows a 'Pinned by creator' label above the comment. Hearted shows a small red heart bubble next to the like button." },
      ]}
    />
  );
}

function YouTubePreview({ post, comments }: { post: PostConfig; comments: CommentItem[] }) {
  const dark = post.dark;
  const bg = dark ? "#0f0f0f" : "#fff";
  const fg = dark ? "#fff" : "#0f0f0f";
  const muted = dark ? "#aaa" : "#606060";
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ width: 560, background: bg, color: fg }}>
      <div className="p-4 border-b" style={{ borderColor: dark ? "#272727" : "#e5e5e5" }}>
        <div className="text-xl font-semibold leading-snug">{post.text}</div>
        <div className="mt-2 text-xs" style={{ color: muted }}>{fmtCount(post.views ?? 0)} views · {post.time}</div>
        <div className="mt-3 flex items-center gap-3">
          <Avatar src={post.avatar} name={post.author} className="w-10 h-10" color="bg-red-500" />
          <div className="flex-1">
            <div className="font-semibold flex items-center gap-1">{post.author} {post.verified && <VerifiedBadge color={dark ? "#aaa" : "#606060"} size={12} />}</div>
            <div className="text-xs" style={{ color: muted }}>1.2M subscribers</div>
          </div>
          <button className="bg-red-600 text-white rounded-full px-4 py-2 text-sm font-semibold">Subscribe</button>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          <div className="rounded-full px-3 py-1.5 text-sm font-medium flex items-center gap-2" style={{ background: dark ? "#272727" : "#f2f2f2" }}>
            <ThumbsUp className="w-4 h-4" /> {fmtCount(post.likes)}
          </div>
          <div className="rounded-full px-3 py-1.5 text-sm font-medium flex items-center gap-2" style={{ background: dark ? "#272727" : "#f2f2f2" }}>
            <ThumbsDown className="w-4 h-4" />
          </div>
          <div className="rounded-full px-3 py-1.5 text-sm font-medium" style={{ background: dark ? "#272727" : "#f2f2f2" }}>Share</div>
          <div className="rounded-full px-3 py-1.5 text-sm font-medium" style={{ background: dark ? "#272727" : "#f2f2f2" }}>Save</div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-semibold">{comments.length.toLocaleString()} Comments</span>
          <span className="text-sm" style={{ color: muted }}>Sort by</span>
        </div>
        <div className="space-y-5">
          {comments.map((c) => (
            <div key={c.id}>
              {c.pinned && <div className="text-xs mb-1 ml-12 flex items-center gap-1" style={{ color: muted }}><Pin className="w-3 h-3" /> Pinned by {post.author}</div>}
              <div className="flex gap-3">
                <Avatar name={c.author.replace("@", "")} className="w-9 h-9" color="bg-violet-500" />
                <div className="flex-1">
                  <div className="text-sm flex items-center gap-1">
                    <span className="font-semibold">{c.author}</span>
                    {c.verified && <VerifiedBadge color={dark ? "#aaa" : "#606060"} size={11} />}
                    <span className="text-xs ml-1" style={{ color: muted }}>{c.time}</span>
                  </div>
                  <div className="text-sm mt-0.5 whitespace-pre-wrap">{c.text}</div>
                  <div className="mt-2 flex items-center gap-4 text-xs" style={{ color: muted }}>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {fmtCount(c.likes)}</span>
                    <ThumbsDown className="w-3.5 h-3.5" />
                    {c.hearted && (
                      <span className="relative inline-block">
                        <Avatar name={post.author} className="w-5 h-5" color="bg-red-500" />
                        <Heart className="w-3 h-3 fill-red-500 text-red-500 absolute -bottom-0.5 -right-0.5" />
                      </span>
                    )}
                    <span className="font-semibold uppercase tracking-wide">Reply</span>
                  </div>
                  {(c.replies ?? []).length > 0 && (
                    <div className="mt-2 text-xs font-semibold text-blue-400 inline-flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {c.replies!.length} repl{c.replies!.length === 1 ? "y" : "ies"}</div>
                  )}
                  {(c.replies ?? []).map((r) => (
                    <div key={r.id} className="flex gap-3 mt-3">
                      <Avatar name={r.author.replace("@", "")} className="w-7 h-7" color="bg-orange-500" />
                      <div className="flex-1">
                        <div className="text-sm"><span className="font-semibold">{r.author}</span> <span className="text-xs ml-1" style={{ color: muted }}>{r.time}</span></div>
                        <div className="text-sm mt-0.5">{r.text}</div>
                        <div className="mt-1 flex items-center gap-4 text-xs" style={{ color: muted }}>
                          <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {fmtCount(r.likes)}</span>
                          <ThumbsDown className="w-3.5 h-3.5" />
                          <span className="font-semibold uppercase tracking-wide">Reply</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <MoreVertical className="w-4 h-4" style={{ color: muted }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
