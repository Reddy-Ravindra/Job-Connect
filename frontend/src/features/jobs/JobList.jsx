import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Box,
  Pagination,
  Card,
  CardContent,
} from "@mui/material";
import JobCard from "../../components/JobCard";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/paged`, {
          params: { page, pageSize },
        });
      
        console.log("Response:", res.data);
      
        setJobs(res.data.items ?? []); 
        setTotalPages(res.data.totalPages ?? 1); 
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };
  
    fetchJobs();
  }, [page]);


  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Latest Job Postings
      </Typography>

      {jobs.length === 0 ? (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No jobs available right now.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}
