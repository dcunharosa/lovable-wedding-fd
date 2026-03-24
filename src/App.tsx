import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n";
import SinglePage from "./pages/SinglePage";
import Weekend from "./pages/Weekend";
import Venue from "./pages/Venue";
import Travel from "./pages/Travel";
import Stay from "./pages/Stay";
import Gifts from "./pages/Gifts";
import Faq from "./pages/Faq";
import Rsvp from "./pages/Rsvp";
import NotFound from "./pages/NotFound";

const App = () => (
  <LanguageProvider>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SinglePage />} />
          <Route path="/weekend" element={<Weekend />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/stay" element={<Stay />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/rsvp" element={<Rsvp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </LanguageProvider>
);

export default App;
