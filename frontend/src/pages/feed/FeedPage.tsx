import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import StoriesRow from "@/components/feed/StoriesRow";
import PostCard from "@/components/feed/PostCard";
import StoryViewer from "@/components/feed/StoryViewer";
import { MOCK_POSTS, MOCK_STORY_GROUPS, MOCK_SUGGESTIONS, getExtraPostsBatch, EXTRA_POSTS_MAX_PAGE } from "@/data/mockFeed";
import type { Post } from "@/types/post";
import type { FollowUser } from "@/types/follow";
import { followService } from "@/services/followService";

// ── 추천 유저 아이템 ───────────────────────────────────────────
function SuggestionItem({ user: u, onToggle }: { user: FollowUser; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <Link to={`/profile/${u.username}`}>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#dbdbdb] shrink-0">
          {u.imageUrl
            ? <img src={u.imageUrl} alt="" className="w-full h-full object-cover"/>
            : <svg viewBox="0 0 24 24" fill="#c7c7c7" className="w-full h-full">
                <circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
              </svg>
          }
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/profile/${u.username}`}>
          <p className="text-[13px] font-semibold text-[#262626] truncate">{u.username}</p>
          <p className="text-[12px] text-[#737373] truncate">{u.name}</p>
        </Link>
      </div>
      <button
        onClick={onToggle}
        className={`text-[13px] font-semibold transition-opacity hover:opacity-60 ${u.isFollowing ? "text-[#737373]" : "text-[#0095f6]"}`}
      >
        {u.isFollowing ? "팔로잉" : "팔로우"}
      </button>
    </div>
  );
}

// ── 오른쪽 사이드바 ───────────────────────────────────────────
function RightSidebar() {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<FollowUser[]>(MOCK_SUGGESTIONS);

  const toggleFollow = async (u: FollowUser) => {
    setSuggestions((prev) =>
      prev.map((x) => x.memberId === u.memberId ? { ...x, isFollowing: !x.isFollowing } : x)
    );
    try {
      if (u.isFollowing) await followService.unfollow(u.username);
      else               await followService.follow(u.username);
    } catch {
      setSuggestions((prev) =>
        prev.map((x) => x.memberId === u.memberId ? { ...x, isFollowing: u.isFollowing } : x)
      );
    }
  };

  return (
    <aside className="w-[319px] shrink-0 pt-4">
      {/* 현재 유저 */}
      <div className="flex items-center gap-3 mb-5">
        <Link to="/profile">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-[#dbdbdb] shrink-0">
            {user?.imageUrl
              ? <img src={user.imageUrl} alt="" className="w-full h-full object-cover"/>
              : <svg viewBox="0 0 24 24" fill="#c7c7c7" className="w-full h-full">
                  <circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
                </svg>
            }
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link to="/profile">
            <p className="text-[14px] font-semibold text-[#262626] truncate">{user?.username}</p>
          </Link>
        </div>
        <button className="text-[13px] font-semibold text-[#0095f6] hover:opacity-60 transition-opacity">
          전환
        </button>
      </div>

      {/* 추천 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-semibold text-[#737373]">회원님을 위한 추천</p>
        <Link to="/explore" className="text-[12px] font-semibold text-[#262626] hover:opacity-60">
          모두 보기
        </Link>
      </div>

      {/* 추천 목록 */}
      <div className="flex flex-col gap-3 mb-6">
        {suggestions.map((u) => (
          <SuggestionItem key={u.memberId} user={u} onToggle={() => toggleFollow(u)} />
        ))}
      </div>

      {/* 푸터 */}
      <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
        {["소개","도움말","언론","API","채용","개인정보","약관","위치","언어"].map((t) => (
          <span key={t} className="text-[11px] text-[#737373] cursor-pointer hover:underline">{t}</span>
        ))}
      </div>
      <p className="text-[11px] text-[#737373]">© 2026 INSTAGRAM FROM META</p>
    </aside>
  );
}

// ── 피드 페이지 ───────────────────────────────────────────────
export default function FeedPage() {
  const [posts, setPosts]               = useState<Post[]>(MOCK_POSTS);
  const [loadingMore, setLoadingMore]   = useState(false);
  const [hasMore, setHasMore]           = useState(true);
  const [storyGroupIdx, setStoryGroupIdx] = useState<number | null>(null);
  const batchRef    = useRef(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // ── 추가 게시물 로드 ──────────────────────────────────────
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextBatch = batchRef.current + 1;
      const newPosts  = getExtraPostsBatch(nextBatch);
      if (newPosts.length === 0 || nextBatch > EXTRA_POSTS_MAX_PAGE) {
        setHasMore(false);
      } else {
        batchRef.current = nextBatch;
        setPosts((prev) => [...prev, ...newPosts]);
        if (nextBatch >= EXTRA_POSTS_MAX_PAGE) setHasMore(false);
      }
      setLoadingMore(false);
    }, 800);
  }, [loadingMore, hasMore]);

  // ── IntersectionObserver ──────────────────────────────────
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <>
      {/* 스토리 뷰어 */}
      {storyGroupIdx !== null && (
        <StoryViewer
          groups={MOCK_STORY_GROUPS}
          initialGroupIndex={storyGroupIdx}
          onClose={() => setStoryGroupIdx(null)}
        />
      )}

      <div className="w-full max-w-[935px] px-4">
        <div className="flex gap-8">

          {/* ── 피드 메인 컬럼 ── */}
          <div className="w-full max-w-[470px] py-4 mx-auto xl:mx-0">
            <StoriesRow
              stories={MOCK_STORY_GROUPS}
              onGroupClick={(i) => setStoryGroupIdx(i)}
            />
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {/* 로딩 인디케이터 / 끝 메시지 */}
            <div ref={sentinelRef} className="py-8 text-center">
              {loadingMore ? (
                <div className="flex justify-center">
                  <div className="w-8 h-8 border-2 border-[#dbdbdb] border-t-[#737373] rounded-full animate-spin" />
                </div>
              ) : !hasMore ? (
                <p className="text-[12px] text-[#737373]">모든 게시물을 확인했습니다 ✓</p>
              ) : null}
            </div>
          </div>

          {/* ── 오른쪽 사이드바 (xl 이상에서만 표시) ── */}
          <div className="hidden xl:block">
            <div className="sticky top-6">
              <RightSidebar />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
