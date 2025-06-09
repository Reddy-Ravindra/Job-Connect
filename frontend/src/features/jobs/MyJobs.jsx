import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";

export default function MyJobs() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to load jobs", err);
      setError("Failed to load your jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      alert("Could not delete job.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!jobs.length) return <Typography>No jobs found.</Typography>;

  return (
    <List>
      {jobs.map((job) => (
        <div key={job.id}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={job.summary}
              secondary={job.body}
              sx={{ maxWidth: "80%" }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                color="primary"
                title="Edit"
                component={Link}
                to={`/jobs/edit/${job.id}`}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                color="error"
                title="Delete"
                onClick={() => handleDelete(job.id)}
                sx={{ ml: 1 }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}
