import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import JobList from "./features/jobs/JobList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
