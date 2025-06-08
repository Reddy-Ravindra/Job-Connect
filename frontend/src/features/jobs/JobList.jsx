import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box, Typography } from "@mui/material";
import JobCard from "../../components/JobCard";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5198/api/jobs")
      .then((res) => setJobs(res.data))
      .catch(() => setJobs([]));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Browse Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
