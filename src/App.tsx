import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TrumpAccounts from "./pages/blog/TrumpAccounts";
import RmdInheritedIra from "./pages/blog/RmdInheritedIra";
import WildfireCasualtyLoss from "./pages/blog/WildfireCasualtyLoss";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog/trump-accounts" element={<TrumpAccounts />} />
          <Route path="/blog/rmd-inherited-ira" element={<RmdInheritedIra />} />
          <Route path="/blog/wildfire-casualty-loss" element={<WildfireCasualtyLoss />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
