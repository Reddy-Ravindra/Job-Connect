import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useEffect, useState } from "react";

export default function EditJobForm() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch job details
  useEffect(() => {
    axios
      .get(`http://localhost:5198/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setValue("summary", res.data.summary);
        setValue("body", res.data.body);
      })
      .catch(() => setError("Unable to load job"));
  }, [id, setValue, token]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5198/api/jobs/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Update failed.");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Job
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

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
          Update Job
        </Button>
      </form>
    </Box>
  );
}
