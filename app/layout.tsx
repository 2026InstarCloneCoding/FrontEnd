import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers' // 방금 만든 파일 불러오기

export const metadata: Metadata = {
  title: 'Instagram Clone',
  description: 'Next.js + Tailwind + Zustand + TanStack Query',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {/* 앱 전체를 Providers로 감싸줍니다 */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}