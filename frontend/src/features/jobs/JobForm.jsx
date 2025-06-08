import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../auth/useAuth";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useState } from "react";

export default function JobForm() {
  const { token, user } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5198/api/jobs", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Job posted successfully.");
      reset();
      setError(null);
    } catch (err) {
      setError("Something went wrong. Make sure you are a poster.");
      setSuccess(null);
    }
  };

  if (user?.role !== "poster") {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        Only posters can create jobs.
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Post a New Job
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Job Summary"
          margin="normal"
          {...register("summary", { required: "Summary is required" })}
          error={!!errors.summary}
          helperText={errors.summary?.message}
        />

        <TextField
          fullWidth
          label="Job Description"
          multiline
          rows={4}
          margin="normal"
          {...register("body", { required: "Description is required" })}
          error={!!errors.body}
          helperText={errors.body?.message}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
