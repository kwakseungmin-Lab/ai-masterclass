# Metal Slug Tribute

Claude Code로 자동 생성한 메탈슬러그 트리뷰트 2D 브라우저 게임.

## 플레이

`index.html`을 브라우저에서 열면 바로 플레이 가능 (43MB 단일 파일, 에셋 base64 인라인).

## 조작

- **방향키**: 이동
- **Z**: 사격
- **X**: 점프
- **C**: 수류탄

## 기술 스택

- 순수 HTML + JavaScript (빌드 도구 없음)
- GitHub에서 가져온 메탈슬러그 스프라이트 에셋 사용
- 프레임 기반 스프라이트 애니메이션 시스템
- 모든 스프라이트를 base64로 HTML에 인라인 (43MB 단일 파일)

## 구현 기능

- 플레이어 7종 애니메이션 (idle, walk, shoot, jump, grenade, crouch, look up)
- 적 다수 (일반 보병, 바주카병, 낙하병 등)
- 보스 1종
- 사이드스크롤 8000px 레벨
- 파티클/폭발 이펙트
- 사운드 이펙트

## 문서

- [report.md](./report.md) — 게임 제작 실험 보고서
