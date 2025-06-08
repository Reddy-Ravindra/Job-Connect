import JobForm from "../features/jobs/JobForm";
import MyJobs from "../features/jobs/MyJobs";
import { useAuth } from "../auth/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Welcome, {user?.username}!</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Your role: {user?.role}
      </Typography>

      {user?.role === "poster" && <JobForm />}
      {user?.role === "poster" && <MyJobs />}
    </Box>
  );
}
