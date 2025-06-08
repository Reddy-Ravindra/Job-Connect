import { Card, CardContent, Typography } from "@mui/material";

export default function JobCard({ job }) {
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
      </CardContent>
    </Card>
  );
}
