'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  // useState로 래핑하여 서버 사이드 렌더링 시 데이터가 섞이지 않도록 합니다.
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // 탭 이동 후 돌아왔을 때 자동 재요청 방지
        retry: 1, // 실패 시 재시도 횟수
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서 API 요청 캐시를 볼 수 있는 도구입니다 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}