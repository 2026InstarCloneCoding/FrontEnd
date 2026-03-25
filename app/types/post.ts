export interface Post {
  id: number;
  imageUrls: string[];
  caption: string | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  author: {
    id: number;
    username: string;
    profileImageUrl: string | null;
  };
}

// 무한스크롤 커서 기반 응답
export interface FeedResponse {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}
