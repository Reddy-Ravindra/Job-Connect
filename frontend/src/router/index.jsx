// router/index.js
import PostJobPage from "../features/jobs/PostJobPage";
import RequireAuth from "../auth/RequireAuth";
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../pages/Dashboard";

const routes = [
  {
    path: "/jobs/create",
    element: (
      <RequireAuth allowedRole="poster">
        <PostJobPage />
      </RequireAuth>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  // ...other routes
];

export default routes;
