import { useAuth } from "../auth/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  CardActionArea,
  CardActions,
  Chip,
  Stack,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export default function JobCard({ job }) {
  const { user, token, loading } = useAuth();
  const [interested, setInterested] = useState(false);
  const isViewer = user?.role === "viewer";

  useEffect(() => {
    if (!token || loading) return;
    const checkInterest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/jobs/${job.id}/interest/status`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInterested(res.data.interested);
      } catch (err) {
        console.error("Error checking interest status", err);
      }
    };
    if (isViewer) checkInterest();
  }, [job.id, token, user, loading]);

  const toggleInterest = async () => {
    try {
      if (!interested) {
        await axios.post(
          `http://localhost:5000/api/jobs/${job.id}/interest`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInterested(true);
      } else {
        await axios.delete(
          `http://localhost:5000/api/jobs/${job.id}/interest`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInterested(false);
      }
    } catch (err) {
      console.error("Error toggling interest", err);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              sx={{
                overflowWrap: "break-word",
                pr: 1,
              }}
            >
              {job.summary}
            </Typography>

            {job.salary && (
              <Chip
                label={`$${job.salary}`}
                color="secondary"
                size="small"
                sx={{
                  fontWeight: 600,
                  minWidth: "60px",
                }}
              />
            )}
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "60px",
            }}
          >
            {job.body}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1, flexWrap: "wrap", gap: 1 }}
          >
            {job.skills?.split(",").map((skill, index) => (
              <Chip
                key={index}
                label={skill.trim()}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>

      <CardActions
        sx={{
          p: 2,
          pt: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Posted by <strong>{job.posterUsername}</strong> •{" "}
          {new Date(job.postedDate).toLocaleDateString()}
        </Typography>

        {isViewer && (
          <Tooltip
            title={interested ? "Remove Interest" : "Mark as Interested"}
          >
            <IconButton
              onClick={toggleInterest}
              size="small"
              sx={{
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              {interested ? (
                <Favorite color="error" fontSize="small" />
              ) : (
                <FavoriteBorder fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}
