import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// ── 타입 정의 ─────────────────────────────────────────────
interface UIContextType {
  isPostModalOpen: boolean;
  openPostModal: () => void;
  closePostModal: () => void;
  isStoryViewerOpen: boolean;
  currentStoryIndex: number;
  openStoryViewer: (index: number) => void;
  closeStoryViewer: () => void;
}

// ── Context 생성 ───────────────────────────────────────────
const UIContext = createContext<UIContextType | null>(null);

// ── Provider ───────────────────────────────────────────────
export function UIProvider({ children }: { children: ReactNode }) {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const openStoryViewer = (index: number) => {
    setCurrentStoryIndex(index);
    setIsStoryViewerOpen(true);
  };

  const closeStoryViewer = () => {
    setIsStoryViewerOpen(false);
    setCurrentStoryIndex(0);
  };

  return (
    <UIContext.Provider
      value={{
        isPostModalOpen,
        openPostModal: () => setIsPostModalOpen(true),
        closePostModal: () => setIsPostModalOpen(false),
        isStoryViewerOpen,
        currentStoryIndex,
        openStoryViewer,
        closeStoryViewer,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

// ── 커스텀 훅 ──────────────────────────────────────────────
export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI는 UIProvider 안에서 사용해야 합니다.");
  return ctx;
}
