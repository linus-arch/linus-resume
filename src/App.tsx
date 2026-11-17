import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Music from "@/components/Music";
import TrendsPage from "./pages/TrendsPage";
import NotFound from "./pages/NotFound";
import ReleasesPage from "./pages/ReleasesPage";
import ReleasePage from "./pages/ReleasePage";
import TravelPage from "./pages/TravelPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        <div id="main-content">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/music" element={<><h1 className="sr-only">Music</h1><Music /></>} />
            <Route path="/releases" element={<ReleasesPage />} />
            <Route path="/releases/:slug" element={<ReleasePage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/trends" element={<TrendsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
