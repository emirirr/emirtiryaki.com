import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/home/Hero";
import { Heybe } from "@/components/site/home/Heybe";
import { Dacargo } from "@/components/site/home/Dacargo";
import {
  About,
  CarFamily,
  Contact,
  Faq,
  ImpactBand,
  LogoWall,
  Process,
  Sectors,
  Services,
  Stack,
  Testimonials,
  Work,
} from "@/components/site/home/Sections";
import { scrollToId } from "@/components/site/useSite";

/** Ana sayfa — / (Türkçe) ve /en (İngilizce) aynı bileşeni kullanır. */
const Index = () => {
  const { hash } = useLocation();

  // Başka sayfadan /#about gibi gelindiğinde bölüme in.
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const t = window.setTimeout(() => scrollToId(id, false), 60);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <SiteShell>
      <Hero />
      <ImpactBand />
      <LogoWall />
      <Services />
      <Work />
      <CarFamily />
      <Heybe />
      <Dacargo />
      <Sectors />
      <Process />
      <About />
      <Testimonials />
      <Stack />
      <Faq />
      <Contact />
    </SiteShell>
  );
};

export default Index;
