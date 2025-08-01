import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Brands from "@/components/Brands";
import SocialMedia from "@/components/SocialMedia";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
          <Hero />
    <Skills />
    <Projects />
    <Brands />
    <SocialMedia />
    <Contact />
    <Footer />
    </div>
  );
};

export default Index;
