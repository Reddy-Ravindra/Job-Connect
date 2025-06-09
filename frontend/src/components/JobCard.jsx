import { useAuth } from "../auth/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export default function JobCard({ job }) {
  const { user, token } = useAuth();
  const [interested, setInterested] = useState(false);

  const isViewer = user?.role === "viewer";

  useEffect(() => {
    const checkInterest = async () => {
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
  }, [job.id, token, isViewer]);

  const handleInterest = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/jobs/${job.id}/interest`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInterested(true);
    } catch (err) {
      alert("You’ve already shown interest or you're unauthorized.");
    }
  };

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">{job.summary}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {job.body}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 2 }}
        >
          Posted by {job.posterUsername} on{" "}
          {new Date(job.postedDate).toLocaleDateString()}
        </Typography>

        {isViewer && (
          <Tooltip title={interested ? "Interest Sent" : "I'm Interested"}>
            <IconButton onClick={handleInterest} disabled={interested}>
              {interested ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
        )}
      </CardContent>
    </Card>
  );
}
