// 메인 레이아웃 — 좌측 사이드바 포함 (3단계에서 구현)
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* TODO: <Sidebar /> */}
      <main className="flex-1 ml-0 md:ml-64">{children}</main>
    </div>
  );
}
