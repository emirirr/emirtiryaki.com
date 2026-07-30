import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import { SystemArchitecture } from "@/components/SystemArchitecture";
import AppShowcase from "@/components/AppShowcase";
import Brands from "@/components/Brands";
import Services from "@/components/Services";
import SocialMedia from "@/components/SocialMedia";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const FeaturedProjects = lazy(() =>
  import("@/components/FeaturedProjects").then((m) => ({
    default: m.FeaturedProjects,
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
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <SystemArchitecture />
      <Suspense fallback={belowFoldFallback}>
        <FeaturedProjects />
      </Suspense>
      <AppShowcase />
      <Brands />
      <Services />
      <SocialMedia />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
