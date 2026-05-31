# AI Masterclass — Game Dev Experiments

Claude Code의 멀티 에이전트 파이프라인으로 만든 게임 실험 모음입니다.  
리서치부터 구현까지 AI가 주도하고, 인간이 방향을 잡는 방식으로 제작했습니다.

## 게임 목록

| 게임 | 장르 | 기술 스택 | 상태 |
|------|------|-----------|------|
| [Crossy Road Clone](./crossy-road/) | 3D 아케이드 | TypeScript · Three.js · Vite | 플레이 가능 |
| [Metal Slug Tribute](./metal-slug-tribute/) | 2D 횡스크롤 액션 | Vanilla JS · Canvas 2D | 플레이 가능 |

---

## 작업 방식

### 에이전트 파이프라인

두 게임 모두 `game-director` 에이전트가 지휘하는 파이프라인으로 제작됐습니다.

```
game-researcher   →  게임 메카닉·기술 스택 리서치
game-builder      →  프로젝트 초기 구조 세팅
game-engine-dev   →  렌더러·게임루프·물리 구현
game-gameplay-dev →  플레이어·충돌·점수 시스템 구현
game-asset-creator → 에셋 수집 및 파이프라인 구성
game-assembler    →  통합 및 빌드
game-reviewer     →  버그 리뷰 및 폴리시
```

---

## 디렉토리 구조

```
ai-masterclass/
├── crossy-road/
│   ├── game/         # 완성된 빌드
│   │   └── index.html    # 단일 파일 게임 (519KB)
│   ├── src/          # TypeScript 소스
│   └── report.md
└── metal-slug-tribute/
    ├── game/         # 완성된 빌드
    │   └── index.html    # 단일 파일 게임 (43MB, 에셋 인라인)
    ├── sprites/      # 원본 스프라이트 에셋
    └── report.md
```

---

## 실행 방법

두 게임 모두 `game/index.html`을 브라우저에서 열면 바로 플레이 가능합니다.
