export interface Story {
  id: number;
  mediaUrl: string;
  expiresAt: string;
  isViewed: boolean;
  author: {
    id: number;
    username: string;
    profileImageUrl: string | null;
  };
}

// 유저별로 묶인 스토리 그룹 (상단 스토리 바에서 사용)
export interface StoryGroup {
  userId: number;
  username: string;
  profileImageUrl: string | null;
  hasUnviewed: boolean;
  stories: Story[];
}
