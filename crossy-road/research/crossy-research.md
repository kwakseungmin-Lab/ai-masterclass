# Crossy Road (길건너 친구들) - 게임 리서치

## 장르

- **무한 러너 (Endless Hopper)**: 고전 Frogger를 현대적으로 재해석한 아케이드 게임
- 개발사: Hipster Whale (호주 멜버른)
- 출시: 2014년 10월 (iOS), 2015년 1월 (Android)
- 300개 이상의 캐릭터, 28개 이상의 월드/테마

---

## 핵심 메카닉

### 이동
- **전/후/좌/우 4방향 이동** (모바일: 스와이프/탭, 브라우저: 키보드 방향키/WASD)
- 한 번에 한 칸씩 홉(hop) 방식으로 이동
- 앞으로 이동할 때마다 점수 +1
- 뒤로 가거나 옆으로 이동은 점수 증가 없음

### 점수 시스템
- 전진 1칸 = 1점
- 코인 수집 (맵 곳곳에 랜덤 배치)
- 이론상 무한 점수, 실질적 세계 기록은 약 1,500~2,000점대
- 고득점 팁: 화면 상단부를 주시하여 3~4줄 앞의 장애물을 미리 예측

### 타이머/독수리 메카닉
- **약 5초간 움직이지 않으면** 독수리(Eagle)가 내려와 캐릭터를 낚아채 게임 오버
- 뒤로 3칸 이상 이동해도 독수리 트리거
- 목적: idle 방지, 지속적인 전진 유도
- 테마별 변형: 공룡맵 = 익룡, 디즈니 맵 = 각 IP별 캐릭터 (갈매기, 가오리, 원숭이 등)

---

## 장애물 종류

### 도로 (Road Lanes)
| 장애물 | 설명 |
|--------|------|
| **자동차 (Car)** | 같은 차선 내 속도 일정, 빠른 타이밍 판단 필요 |
| **트럭 (Truck)** | 자동차보다 길고 느림, 넓은 히트박스 |
| **버스 (Bus)** | 트럭과 유사, 더 큰 크기 |
| **기차 (Train)** | 매우 빠른 속도, 신호등/경고등으로 접근 예고. 기차 레인 오른쪽 칸은 항상 안전 |

### 강 (River Lanes)
| 장애물 | 설명 |
|--------|------|
| **통나무 (Log)** | 물 위에 떠다니며 플레이어가 탑승 가능, 이동 방향으로 함께 이동 |
| **연잎 (Lily Pad)** | 통나무와 유사하지만 작은 크기, 한 칸짜리 발판 |
| **물에 빠지기** | 통나무/연잎 없는 곳에 착지하면 즉사 |
| **급류** | 통나무를 타고 화면 밖으로 밀려나면 사망 |

### 풀밭 (Grass Lanes)
| 장애물 | 설명 |
|--------|------|
| **나무 (Tree)** | 고정 장애물, 이동 경로 차단 (통과 불가) |
| **바위 (Rock)** | 나무와 동일한 역할의 고정 장애물 |

### 특수 장애물 (테마별)
- **공항 맵**: 활주로 위의 비행기
- **공룡 맵**: 공룡이 자동차 대체, 연둣빛 강
- **해저 맵**: 물고기 떼 후 상어 떼 (기차 대체)
- **우주 맵**: 장애물이 떠 있어 거리 판단 어려움

---

## 사망 방식

1. **차량에 치임** - 도로에서 자동차/트럭/버스에 충돌
2. **기차에 치임** - 철로에서 기차에 충돌
3. **물에 빠짐** - 강에서 통나무/연잎 없는 곳에 착지
4. **급류에 떠내려감** - 통나무를 타고 화면 밖으로 이탈
5. **독수리에 납치됨** - 5초 이상 idle 또는 뒤로 3칸 이상 이동
6. **화면 밖 이탈** - 좌우로 너무 멀리 이동

---

## 아트 스타일

### 복셀 (Voxel) 그래픽
- **제작 도구**: Qubicle (복셀 에디터)로 제작
- **스타일**: 청키(chunky)하고 장난감 같은 느낌, 플랫 컬러, 최소한의 셰이딩
- **해상도**: 모든 오브젝트가 직육면체(복셀) 기반
- **색상**: 밝고 선명한 팔레트, 테마별 색상 변화

