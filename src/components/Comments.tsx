"use client";

import { useEffect, useState } from "react";

interface Comment {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
}

export default function Comments({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Delete
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");

  async function fetchComments() {
    try {
      const res = await fetch(`/api/comments?post=${postSlug}`);
      if (res.ok) {
        setComments(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_slug: postSlug,
          nickname,
          password,
          content,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "댓글 작성에 실패했습니다.");
        return;
      }

      setContent("");
      fetchComments();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch("/api/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password: deletePassword }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "삭제에 실패했습니다.");
      return;
    }

    setDeleteId(null);
    setDeletePassword("");
    fetchComments();
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <section className="mt-20 pt-10 border-t border-border">
      <h3 className="font-display text-xl tracking-tight mb-8">
        댓글 {comments.length > 0 && <span className="text-text-tertiary text-base ml-1">{comments.length}</span>}
      </h3>

      {/* Comment List */}
      {loading ? (
        <p className="text-text-tertiary text-sm py-8">불러오는 중...</p>
      ) : comments.length === 0 ? (
        <p className="text-text-tertiary text-sm py-8">아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요.</p>
      ) : (
        <div className="flex flex-col gap-0 mb-12">
          {comments.map((c) => (
            <div key={c.id} className="py-5 border-b border-border group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-text-primary">{c.nickname}</span>
                  <span className="text-[0.7rem] text-text-tertiary">{formatDate(c.created_at)}</span>
                </div>
                {deleteId === c.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="w-28 px-2 py-1 text-xs bg-bg-elevated border border-border text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-hover"
                    />
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-[0.7rem] text-red-400 hover:text-red-300 transition-colors"
                    >
                      확인
                    </button>
                    <button
                      onClick={() => { setDeleteId(null); setDeletePassword(""); }}
                      className="text-[0.7rem] text-text-tertiary hover:text-text-secondary transition-colors"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteId(c.id)}
                    className="text-[0.7rem] text-text-tertiary opacity-0 group-hover:opacity-100 hover:text-text-secondary transition-all"
                  >
                    삭제
                  </button>
                )}
              </div>
              <p className="text-sm text-text-secondary font-light leading-relaxed whitespace-pre-wrap">
                {c.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            maxLength={30}
            className="flex-1 px-4 py-3 text-sm bg-bg-elevated border border-border text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-hover transition-colors"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="flex-1 px-4 py-3 text-sm bg-bg-elevated border border-border text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-hover transition-colors"
          />
        </div>
        <textarea
          placeholder="댓글을 남겨주세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          maxLength={2000}
          rows={4}
          className="w-full px-4 py-3 text-sm bg-bg-elevated border border-border text-text-primary placeholder:text-text-tertiary outline-none focus:border-border-hover transition-colors resize-none leading-relaxed"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 text-xs tracking-widest uppercase bg-text-primary text-bg font-medium hover:bg-accent transition-colors disabled:opacity-50"
          >
            {submitting ? "작성 중..." : "댓글 작성"}
          </button>
        </div>
      </form>
    </section>
  );
}
