import { Canvas } from "@react-three/fiber";

import "./App.css";
import { Scene } from "./components/scene";
import { Section } from "./components/section";
import { Content } from "./components/content";

export default function App() {
  return (
    <>
      <Canvas
        shadows
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Scene />
      </Canvas>

      <div id="wrap">
        {/* 첫 번째 섹션 */}
        <Section bgColor="rgba(10, 30, 60, 0.15)">
          <div className="content main_content">
            <h1 className="title">일대기</h1>
            <p className="description">1학년</p>
          </div>
        </Section>

        {/* 두 번째 섹션 */}
        <Section bgColor="rgba(20, 50, 100, 0.15)">
          <Content title="2학년" description="와와" />
        </Section>

        {/* 세 번째 섹션 */}
        <Section bgColor="rgba(30, 60, 120, 0.15)">
          <Content title="3학년" description="3학" />
        </Section>

        {/* 네 번째 섹션 */}
        <Section bgColor="rgba(15, 40, 80, 0.2)">
          <Content title="4학년" description="우하하" />
        </Section>
      </div>
    </>
  );
}
