// 루트 → 로그인 여부에 따라 피드 or 로그인으로 리다이렉트 (추후 미들웨어 연결)
import { redirect } from "next/navigation";

export default function RootPage() {
  // TODO: 로그인 상태 확인 후 분기
  redirect("/login");
}
