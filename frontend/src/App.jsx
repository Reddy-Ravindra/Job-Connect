import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import JobList from "./features/jobs/JobList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
        <Route path="/" element={<JobList />} />
      </Routes>
    </Router>
  );
}

export default App;
