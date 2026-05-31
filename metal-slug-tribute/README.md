# Metal Slug Tribute

SNK Metal Slug 시리즈에 대한 트리뷰트 게임입니다.  
프레임 기반 스프라이트 애니메이션 시스템으로 원작의 움직임을 재현했습니다.

## 플레이 방법

- **이동**: 방향키 (←→ 좌우, ↑ 점프)
- **사격**: Z키 (기본 총), X키 (수류탄)
- **엎드리기**: ↓ + Z (엎드려 사격)
- **목표**: 적을 처치하며 스테이지 돌파

## 기술 스택

| 항목 | 선택 |
|------|------|
| 언어 | Vanilla JavaScript (ES6+) |
| 렌더러 | Canvas 2D API |
| 배포 | 단일 HTML 파일 (`index.html`) |
| 에셋 | 외부 스프라이트 시트 + WAV 사운드 |

## 에셋 구조

```
sprites/
├── Player*/          # 플레이어 애니메이션 (프레임별 PNG)
│   ├── PlayerIdle/   # 대기 (11프레임)
│   ├── PlayerWalking/ # 걷기 (23프레임)
│   ├── PlayerShooting/ # 사격 (8프레임)
│   ├── PlayerJumpUp/ # 점프 (6프레임)
│   ├── PlayerKnife/  # 나이프 (8프레임)
│   ├── PlayerReload/ # 재장전 (19프레임)
│   └── ...
├── Enemy*/           # 적 스프라이트
│   ├── EnemyTank/    # 탱크 (이동·사망·탄환)
│   ├── EnemyHelicopter/ # 헬리콥터
│   ├── EnemyZombieMacro/ # 좀비
│   ├── EnemyMechaRobot/ # 메카로봇
│   ├── EnemyUFO/     # UFO
│   ├── EnemyAirship/ # 비행선
│   ├── EnemyScientist/ # 과학자
│   └── EnemyStrongerTank/ # 강화 탱크
├── Projectile*/      # 발사체 이펙트
│   ├── ProjectileBulletExplosion/ # 총알 폭발 (11프레임)
│   └── ProjectileGrenadeExplosion/ # 수류탄 폭발 (20프레임)
├── Sounds/           # 효과음·BGM (WAV)
│   ├── BGM1.wav, Mission1.wav, Boss.wav
│   ├── Shoot.wav, Machinegun.wav, Reload.wav
│   ├── Explosion.wav, Grenade1.wav
│   └── ...
└── *.png             # 배경·아이템·장애물 단일 이미지
    ├── Map1.png, bg_ground_desert.png
    ├── item_shotgun.png, item_crate.png
    └── obstacle_*.png
```

## 핵심 구현 사항

### 프레임 기반 스프라이트 시스템
```javascript
const SPRITE_DEFS = {
  player_idle:   { folder: 'PlayerIdle',    count: 11, speed: 8 },
  player_walk:   { folder: 'PlayerWalking', count: 23, speed: 3 },
  player_shoot:  { folder: 'PlayerShooting', count: 8, speed: 4 },
  // ...
};
```
각 애니메이션은 번호가 붙은 PNG 프레임 시퀀스로 구성됩니다.  
`speed` 값으로 프레임 전환 속도를 조절합니다.

### Canvas 설정
```javascript
ctx.imageSmoothingEnabled = false; // 픽셀 선명도 유지
canvas.width = 640; canvas.height = 448; // 원작 비율
```
픽셀 아트 렌더링을 위해 안티앨리어싱을 비활성화했습니다.

## 작업 과정

### 1. 스프라이트 수집
원작 Metal Slug 시리즈의 스프라이트 시트에서 프레임별로 분리된 PNG 에셋을 확보했습니다.  
플레이어 13종 애니메이션, 적 7종, 이펙트 2종, 사운드 24개를 준비했습니다.

### 2. 스프라이트 로딩 시스템 설계
파일이 많아 로딩 완료 전 게임이 시작되는 문제를 방지하기 위해  
카운터 기반 비동기 로딩 시스템을 구축했습니다.

### 3. 구현 순서
1. Canvas 초기화 및 반응형 스케일링
2. 스프라이트 정의 및 비동기 로딩
3. 플레이어 상태 머신 (idle → walk → shoot → jump)
4. 적 AI 및 스폰 시스템
5. 발사체 및 충돌 판정
6. 사운드 시스템
7. 스테이지 구성

### 4. 단일 파일 배포
외부 의존성 없이 `index.html` 하나로 완결되는 구조로 제작했습니다.  
스프라이트는 상대 경로(`sprites/`)로 참조합니다.

## 실행

```bash
# 로컬 서버 필요 (file:// 프로토콜에서는 이미지 로딩 제한)
npx serve .
# 또는
python3 -m http.server 8080
```
브라우저에서 `http://localhost:8080` 접속
