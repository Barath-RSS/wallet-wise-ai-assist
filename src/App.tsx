
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import Landing from "@/pages/Landing";
import Onboarding from "@/pages/Onboarding";
import Dashboard from "@/pages/Dashboard";
import ReceiptScanner from "@/pages/ReceiptScanner";
import Analytics from "@/pages/Analytics";
import AIAssistant from "@/pages/AIAssistant";
import WalletPasses from "@/pages/WalletPasses";
import Settings from "@/pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen w-full">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route 
                path="/dashboard" 
                element={
                  <>
                    <Navigation />
                    <Dashboard />
                  </>
                } 
              />
              <Route 
                path="/receipt-scanner" 
                element={
                  <>
                    <Navigation />
                    <ReceiptScanner />
                  </>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <>
                    <Navigation />
                    <Analytics />
                  </>
                } 
              />
              <Route 
                path="/ai-assistant" 
                element={
                  <>
                    <Navigation />
                    <AIAssistant />
                  </>
                } 
              />
              <Route 
                path="/wallet" 
                element={
                  <>
                    <Navigation />
                    <WalletPasses />
                  </>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <>
                    <Navigation />
                    <Settings />
                  </>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
