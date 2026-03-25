"use client";

import { create } from "zustand";

interface UIState {
  // 게시글 작성 모달
  isPostModalOpen: boolean;
  // 스토리 뷰어
  isStoryViewerOpen: boolean;
  currentStoryIndex: number;

  openPostModal: () => void;
  closePostModal: () => void;
  openStoryViewer: (index: number) => void;
  closeStoryViewer: () => void;
}

/**
 * UI 상태 전역 관리 (Zustand)
 * - 모달 열림/닫힘, 스토리 뷰어 인덱스 등 서버 데이터와 무관한 UI 상태
 */
export const useUIStore = create<UIState>((set) => ({
  isPostModalOpen: false,
  isStoryViewerOpen: false,
  currentStoryIndex: 0,

  openPostModal: () => set({ isPostModalOpen: true }),
  closePostModal: () => set({ isPostModalOpen: false }),

  openStoryViewer: (index) =>
    set({ isStoryViewerOpen: true, currentStoryIndex: index }),
  closeStoryViewer: () =>
    set({ isStoryViewerOpen: false, currentStoryIndex: 0 }),
}));
