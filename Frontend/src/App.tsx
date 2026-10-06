import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import EngineersDay from "./pages/Events";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventPage from "./pages/EventPage";
import Gallery from "./pages/Gallery";
import AboutUs from "./pages/AboutUs";
import Sponsors from "./pages/Sponsors";
import Winners from "./pages/Winners";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";
import Register from "./components/Register"
import CodeCrafter from "./pages/CodeCrafter";
import AdminPortal from "./pages/AdminPortal";


const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Show loader until page + assets are fully loaded
  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    // When the page is already loaded (like fast navigation)
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // ✅ On route change: scroll to top + show loader briefly while switching
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    // Simulate small delay just for smooth transition
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Loading show={loading} />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<AboutUs onLoadComplete={() => setLoading(false)} />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/codecrafter" element={<CodeCrafter />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/events/engineersday" element={<EngineersDay/>} />
        <Route path="/admin" element={<AdminPortal />} />

      </Routes>
      {location.pathname !== '/codecrafter' && <Footer />}
    </>
  );
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
