# 📸 Instagram Clone — 2026

> 4년 전 React + Redux + styled-components 기반 코드를 **2026년 최신 기술 스택으로 마이그레이션**하며
> 각 기술의 차이와 발전을 직접 체감하는 것이 목표입니다.

---

## 🛠 기술 스택

| 분류 | 기술 | 기존 (4년 전) | 변경 이유 |
|------|------|--------------|-----------|
| 프레임워크 | React 19 + Vite 6 | React (CRA) | CRA 지원 종료, Vite로 빌드 속도 대폭 향상 |
| 언어 | TypeScript | TypeScript | — |
| 라우팅 | React Router v7 | React Router | 버전업, 최신 API |
| 클라이언트 & 서버 상태 | Context api | Redux Ducks 패턴 | 서버 데이터 캐싱·동기화 전담 |
| 스타일링 | Tailwind CSS v4 | styled-components | 런타임 오버헤드 0, 빌드 타임 CSS 추출 |
| HTTP | Fetch | Axios | 인터셉터 기반 JWT 자동 주입·재발급 |
| 린트/포맷 | Biome | Prettier | ESLint + Prettier를 파일 1개로 통합, 35배 빠름 |
| 패키지 매니저 | PNPM | npm | 심링크 방식 디스크 절약, 설치 속도 2배↑ |

---

## 📁 폴더 구조

```
instagram-clone/
│
├── public/
│   └── images/                        # 정적 이미지 (WebP)
│       ├── login-phones.webp          # 로그인 페이지 폰 목업
│       ├── appStore.png
│       └── googlePlay.png
│
├── src/
│   ├── pages/                         # 페이지 단위 컴포넌트
│   │   ├── login/
│   │   │   └── LoginPage.tsx          # /login
│   │   ├── feed/
│   │   │   └── FeedPage.tsx           # /
│   │   └── direct/
│   │       └── DirectPage.tsx         # /direct
│   │
│   ├── components/                    # UI 컴포넌트
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx          # 로그인 폼
│   │   │   └── PhoneCarousel.tsx      # 데스크톱 좌측 폰 이미지
│   │   ├── common/                    # 공통 UI (Button, Input, Sidebar...)
│   │   ├── feed/                      # 피드 컴포넌트
│   │   ├── stories/                   # 스토리 컴포넌트
│   │   ├── direct/                    # DM 컴포넌트
│   │   └── icons/                     # SVG → React 컴포넌트
│   │
│   ├── store/                         # Zustand (클라이언트 UI 상태)
│   │   ├── useAuthStore.ts            # 로그인 유저 정보, accessToken
│   │   └── useUIStore.ts              # 모달·뷰어 열림 상태
│   │
│   ├── services/                      # Axios API 레이어
│   │   ├── client.ts                  # 기본/인증 인스턴스 + 인터셉터
│   │   └── authService.ts             # 로그인·로그아웃 API 함수
│   │
│   ├── hooks/                         # 커스텀 훅
│   │   ├── useLogin.ts                # TanStack Query useMutation
│   │   └── useInput.ts                # 입력 상태 관리
│   │
│   ├── types/                         # TypeScript 타입 정의
│   │   ├── auth.ts
│   │   ├── post.ts
│   │   └── story.ts
│   │
│   ├── utils/
│   │   └── cn.ts                      # Tailwind 클래스 조합 유틸
│   │
│   ├── App.tsx                        # React Router 라우팅 구조
│   ├── main.tsx                       # 진입점 (TanStack Query Provider)
│   └── index.css                      # Tailwind + 전역 CSS
│
├── index.html                         # Vite HTML 진입점
├── vite.config.ts                     # Vite 설정 (@/* 경로 별칭)
├── biome.json                         # Biome 린트 + 포맷 설정
├── tsconfig.json                      # TypeScript 설정
└── package.json
```

---

## 🔄 데이터 흐름

```
사용자 액션 (예: 로그인 버튼 클릭)
    │
    ▼
LoginForm (컴포넌트)
    │  useLogin() 호출
    ▼
useLogin (TanStack Query useMutation)   ← 서버 상태 관리
    │  authService.login() 호출
    ▼
authService (services/)
    │  Axios apiClient 사용
    ▼
client.ts → 백엔드 API (/login)
    │
    ▼ 성공
useAuthStore.setAuth()                  ← Zustand 전역 상태 저장
    │
    ▼
navigate("/")                           ← React Router 페이지 이동
```

---

## 🚀 시작하기

```bash
# 1. 저장소 클론
git clone https://github.com/2026InstarCloneCoding/FrontEnd.git
cd FrontEnd

# 2. 의존성 설치
pnpm install

# 3. 환경변수 설정
cp .env.example .env.local
# VITE_API_BASE_URL=백엔드주소 입력

# 4. 개발 서버 실행
pnpm dev   # → http://localhost:5173
```

### 명령어

```bash
pnpm dev      # 개발 서버 (Vite HMR)
pnpm build    # 프로덕션 빌드 → dist/
pnpm preview  # 빌드 결과 미리보기
pnpm check    # Biome 린트 + 포맷 검사
pnpm format   # 코드 자동 포맷
```

---

## 📋 개발 로드맵

- [x] 1단계 — 프로젝트 초기 세팅 (React + Vite + PNPM + Tailwind v4 + Biome)
- [x] 2단계 — 로그인 UI + 상태관리 (TanStack Query + Zustand + Axios)
- [ ] 3단계 — 피드 (게시글 카드 + 무한스크롤)
- [ ] 4단계 — 스토리
- [ ] 5단계 — DM

---

## 📚 참고

- 기존 레포 (4년 전): [React_instagram_clone](https://github.com/Instagram-Clone-Coding/React_instagram_clone.git)
- 기술 스택 노션: [📦 기술 스택 정리](https://www.notion.so/32e0fa3de3eb81d1985cde85bc02dd70)
