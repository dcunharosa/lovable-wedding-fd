import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinglePage from "./pages/SinglePage";
import Weekend from "./pages/Weekend";
import Venue from "./pages/Venue";
import Travel from "./pages/Travel";
import Stay from "./pages/Stay";
import Faq from "./pages/Faq";
import Rsvp from "./pages/Rsvp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SinglePage />} />
          <Route path="/weekend" element={<Weekend />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/stay" element={<Stay />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/rsvp" element={<Rsvp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
