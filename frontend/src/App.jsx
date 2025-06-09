import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";

import JobList from "./features/jobs/JobList";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Dashboard from "./pages/Dashboard";
import EditJobForm from "./features/jobs/EditJobForm";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <AppNavbar />

      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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

export default App;
