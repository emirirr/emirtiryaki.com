import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import { SystemArchitecture } from "@/components/SystemArchitecture";
import { GitHubLive } from "@/components/GitHubLive";
import { StickyProjectShowcase } from "@/components/StickyProjectShowcase";
import Projects from "@/components/Projects";
import Brands from "@/components/Brands";
import SocialMedia from "@/components/SocialMedia";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Hero />
      <Skills />
      <SystemArchitecture />
      <GitHubLive />
      <StickyProjectShowcase />
      <Projects />
      <Brands />
      <SocialMedia />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
