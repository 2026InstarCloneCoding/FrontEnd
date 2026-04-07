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

export interface StoryGroup {
  userId: number;
  username: string;
  profileImageUrl: string | null;
  hasUnviewed: boolean;
  stories: Story[];
}
