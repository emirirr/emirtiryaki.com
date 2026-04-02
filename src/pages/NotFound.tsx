import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, LayoutGrid } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404: Var olmayan rota:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-20 font-sans antialiased">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.2),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(224_28%_4%)]" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          className="glass-strong mb-8 rounded-[2rem] border border-white/10 px-10 py-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Hata
          </p>
          <h1 className="mt-3 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-7xl font-semibold tabular-nums tracking-tight text-transparent md:text-8xl">
            404
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Bu sayfa yok veya taşınmış olabilir.
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground/80">
            {location.pathname}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-2xl hero-gradient px-8 shadow-lg shadow-primary/20"
            data-cursor="pointer"
          >
            <Link to="/" className="inline-flex items-center gap-2">
              <Home className="h-5 w-5" />
              Ana sayfa
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-2xl border-white/15 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.07]"
            data-cursor="pointer"
          >
            <Link to="/projects" className="inline-flex items-center gap-2">
              <LayoutGrid className="h-5 w-5" />
              Projeler
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
