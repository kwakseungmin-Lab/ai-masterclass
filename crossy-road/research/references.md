# 튜토리얼 / 참고 코드 목록

## 튜토리얼

### 1. FreeCodeCamp - Crossy Road Clone with Three.js (최우선 추천)
- **글**: https://www.freecodecamp.org/news/how-to-code-a-crossy-road-game-clone-with-threejs/
- **영상**: https://www.youtube.com/watch?v=vNr3_hQ3Bws
- **저자**: Hunor Marton Borbely
- **내용**:
  - Vite + Three.js 프로젝트 설정
  - Scene, Camera(Orthographic), Lights 구성
  - BoxGeometry로 플레이어/차량/나무 복셀 스타일 렌더링
  - 차량 애니메이션 (일정 속도 수평 이동)
  - 키보드 이벤트 핸들러로 플레이어 이동
  - AABB 기반 충돌 판정 (Hit Detection)
  - 플레이어 홉 애니메이션
- **비고**: 가장 포괄적이고 최신 튜토리얼. 프로젝트 기반으로 삼기에 적합

### 2. JavaScriptGameTutorials.com - Crossy Road with Three.js (확장판)
- **URL**: https://javascriptgametutorials.com/tutorials/three-js/crossy-road
- **내용**: FreeCodeCamp 튜토리얼의 확장 버전
  - 그림자 추가
  - 트럭 레인 구현
  - **무한 Row 생성** (플레이어 전진 시 동적 레벨 생성)
  - 인터랙티브 데모 포함
- **비고**: 무한 지형 생성 부분이 핵심. 실제 게임 완성에 필수적인 내용 포함

### 3. FreeCodeCamp - Crossy Road Clone with React Three Fiber
- **URL**: https://www.freecodecamp.org/news/how-to-code-a-crossy-road-game-clone-with-react-three-fiber/
- **내용**: React + Three.js (R3F) 기반 구현
- **비고**: React 사용 시 참고. 순수 Three.js 대비 구조가 다름

### 4. Medium - Making a 3D Web Runner Game with Three.js
- **URL**: https://medium.com/geekculture/making-a-3d-web-runner-game-1-creating-a-basic-3d-scene-with-three-js-56b02635b5d2
- **내용**: 3D 웹 러너 게임 제작 시리즈
- **비고**: Crossy Road 특화는 아니지만 무한 러너 패턴 학습에 유용

### 5. DEV Community - Crossy Road with Three.js
- **URL**: https://dev.to/blancmonarch/crossroads-with-threejs-2m2b
- **내용**: Three.js로 Crossy Road 구현 과정 블로그 포스트

---

## 참고 코드 (GitHub)

### 6. HunorMarton/Crossy Road CodePen (추천)
- **URL**: https://codepen.io/HunorMarton/pen/JwWLJo
- **풀페이지**: https://codepen.io/HunorMarton/full/JwWLJo
- **GitHub Gist**: https://gist.github.com/iam-pankaj/5bc6206e7e791c4634d1fce988a2be64
- **특징**:
  - Orthographic Camera + 등각 뷰
  - 텍스처가 있는 간소화된 3D 오브젝트
  - 조명과 그림자
  - 랜덤 레벨 생성 기본 로직
- **비고**: 단일 파일로 핵심 구조를 빠르게 파악 가능. 프로토타이핑에 최적

### 7. EvanBacon/Expo-Crossy-Road
- **URL**: https://github.com/EvanBacon/Expo-Crossy-Road
- **기술**: Expo (React Native) + THREE.js + Tween
- **플랫폼**: iOS, Android, Web
- **특징**:
  - 가장 완성도 높은 오픈소스 클론
  - 크로스 플랫폼 (모바일 + 웹)
  - Tween 기반 애니메이션
- **비고**: React Native 기반이라 직접 사용은 어렵지만 게임 로직/구조 참고에 탁월

### 8. larnelle15/Crossy-road
- **URL**: https://github.com/larnelle15/Crossy-road
- **기술**: Three.js + Vanilla JavaScript + HTML + CSS
- **특징**: 순수 Three.js + JS로 구현된 클론
- **비고**: Vanilla JS 기반이라 우리 프로젝트와 가장 유사한 구조

