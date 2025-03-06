
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AppLayout from "./components/AppLayout";
import Quran from "./pages/Quran";
import Articles from "./pages/Articles";
import PrayerTimes from "./components/PrayerTimes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<AppLayout />}>
              <Route path="/prayer-times" element={<PrayerTimes standalone />} />
              <Route path="/quran" element={<Quran />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/news" element={<div className="py-10 px-6 container mx-auto">News & Events coming soon</div>} />
              <Route path="/executives" element={<div className="py-10 px-6 container mx-auto">Executives details coming soon</div>} />
              <Route path="/donate" element={<div className="py-10 px-6 container mx-auto">Donation platform coming soon</div>} />
              <Route path="/message-imam" element={<div className="py-10 px-6 container mx-auto">Message Imam feature coming soon</div>} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
