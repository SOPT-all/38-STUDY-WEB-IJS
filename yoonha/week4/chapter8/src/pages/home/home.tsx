import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";

const Home = () => {
  return (
    <main className="lg:flex lg:h-screen">
      <div className="lg:w-1/3 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <HeroSection />
      </div>
      <div className="lg:w-2/3 lg:h-screen lg:overflow-y-auto lg:snap-y lg:snap-mandatory">
        <ProjectsSection />
      </div>
    </main>
  );
};

export default Home;
