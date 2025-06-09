import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 500,
          }}
        >
          Job Connect
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user && (
            <Typography variant="body1" sx={{ mx: 2, fontWeight: 300 }}>
              Welcome, <strong>{user.username}</strong>
            </Typography>
          )}

          {user ? (
            <>
              <Button
                color="inherit"
                sx={{ mx: 0.5 }}
                component={Link}
                to="/dashboard"
              >
                Dashboard
              </Button>
              <Button color="inherit" sx={{ mx: 0.5 }} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                sx={{ mx: 0.5 }}
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{ mx: 0.5 }}
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
