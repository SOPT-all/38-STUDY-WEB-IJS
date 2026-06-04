# Week 5 - Sweet Orbit

React Three Fiber와 GSAP ScrollTrigger로 만든 3D 도넛 쇼케이스입니다.

## 실행

```bash
npm install
npm run dev
```

## 구현 포인트

- `@react-three/fiber`의 `Canvas`, `useFrame`, `torusGeometry`로 3D 도넛 구성
- `gsap/ScrollTrigger`로 스크롤 진행률에 맞춰 회전, 위치, 카메라, 색상 전환
- `@react-three/drei`의 `Float`로 은은한 부유 모션 추가
- 모바일/데스크톱 반응형 배치와 `prefers-reduced-motion` 대응

## 코드 구조

- `src/App.tsx`: 페이지 조립, 현재 맛 테마 적용
- `src/donut/useSweetOrbitScroll.ts`: GSAP ScrollTrigger 타임라인 연결
- `src/donut/motion.ts`: 스크롤 구간별 3D 상태값
- `src/donut/SweetOrbitScene.tsx`: R3F Canvas 생성
- `src/donut/OrbitScene.tsx`: 조명, 카메라, 도넛 조립
- `src/donut/Donut.tsx`: 도넛 geometry, 아이싱, 스프링클
- `src/donut/flavors.ts`: 맛별 문구와 색상 데이터
