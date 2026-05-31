# Crossy Road Clone

Claude Code + Three.js로 자동 생성한 길건너 친구들(Crossy Road) 브라우저 게임.

## 플레이

`game/index.html`을 브라우저에서 열면 바로 플레이 가능 (519KB 단일 파일, 설치 불필요).

## 조작

- **방향키 / WASD**: 이동 (홉)
- **Space**: 시작 / 재시작

## 기술 스택

- Three.js + TypeScript + Vite
- OrthographicCamera 등각 뷰, 9:16 세로 화면비
- 프로시저럴 에셋 (Box/Cylinder 조합, 외부 파일 0)
- vite-plugin-singlefile로 단일 HTML 패키징

## 구현 기능

- Row 기반 무한 지형 (풀밭, 도로, 강, 철도)
- 차량/트럭/버스, 통나무, 기차 장애물
- 홉 이동 + 포물선 애니메이션
- 점수 + localStorage 최고점수 저장
- 메뉴 → 게임 → 게임오버 씬 전환

## 문서

- [report.md](./report.md) — 게임 제작 실험 보고서
