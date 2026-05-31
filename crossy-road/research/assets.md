# 사용 가능한 오픈소스 에셋 목록

## 복셀/로우폴리 3D 에셋

### 1. Kenney Voxel Pack (추천)
- **URL**: https://www.kenney.nl/assets/voxel-pack
- **라이선스**: CC0 (퍼블릭 도메인, 저작자 표시 불필요)
- **내용**: 190개 복셀 모델 - 캐릭터, 차량, 건물, 소품
- **포맷**: OBJ, VOX (Three.js에서 OBJ 로더로 사용 가능)
- **적합도**: 높음 - Crossy Road 스타일과 직접 호환. 차량/캐릭터/나무 등 바로 사용 가능

### 2. Kenney 3D 에셋 전체
- **URL**: https://kenney.nl/assets/category:3D
- **라이선스**: CC0
- **주요 팩**:
  - Nature Kit: 나무, 바위, 풀 등 자연 오브젝트
  - City Kit: 도시 건물, 도로 관련 에셋
  - Vehicle Kit: 다양한 차량 모델
  - Character Assets (Kay Lousberg 제작): https://www.kaylousberg.com/work/kenney-character-assets

### 3. PixVoxelAssets
- **URL**: https://github.com/tommyettinger/PixVoxelAssets
- **라이선스**: CC0
- **내용**: 3D 복셀 모델에서 생성된 게임용 무료 아트
- **적합도**: 중간 - 2D 스프라이트 위주이지만 원본 복셀 파일 포함

### 4. Enkisoftware Voxel Models
- **URL**: https://github.com/enkisoftware/voxel-models
- **라이선스**: CC BY 4.0 (저작자 표시 필요)
- **내용**: Avoyd Voxel Editor용 무료 복셀 모델
- **포맷**: VOX (MagicaVoxel 호환)

### 5. Open Source 3D Assets
- **URL**: https://github.com/ToxSam/open-source-3D-assets
- **웹사이트**: https://opensource3dassets.com
- **라이선스**: CC0
- **내용**: 991개 이상의 GLB 모델 (메타버스 프로젝트 기반)
- **포맷**: GLB (Three.js GLTFLoader로 바로 로딩 가능)

---

## itch.io 에셋

### 6. itch.io CC0 복셀 에셋
- **검색 URL**: https://itch.io/game-assets/free/tag-asset_pack/tag-voxel
- **라이선스**: CC0 (필터로 선택 가능)
- **주요 팩**:
  - 복셀 캐릭터 팩 (20+ 캐릭터, OBJ/PLY/VOX/BLEND)
  - 복셀 차량 팩
  - 환경 에셋 (묘지, 숲, 겨울 등)
  - 동물/식물 복셀 아트
- **전체 CC0 목록**: https://itch.io/game-assets/assets-cc0

### 7. itch.io 3D CC0 에셋
- **URL**: https://itch.io/game-assets/free/tag-3d/tag-cc0
- **내용**: 무료 3D CC0 에셋 (복셀 외 로우폴리 포함)

---

## OpenGameArt

### 8. OpenGameArt Voxel Pack
- **URL**: https://opengameart.org/content/voxel-pack
- **내용**: 다양한 복셀 에셋 모음
- **라이선스**: 각 에셋별 상이 (CC0, CC BY 등)

---

## 큐레이션 목록

### 9. Awesome CC0
- **URL**: https://github.com/madjin/awesome-cc0
- **내용**: 인터넷 전역의 CC0 에셋 큐레이션 목록
- **범위**: 3D 모델, 텍스처, 사운드, 음악 등

---

## AI 생성 복셀 에셋

### 10. Meshy AI
- **URL**: https://www.meshy.ai/tags/voxel
- **라이선스**: CC0 (로열티 프리, 상업적 사용 가능)
- **내용**: AI로 생성된 복셀 3D 모델
- **적합도**: 커스텀 에셋이 필요할 때 활용

---

## 복셀 에디터 (직접 제작용)

### MagicaVoxel
- **URL**: https://ephtracy.github.io/
- **가격**: 무료
- **내보내기**: OBJ, PLY 등 (Three.js 호환)
- **용도**: 커스텀 캐릭터/차량/나무 등 직접 모델링

### Blockbench
- **URL**: https://www.blockbench.net/
- **가격**: 무료, 오픈소스
- **내보내기**: OBJ, glTF/GLB (Three.js 직접 호환)
- **용도**: 복셀 + 로우폴리 모델링, 애니메이션 지원

---

## Three.js에서 에셋 로딩 방법

| 포맷 | Three.js 로더 | 비고 |
|------|--------------|------|
| GLB/GLTF | GLTFLoader | 가장 권장. 지오메트리+머티리얼+애니메이션 포함 |
| OBJ | OBJLoader + MTLLoader | 널리 지원, 머티리얼 별도 |
| VOX | VOXLoader (커뮤니티) | MagicaVoxel 네이티브 포맷 |
| FBX | FBXLoader | 애니메이션 포함 가능 |

### 권장 워크플로우
1. Kenney Voxel Pack에서 기본 에셋 확보 (CC0)
2. 부족한 에셋은 MagicaVoxel/Blockbench로 직접 제작
3. GLB/GLTF 포맷으로 통일하여 Three.js에서 로딩
4. 또는 Three.js BoxGeometry로 프로시저럴하게 복셀 오브젝트 직접 구성 (튜토리얼 방식)

---

## 참고 소스

- [Kenney Voxel Pack](https://www.kenney.nl/assets/voxel-pack)
- [itch.io CC0 에셋](https://itch.io/game-assets/assets-cc0)
- [PixVoxelAssets GitHub](https://github.com/tommyettinger/PixVoxelAssets)
- [Enkisoftware Voxel Models](https://github.com/enkisoftware/voxel-models)
- [Open Source 3D Assets](https://github.com/ToxSam/open-source-3D-assets)
- [Awesome CC0](https://github.com/madjin/awesome-cc0)
- [Meshy AI Voxel](https://www.meshy.ai/tags/voxel)
- [Rosebud - Import 3D Assets into Voxel Game](https://lab.rosebud.ai/blog/import-3d-assets-voxel-world-rosebud)
