import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AppShowcase from "@/components/AppShowcase";
import LiveSites from "@/components/LiveSites";
import Testimonials from "@/components/Testimonials";
import Experience from "@/components/Experience";
import Brands from "@/components/Brands";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const FeaturedProjects = lazy(() =>
  import("@/components/FeaturedProjects").then((m) => ({
    default: m.FeaturedProjects,
  })),
);

const belowFoldFallback = <div className="min-h-[60vh] w-full bg-surface" aria-hidden />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <Hero />
      <Suspense fallback={belowFoldFallback}>
        <FeaturedProjects />
      </Suspense>
      <AppShowcase />
      <LiveSites />
      <Testimonials />
      <Services />
      <Experience />
      <Brands />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