### 9. ibrahim-sall/crossyroad
- **URL**: https://github.com/ibrahim-sall/crossyroad
- **플레이**: https://ibrahim-sall.github.io/crossyroad/
- **특징**: Frogger 영감, 도로 + 장애물 횡단 구현
- **비고**: 라이브 데모 있음, 실제 플레이하며 참고 가능

### 10. GeekBoySupreme/crossy-road
- **URL**: https://github.com/GeekBoySupreme/crossy-road
- **플레이**: https://crossy-road.glitch.me
- **특징**: 주말 프로젝트로 만든 간단한 Three.js 클론
- **비고**: 최소한의 구현으로 핵심 메카닉만 담고 있어 학습용으로 적합

### 11. GitHub Topic: crossy-road
- **URL**: https://github.com/topics/crossy-road
- **내용**: Crossy Road 관련 모든 GitHub 프로젝트 목록
- **비고**: 추가 참고 코드 탐색용

---

## Three.js 기술 참고

### 12. Orthographic Camera 등각 뷰 설정
- **GitHub Gist**: https://gist.github.com/nitaku/032c1724a0433ae0f85f
- **CodePen**: https://codepen.io/puritanner/pen/LbgMwo
- **Three.js Forum**: https://discourse.threejs.org/t/responsive-isometric-orthographic-camera/37894
- **비고**: Crossy Road 스타일의 카메라 설정 핵심

### 13. Three.js 무한 지형 생성
- **GitHub - Procedural Voxels**: https://github.com/mattkwilson/procedural-voxels-threejs
  - 무한 프로시저럴 복셀 지형 (simplex noise)
- **THREE.Terrain 라이브러리**: https://github.com/IceCreamYou/THREE.Terrain
  - Perlin/Simplex noise, Diamond-Square 등 다양한 알고리즘
- **YouTube - Infinite Terrain**: https://www.youtube.com/watch?v=bAkWjggXurE
  - Minecraft 스타일 무한 지형 JS + Three.js 구현

### 14. Three.js Forum - Crossy Road Showcase
- **URL (2019)**: https://discourse.threejs.org/t/crossy-road-clone/7177
- **URL (2025)**: https://discourse.threejs.org/t/crossy-road-threejs-game/85390
- **비고**: 커뮤니티의 다양한 Crossy Road 구현 사례와 피드백

---

## 구현 우선순위 추천

1. **CodePen 데모** (#6)로 핵심 구조 파악 (30분)
2. **FreeCodeCamp 튜토리얼** (#1)로 기본 게임 구현
3. **JavaScriptGameTutorials** (#2)로 무한 지형 + 트럭 레인 확장
4. **larnelle15 코드** (#8)로 Vanilla JS 구조 참고
5. **Kenney Voxel Pack**으로 에셋 교체하여 퀄리티 향상

---

## 참고 소스

- [FreeCodeCamp Three.js Tutorial](https://www.freecodecamp.org/news/how-to-code-a-crossy-road-game-clone-with-threejs/)
- [JavaScriptGameTutorials](https://javascriptgametutorials.com/tutorials/three-js/crossy-road)
- [CodePen Demo](https://codepen.io/HunorMarton/pen/JwWLJo)
- [Expo-Crossy-Road GitHub](https://github.com/EvanBacon/Expo-Crossy-Road)
- [larnelle15/Crossy-road GitHub](https://github.com/larnelle15/Crossy-road)
- [ibrahim-sall/crossyroad GitHub](https://github.com/ibrahim-sall/crossyroad)
- [GeekBoySupreme/crossy-road GitHub](https://github.com/GeekBoySupreme/crossy-road)
- [Three.js Forum Crossy Road](https://discourse.threejs.org/t/crossy-road-clone/7177)
- [PocketGamer - Making of Crossy Road](https://www.pocketgamer.biz/feature/60837/making-of-crossy-road/)
- [Frontend Masters Isometric Perspective](https://frontendmasters.com/courses/canvas-webgl/capabilities-of-three-js-isometric-perspective/)
