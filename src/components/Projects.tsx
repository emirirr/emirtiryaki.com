import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

/** Ana sayfada sticky vitrin sonrası kısa CTA — tam liste `/projects` sayfasında. */
const Projects = () => {
  const navigate = useNavigate();

  return (
    <section className="relative px-4 pb-24 pt-4 sm:px-6">
      <motion.div
        className="glass-strong container mx-auto max-w-3xl rounded-3xl border border-white/10 px-8 py-12 text-center sm:px-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          variants={fadeUp}
          className="text-sm text-muted-foreground"
        >
          Tüm projeler, filtreler ve detaylar için portföy sayfasına geçin.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            variant="outline"
            className="min-w-[200px] rounded-2xl border-white/15 bg-white/[0.03] px-8 backdrop-blur-md hover:bg-white/[0.07]"
            data-cursor="pointer"
            onClick={() => window.open("https://github.com/emirirr", "_blank", "noopener,noreferrer")}
          >
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </Button>
          <Button
            size="lg"
            className="min-w-[200px] rounded-2xl px-8 hero-gradient shadow-lg shadow-primary/15"
            data-cursor="pointer"
            onClick={() => navigate("/projects")}
          >
            Tüm projeleri gör
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
