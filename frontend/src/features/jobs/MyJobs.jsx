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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAuth } from "../../auth/useAuth";

export default function MyJobs() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5198/api/jobs/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to load jobs");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5198/api/jobs/${id}`, {
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

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        My Posted Jobs
      </Typography>
      <List>
        {jobs.map((job) => (
          <div key={job.id}>
            <ListItem>
              <ListItemText primary={job.summary} secondary={job.body} />
              <ListItemSecondaryAction>
                <IconButton edge="end" color="primary" title="Edit">
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
    </Box>
  );
}
