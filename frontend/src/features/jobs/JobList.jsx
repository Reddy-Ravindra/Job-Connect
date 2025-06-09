import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import JobCard from "../../components/JobCard";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Latest Job Postings
      </Typography>
      <Grid container spacing={3}>
        {jobs.length === 0 ? (
          <Typography variant="body1">No jobs available right now.</Typography>
        ) : (
          jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
