import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function EditJobForm() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setValue("summary", res.data.summary);
        setValue("body", res.data.body);
      } catch {
        setError("Unable to load job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, setValue, token]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch {
      setError("Failed to update job.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Edit Job
          </Typography>

          {loading && <CircularProgress />}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!loading && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Job Summary"
                variant="outlined"
                margin="normal"
                {...register("summary", { required: "Summary is required" })}
                error={!!errors.summary}
                helperText={errors.summary?.message}
              />

              <TextField
                fullWidth
                label="Job Description"
                variant="outlined"
                multiline
                rows={6}
                margin="normal"
                {...register("body", { required: "Description is required" })}
                error={!!errors.body}
                helperText={errors.body?.message}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
              >
                Update Job
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
