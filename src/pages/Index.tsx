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
  ImpactBand,
  LogoWall,
  Process,
  Sectors,
  Services,
  Stack,
  Work,
} from "@/components/site/home/Sections";
import { scrollToId } from "@/components/site/useSite";

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
      <Stack />
      <Contact />
    </SiteShell>
  );
};

export default Index;
