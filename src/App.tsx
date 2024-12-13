import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './hooks/useAuth';
import { AdminLayout } from './layouts/AdminLayout';
import { AnnotatorLayout } from './layouts/AnnotatorLayout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ProjectList } from './pages/admin/ProjectList';
import { ProjectBuilder } from './pages/admin/ProjectBuilder';
import { AnnotatorList } from './pages/admin/AnnotatorList';
import { TaskList } from './pages/annotator/TaskList';
import { TaskView } from './pages/annotator/TaskView';

const queryClient = new QueryClient();

function PrivateRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { user, token } = useAuth();
  
  if (!token || !user) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<ProjectList />} />
            <Route path="projects/:projectId" element={<ProjectBuilder />} />
            <Route path="annotators" element={<AnnotatorList />} />
          </Route>
          
          {/* Annotator Routes */}
          <Route
            path="/annotator"
            element={
              <PrivateRoute requiredRole="annotator">
                <AnnotatorLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<TaskList />} />
            <Route path="tasks/:taskId" element={<TaskView />} />
          </Route>
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;