### 카메라
- **등각(Isometric) 시점**: 45도 회전된 탑다운 뷰
- **Orthographic Camera** 사용 (원근감 없는 직교 투영)
- 개발자 Matt Hall: "복셀은 각도를 틀면 100배 더 좋아 보인다"
- 카메라가 플레이어를 따라 부드럽게 스크롤

### 라이팅
- 부드러운 그림자 (directional light)
- 깨끗하고 밝은 조명, 과도한 그림자 없음
- 환경에 따른 분위기 변화 (낮/밤, 테마별)

---

## 브라우저 3D 구현 방안

### 기술 스택
- **Three.js**: 3D 렌더링 엔진
- **Vite**: 빌드 도구 / 개발 서버
- **TypeScript**: 타입 안전성

### 카메라 설정
```
OrthographicCamera 사용
- 45도 등각(isometric) 뷰
- camera.position.set(300, 300, 300)
- camera.lookAt(scene.position)
- aspect ratio에 따른 frustum 계산
```

### 지형 생성 (Procedural)
- **Row 기반 생성**: 플레이어 전진 시 앞쪽에 새 Row 추가, 뒤쪽 Row 제거
- Row 타입 랜덤 결정: grass / road / river / rail
- 각 Row에 장애물/오브젝트 배치
- **오브젝트 풀링**: Row 재활용으로 메모리 효율화

### 오브젝트 렌더링
- Three.js 기본 BoxGeometry로 복셀 스타일 구현 가능
- MeshLambertMaterial 또는 MeshStandardMaterial로 플랫 셰이딩
- 캐릭터/차량은 여러 Box를 Group으로 묶어 구성

### 물리/충돌
- 별도 물리 엔진 불필요
- AABB(Axis-Aligned Bounding Box) 기반 단순 충돌 판정
- 그리드 기반이므로 좌표 비교로 충분

### 애니메이션
- 플레이어 홉: position + 포물선 높이 변화 (Tween 또는 수동 lerp)
- 차량: 일정 속도 x축 이동, 화면 밖 나가면 반대쪽에서 재등장
- 통나무: 차량과 유사한 수평 이동
- 독수리: 위에서 아래로 내려오는 swoop 애니메이션

### 조작 매핑
| 모바일 | 키보드 |
|--------|--------|
| 위 스와이프 | W / Arrow Up |
| 아래 스와이프 | S / Arrow Down |
| 왼쪽 스와이프 | A / Arrow Left |
| 오른쪽 스와이프 | D / Arrow Right |

### 성능 최적화
- Row 단위 오브젝트 풀링 / 재활용
- 화면 밖 오브젝트 비활성화
- InstancedMesh로 동일 오브젝트 대량 렌더링
- 그림자는 DirectionalLight 하나만 사용
- LOD 불필요 (복셀 스타일 자체가 로우폴리)

---

## 참고 소스

- [길건너 친구들 - 나무위키](https://namu.wiki/w/%EA%B8%B8%EA%B1%B4%EB%84%88%20%EC%B9%9C%EA%B5%AC%EB%93%A4)
- [길건너 친구들/캐릭터 - 나무위키](https://namu.wiki/w/%EA%B8%B8%EA%B1%B4%EB%84%88%20%EC%B9%9C%EA%B5%AC%EB%93%A4/%EC%BA%90%EB%A6%AD%ED%84%B0)
- [Crossy Road Wiki - Eagle](https://crossyroad.fandom.com/wiki/Eagle)
- [Crossy Road Wiki - Techniques](https://crossyroad.fandom.com/wiki/Crossy_Road/Techniques)
- [BlueStacks Beginner's Guide](https://www.bluestacks.com/blog/game-guides/crossy-road/cyr-beginners-guide-en.html)
- [Crossy Road Complete Wiki Guide](https://www.playcrossyroadgame.com/)
- [PocketGamer - Making of Crossy Road](https://www.pocketgamer.biz/feature/60837/making-of-crossy-road/)
- [Pocket Gamer - High Score Guide](https://www.pocketgamer.com/crossy-road/high-score-world-record/)
