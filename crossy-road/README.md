# Crossy Road Clone

Hipster Whale의 Crossy Road를 Three.js로 재현한 3D 브라우저 게임입니다.

## 플레이 방법

- **이동**: W·A·S·D 또는 방향키
- **목표**: 차도·철로·강을 건너 최대한 멀리 전진
- **사망 조건**: 차량/기차 충돌, 강에 빠짐, 화면 밖 이탈, 5초 정지(독수리)

## 기술 스택

| 항목 | 선택 |
|------|------|
| 언어 | TypeScript (strict) |
| 렌더러 | Three.js — OrthographicCamera + BoxGeometry |
| 빌드 | Vite |
| 스타일 | 복셀(Voxel) — BoxGeometry로 프로시저럴 구성 |
| 물리 | 별도 엔진 없음, AABB 기반 직접 구현 |

## 소스 구조

```
src/
├── main.ts           # 진입점, 이벤트 바인딩
├── game.ts           # 게임 상태·루프 통합
├── player.ts         # 플레이어 이동·홉 애니메이션·점수
├── camera.ts         # OrthographicCamera 등각 추적
├── collision.ts      # AABB 충돌 판정, 통나무 탑승
├── vehicles.ts       # 차량·통나무 이동 로직
├── ui.ts             # 점수 표시·게임오버 화면
├── utils.ts          # 상수·공용 유틸
└── terrain/
    ├── row-generator.ts  # 절차적 Row 생성·재활용
    ├── grass-row.ts      # 풀밭 (나무·바위 배치)
    ├── road-row.ts       # 도로 (차·트럭 생성)
    ├── river-row.ts      # 강 (통나무·연잎 생성)
    └── rail-row.ts       # 철로 (기차 생성)
```

## 핵심 구현 사항

### 카메라
```typescript
// 45도 등각 뷰, OrthographicCamera
camera.position.set(300, 300, 300)
camera.lookAt(scene.position)
```
원근감이 없는 직교 투영으로 원작의 복셀 느낌을 구현했습니다.

### 절차적 지형 생성
플레이어가 전진할 때마다 앞에 새 Row를 생성하고 뒤쪽 Row를 제거합니다.  
Row 타입(grass/road/river/rail)은 가중치를 적용해 랜덤 결정합니다.

### 게임 루프
```typescript
// 고정 타임스텝 (60 UPS)
const TICK_RATE = 1000 / 60;
while (accumulator >= TICK_RATE) {
  update(TICK_RATE);
  accumulator -= TICK_RATE;
}
render(accumulator / TICK_RATE); // 보간
```

## 작업 과정

### 1. 리서치 (`research/`)
- `crossy-research.md` — 원작 메카닉 전체 분석 (이동·사망·타이머·아트 스타일)
- `references.md` — Three.js 튜토리얼·참고 코드 목록 (FreeCodeCamp, EvanBacon 클론 등)
- `assets.md` — 사용 가능한 오픈소스 에셋 목록 (Kenney, itch.io CC0 등)

### 2. 기술 선택
- Three.js BoxGeometry로 별도 에셋 없이 복셀 스타일 구현
- 물리 엔진 대신 그리드 기반 AABB 직접 구현 (단순성 우선)

### 3. 구현 순서
1. 프로젝트 세팅 (Vite + TypeScript)
2. 카메라·씬·기본 렌더링
3. 절차적 지형 Row 시스템
4. 플레이어 이동·홉 애니메이션
5. 차량·통나무 이동
6. 충돌 판정
7. UI (점수·게임오버)

## 실행

```bash
npm install
npm run dev    # 개발 서버
npm run build  # 프로덕션 빌드
```
