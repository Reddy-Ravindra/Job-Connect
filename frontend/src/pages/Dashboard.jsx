import JobForm from "../features/jobs/JobForm";
import MyJobs from "../features/jobs/MyJobs";
import { useAuth } from "../auth/useAuth";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Container,
} from "@mui/material";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.username}!
          </Typography>
          <Typography variant="subtitle1">Your role: {user?.role}</Typography>
        </CardContent>
      </Card>

      {user?.role === "poster" && (
        <>
          <Card sx={{ mb: 4, p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Post a New Job
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <JobForm />
            </CardContent>
          </Card>

          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                My Posted Jobs
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <MyJobs />
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
}
