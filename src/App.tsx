import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import HireDeveloper from "./pages/HireDeveloper";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Pricing from "./pages/Pricing";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlog from "./pages/AdminBlog";
import AdminPricing from "./pages/AdminPricing";
import AdminQueries from "./pages/AdminQueries";
import AdminLinks from "./pages/AdminLinks";
import AdminContent from "./pages/AdminContent";
import AdminSecurity from "./pages/AdminSecurity";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/hire" element={<HireDeveloper />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />

            {/* Admin Routes */}
            <Route path="/admin/zaplogin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
            <Route path="/admin/pricing" element={<ProtectedRoute><AdminPricing /></ProtectedRoute>} />
            <Route path="/admin/queries" element={<ProtectedRoute><AdminQueries /></ProtectedRoute>} />
            <Route path="/admin/links" element={<ProtectedRoute><AdminLinks /></ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute><AdminContent /></ProtectedRoute>} />
            <Route path="/admin/security" element={<ProtectedRoute><AdminSecurity /></ProtectedRoute>} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
