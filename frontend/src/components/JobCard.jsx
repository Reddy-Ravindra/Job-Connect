import { useAuth } from "../auth/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export default function JobCard({ job }) {
  const { user, token, loading } = useAuth();
  const [interested, setInterested] = useState(false);

  const isViewer = user?.role === "viewer";

  useEffect(() => {
    const checkInterest = async () => {
      if (!token || loading) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/jobs/${job.id}/interest/status`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInterested(res.data.interested);
      } catch (err) {
        console.error("Error checking interest status", err);
      }
    };

    if (isViewer) {
      checkInterest();
    }
  }, [job.id, token, loading, isViewer]);

  const toggleInterest = async () => {
    try {
      if (!interested) {
        await axios.post(
          `http://localhost:5000/api/jobs/${job.id}/interest`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInterested(true);
      } else {
        await axios.delete(
          `http://localhost:5000/api/jobs/${job.id}/interest`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInterested(false);
      }
    } catch (err) {
      console.error("Error toggling interest", err);
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
          {job.summary}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, maxHeight: 90, overflow: "hidden" }}
        >
          {job.body}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block" }}
        >
          Posted by <strong>{job.posterUsername}</strong> on{" "}
          {new Date(job.postedDate).toLocaleDateString()}
        </Typography>
      </CardContent>

      {isViewer && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Tooltip
            title={interested ? "Remove Interest" : "Mark as Interested"}
          >
            <IconButton onClick={toggleInterest}>
              {interested ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Card>
  );
}
