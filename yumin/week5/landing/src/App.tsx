import { useEffect } from "react";
import { setupAnimations } from "./hooks/useGsap";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Section } from "./components/Section";
import { Content } from "./components/Content";
import "./App.css";

export default function App() {
  const handleOrderClick = () => {
    alert("Thank you for your order!");
  };

  useEffect(() => {
    setupAnimations();
  }, []);

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
          backgroundColor: "#ff8c42",
        }}
      >
        <Scene />
      </Canvas>

      <div id="wrap">
        <Section bgColor="rgba(30, 60, 114, 0.15)">
          <div className="content main_content">
            <h1 className="title">Noel Donut</h1>
            <p className="description">A sweet moment melting in your mouth</p>
          </div>
        </Section>

        <Section bgColor="rgba(139, 69, 19, 0.15)">
          <Content
            title="Soft Sweetness"
            description="Experience a burst of rich flavor with every bite"
          />
        </Section>

        <Section bgColor="rgba(160, 82, 45, 0.15)">
          <Content
            title="Variety of Flavors"
            description="From classic to seasonal specials, a donut for every taste"
          />
        </Section>

        <Section bgColor="rgba(165, 42, 42, 0.2)">
          <Content
            title="Order Now"
            description="Taste the warm and fresh Noel Donuts today"
            buttonText="Place Order"
            onButtonClick={handleOrderClick}
          />
        </Section>
      </div>
    </>
  );
}
