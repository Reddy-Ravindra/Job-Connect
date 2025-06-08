import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Email may already be in use.");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            defaultValue=""
            {...register("role", { required: "Role is required" })}
            error={!!errors.role}
          >
            <MenuItem value="poster">Poster</MenuItem>
            <MenuItem value="viewer">Viewer</MenuItem>
          </Select>
          {errors.role && (
            <Typography color="error" fontSize={12}>
              {errors.role.message}
            </Typography>
          )}
        </FormControl>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
}
