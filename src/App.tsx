import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { CustomCursor } from "@/components/CustomCursor";
import { TerminalMode } from "@/components/TerminalMode";
import { CanonicalLink } from "@/components/CanonicalLink";
import Index from "./pages/Index";

const ProjectsPage = lazy(() => import("./pages/Projects"));
const KortbulProjectPage = lazy(() => import("./pages/KortbulProjectPage"));
const DacarMobileProjectPage = lazy(() => import("./pages/DacarMobileProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routeFallback = (
  <div className="flex min-h-[50vh] items-center justify-center bg-background text-sm text-muted-foreground">
    Yükleniyor…
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

const skipLinkClass =
  "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[20001] focus:m-0 focus:inline-block focus:rounded-xl focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background";

const App = () => (
  <MotionConfig reducedMotion="user">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CustomCursor />
        <TerminalMode />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CanonicalLink />
          <a href="#main-content" className={skipLinkClass}>
            Ana içeriğe geç
          </a>
          <main id="main-content" tabIndex={-1} className="outline-none">
            <Suspense fallback={routeFallback}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route
                  path="/projects/kortbul/:slug"
                  element={<KortbulProjectPage />}
                />
                <Route
                  path="/projects/dacar/mobile"
                  element={<DacarMobileProjectPage />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </MotionConfig>
);

export default App;
