
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
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
            <Navigation />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/receipt-scanner" element={<ReceiptScanner />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/wallet" element={<WalletPasses />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
