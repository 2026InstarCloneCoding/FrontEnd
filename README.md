# 📸 Instagram Clone — 2026

> 인천대학교 컴퓨터공학부 2학년 김도영의 인스타그램 클론코딩 프로젝트입니다.
> 4년 전 React + Redux + styled-components 기반 코드를 **2026년 최신 기술 스택으로 마이그레이션**하며,
> 각 기술의 차이와 발전을 직접 체감하는 것이 목표입니다.

---

## 🛠 기술 스택

| 분류 | 기술 | 기존 (4년 전) |
|------|------|--------------|
| 프레임워크 | Next.js 16 (App Router) | React (CRA) |
| 언어 | TypeScript | TypeScript |
| 상태관리 | Zustand + TanStack Query | Redux Ducks 패턴 |
| 스타일링 | Tailwind CSS v4 | styled-components |
| HTTP | Ky | Axios 커스텀 인스턴스 |
| 린트/포맷 | Biome | Prettier |
| 패키지 매니저 | PNPM | npm |

---

## 📁 폴더 구조

```
📦 instagram-clone/
├── 📂 app/
│   ├── 📂 (auth)/
│   │   └── 📂 login/page.tsx       # /login
│   ├── 📂 (main)/
│   │   ├── layout.tsx              # 사이드바 포함 레이아웃
│   │   └── page.tsx                # / 피드 홈
│   ├── 📂 direct/page.tsx          # /direct DM
│   │
│   ├── 📂 components/
│   │   ├── 📂 common/              # 공통 UI (Button, Input, Sidebar)
│   │   ├── 📂 feed/                # 피드 컴포넌트
│   │   ├── 📂 stories/             # 스토리 컴포넌트
│   │   ├── 📂 direct/              # DM 컴포넌트
│   │   └── 📂 icons/               # SVG 아이콘 React 컴포넌트
│   │
│   ├── 📂 store/
│   │   ├── useAuthStore.ts         # 로그인 상태 (Zustand)
│   │   └── useUIStore.ts           # 모달/뷰어 UI 상태 (Zustand)
│   ├── 📂 services/
│   │   └── client.ts               # Ky 인스턴스 (일반 / JWT 인증)
│   ├── 📂 hooks/
│   │   └── useInput.ts             # 입력 상태 커스텀 훅
│   ├── 📂 types/
│   │   ├── auth.ts
│   │   ├── post.ts
│   │   └── story.ts
│   ├── 📂 utils/
│   │   └── cn.ts                   # Tailwind 클래스 조합 유틸
│   │
│   ├── globals.css
│   ├── layout.tsx                  # 루트 레이아웃
│   ├── page.tsx                    # 루트 → /login 리다이렉트
│   └── providers.tsx               # TanStack Query Provider
│
├── 📂 public/images/
├── biome.json
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
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

# 4. 개발 서버 실행
pnpm dev   # → http://localhost:3000
```

### 자주 쓰는 명령어

```bash
pnpm dev      # 개발 서버 (Turbopack)
pnpm build    # 프로덕션 빌드
pnpm check    # Biome 린트 + 포맷 검사
pnpm format   # 코드 자동 포맷
```

---

## 📋 개발 로드맵

- [x] 1단계 — 프로젝트 초기 세팅
- [ ] 2단계 — 로그인 / 회원가입 페이지
- [ ] 3단계 — 피드 (게시글 + 무한스크롤)
- [ ] 4단계 — 스토리
- [ ] 5단계 — DM

---

## 📚 참고

- 기존 레포 (4년 전): [React_instagram_clone](https://github.com/Instagram-Clone-Coding/React_instagram_clone.git)
- 기술 스택 노션: [📦 기술 스택 정리](https://www.notion.so/32e0fa3de3eb81d1985cde85bc02dd70)
