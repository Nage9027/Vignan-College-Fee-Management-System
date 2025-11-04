import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Login from "./pages/Login";
import MainLayout from "./components/layout/MainLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import StudentManagement from "./pages/admin/StudentManagement";
import AcademicManagement from "./pages/admin/AcademicManagement";
import FeeStructure from "./pages/admin/FeeStructure";
import FinancialReports from "./pages/admin/FinancialReports";
import AuditLogs from "./pages/admin/AuditLogs";

// Principal Pages
import PrincipalDashboard from "./pages/principal/PrincipalDashboard";

// Cashier Pages
import FeeCollection from "./pages/cashier/FeeCollection";
import DailySession from "./pages/cashier/DailySession";
import ReprintReceipt from "./pages/cashier/ReprintReceipt";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function DashboardRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin routes
  if (user.role === 'admin') {
    return (
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/students" element={<StudentManagement />} />
        <Route path="/academic" element={<AcademicManagement />} />
        <Route path="/fee-structure" element={<FeeStructure />} />
        <Route path="/reports" element={<FinancialReports />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Principal routes
  if (user.role === 'principal') {
    return (
      <Routes>
        <Route path="/" element={<PrincipalDashboard />} />
        <Route path="/view-students" element={<StudentManagement />} />
        <Route path="/view-reports" element={<FinancialReports />} />
        <Route path="/view-audit" element={<AuditLogs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Cashier routes
  if (user.role === 'cashier') {
    return (
      <Routes>
        <Route path="/" element={<FeeCollection />} />
        <Route path="/fee-collection" element={<FeeCollection />} />
        <Route path="/daily-session" element={<DailySession />} />
        <Route path="/reprint-receipt" element={<ReprintReceipt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return <Navigate to="/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<MainLayout />}>
              <Route path="*" element={<DashboardRouter />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
