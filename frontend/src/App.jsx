import AppNavbar from "./components/AppNavbar";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import EditJobForm from "./features/jobs/EditJobForm";
import JobList from "./features/jobs/JobList";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/edit/:id"
          element={
            <ProtectedRoute>
              <EditJobForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
