
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MasterAuth from "./pages/MasterAuth";
import MasterLayout from "./pages/MasterLayout";
import PublicBooking from "./pages/PublicBooking";
import ServicePreview from "./pages/ServicePreview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/master" element={<MasterAuth />} />
          <Route path="/master/dashboard" element={<MasterLayout />} />
          <Route path="/service/:masterId/:serviceId" element={<ServicePreview />} />
          <Route path="/book/:masterId/:serviceId" element={<PublicBooking />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;