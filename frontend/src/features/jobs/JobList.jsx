import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, Pagination } from "@mui/material";
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
        setJobs(res.data.items);
        setTotalPages(res.data.totalPages);
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {jobs.map((job) => (
              <Box
                key={job.id}
                sx={{
                  width: {
                    xs: "100%", // full width on small screens
                    sm: "47%", // two per row on small-medium
                    md: "30%", // three per row on desktop+
                  },
                  minHeight: "230px",
                }}
              >
                <JobCard job={job} />
              </Box>
            ))}
          </Box>

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
