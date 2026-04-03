import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import { SystemArchitecture } from "@/components/SystemArchitecture";
import Projects from "@/components/Projects";
import Brands from "@/components/Brands";
import SocialMedia from "@/components/SocialMedia";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const StickyProjectShowcase = lazy(() =>
  import("@/components/StickyProjectShowcase").then((m) => ({
    default: m.StickyProjectShowcase,
  })),
);

const belowFoldFallback = (
  <div
    className="min-h-[28vh] w-full rounded-3xl border border-white/[0.06] bg-white/[0.02]"
    aria-hidden
  />
);

const Index = () => {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Hero />
      <Skills />
      <SystemArchitecture />
      <Suspense fallback={belowFoldFallback}>
        <StickyProjectShowcase />
      </Suspense>
      <Projects />
      <Brands />
      <SocialMedia />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
