import JobForm from "../features/jobs/JobForm";
import MyJobs from "../features/jobs/MyJobs";
import { useAuth } from "../auth/useAuth";
import { Box, Typography, Divider, Paper } from "@mui/material";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.username}!
        </Typography>
        <Typography variant="subtitle1">Your role: {user.role}</Typography>
      </Paper>

      {user.role === "poster" && (
        <>
          <Typography variant="h6" gutterBottom>
            Post a New Job
          </Typography>
          <JobForm />
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" gutterBottom>
            Your Posted Jobs
          </Typography>
          <MyJobs />
        </>
      )}

      {user.role === "viewer" && (
        <Typography>
          Thank you for signing up as a job viewer. Use the homepage to browse
          jobs.
        </Typography>
      )}
    </Box>
  );
}
