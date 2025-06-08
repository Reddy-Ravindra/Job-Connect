import JobForm from "../features/jobs/JobForm";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Welcome, {user?.username}!</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Your role: {user?.role}
      </Typography>

      {user?.role === "poster" && <JobForm />}
    </Box>
  );
}
