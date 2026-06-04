import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { Section } from './components/Section';
import { Content } from './components/Content';
import { useIsMobile } from './hooks/useIsMobile';
import { useSectionFade } from './hooks/useSectionFade';
import './App.css';

export default function App() {
  const isMobile = useIsMobile();

  useSectionFade();

  const handleBooking = () => {
    alert('예약이 접수되었어요! 즐거운 여행 되세요 ✈️');
  };

  return (
    <>
      <Canvas shadows style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Scene isMobile={isMobile} />
      </Canvas>

      <main id="wrap">
        <Section align="left">
          <div className="content hero fade-target">
            <span className="content__eyebrow">since 2025</span>
            <h1 className="hero__title">AirPlane</h1>
            <p className="hero__desc">구름 위에서 시작되는 가장 가벼운 여행</p>
          </div>
        </Section>

        <Section align="right" tint="rgba(29, 53, 87, 0.12)">
          <Content
            eyebrow="comfort"
            title="조용하고 편안한 비행"
            description="넓은 좌석과 부드러운 이착륙으로 도착하는 순간까지 편안하게 모십니다."
          />
        </Section>

        <Section align="left" tint="rgba(38, 70, 83, 0.16)">
          <Content
            eyebrow="destinations"
            title="전 세계 60개 도시"
            description="가까운 아시아부터 먼 유럽까지, 원하는 도시로 곧장 연결됩니다."
          />
        </Section>

        <Section align="center" tint="rgba(230, 57, 70, 0.18)">
          <Content
            eyebrow="booking"
            title="지금 예약하기"
            description="특가 항공권으로 다음 여행을 더 가볍게 시작해 보세요."
            buttonText="항공권 예약"
            onButtonClick={handleBooking}
          />
        </Section>
      </main>
    </>
  );
}
