import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/login/LoginPage";
import SignupPage from "@/pages/signup/SignupPage";
import FeedPage from "@/pages/feed/FeedPage";
import DirectPage from "@/pages/direct/DirectPage";

/**
 * 앱 라우팅 구조
 *
 * /login   → 로그인 페이지
 * /signup  → 회원가입 페이지
 * /        → 피드 홈
 * /direct  → DM
 * *        → /login 리다이렉트
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/"       element={<FeedPage />} />
        <Route path="/direct" element={<DirectPage />} />
        {/* 없는 경로는 로그인으로 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
