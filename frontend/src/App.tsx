import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentOverview from "./pages/dashboards/StudentOverview";
import ParentOverview from "./pages/dashboards/ParentOverview";
import TeacherOverview from "./pages/dashboards/TeacherOverview";
import AdminOverview from "./pages/dashboards/AdminOverview";
import AIAssistant from "./pages/dashboards/AIAssistant";
import AIChatbot from "./pages/dashboards/AIChatbot";
import Quiz from "./pages/dashboards/Quiz";
import Assignments from "./pages/dashboards/Assignments";
import { Performance, Alerts } from "./pages/dashboards/Shared";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard/student" element={<DashboardLayout role="student" />}>
            <Route index element={<StudentOverview />} />
            <Route path="performance" element={<Performance />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="ai" element={<AIAssistant />} />
            <Route path="study" element={<AIChatbot />} />
          </Route>

          <Route path="/dashboard/parent" element={<DashboardLayout role="parent" />}>
            <Route index element={<ParentOverview />} />
            <Route path="performance" element={<Performance />} />
            <Route path="alerts" element={<Alerts />} />
          </Route>

          <Route path="/dashboard/teacher" element={<DashboardLayout role="teacher" />}>
            <Route index element={<TeacherOverview />} />
            <Route path="students" element={<TeacherOverview />} />
            <Route path="assignments" element={<Assignments />} />
          </Route>

          <Route path="/dashboard/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<AdminOverview />} />
            <Route path="analytics" element={<AdminOverview />} />
          </Route>

          <Route path="/dashboard" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
