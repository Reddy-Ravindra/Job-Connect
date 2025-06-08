import { useAuth } from "../auth/useAuth";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Welcome, {user?.username}!</Typography>
      <Typography variant="subtitle1">Your role: {user?.role}</Typography>
    </Box>
  );
}
