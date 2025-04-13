
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CycleProvider } from "@/context/CycleContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CyclePredictor from "./pages/CyclePredictor";
import SkinScanner from "./pages/SkinScanner";
import GlowBot from "./pages/GlowBot";
import BeautyRecommender from "./pages/BeautyRecommender";
import EducationHub from "./pages/EducationHub";
import Community from "./pages/Community";
import AboutClove from "./pages/AboutClove";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CycleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cycle-predictor" element={<CyclePredictor />} />
              <Route path="/skin-scanner" element={<SkinScanner />} />
              <Route path="/glowbot" element={<GlowBot />} />
              <Route path="/beauty-recommender" element={<BeautyRecommender />} />
              <Route path="/education-hub" element={<EducationHub />} />
              <Route path="/community" element={<Community />} />
              <Route path="/about" element={<AboutClove />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CycleProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
