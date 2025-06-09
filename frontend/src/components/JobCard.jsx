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
  const { user, token, loading } = useAuth();
  console.log("User:", user);
  console.log("Token:", token);
  const [interested, setInterested] = useState(false);

  const isViewer = user?.role === "viewer";

  // useEffect(() => {
  //   const checkInterest = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:5000/api/jobs/${job.id}/interest/status`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //       setInterested(res.data.interested);
  //     } catch (err) {
  //       console.error("Error checking interest status", err);
  //     }
  //   };

  //   if (isViewer) {
  //     checkInterest();
  //   }
  // }, [job.id, token, isViewer]);

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

    if (user?.role === "viewer") {
      checkInterest();
    }
  }, [job.id, token, user, loading]);

  const toggleInterest = async () => {
    try {
      if (!interested) {
        console.log("token: ", token);
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
          <Tooltip
            title={interested ? "Remove Interest" : "Mark as Interested"}
          >
            <IconButton onClick={toggleInterest}>
              {interested ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
        )}
      </CardContent>
    </Card>
  );
}
