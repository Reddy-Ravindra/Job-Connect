import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../auth/useAuth";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

export default function InterestedUsers({ jobId }) {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/jobs/${jobId}/interest`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, [jobId]);

  if (!users.length) return <Typography>No interests yet...</Typography>;

  return (
    <List>
      {users.map((u, index) => (
        <ListItem key={index}>
          <ListItemText primary={u.username} secondary={u.email} />
        </ListItem>
      ))}
    </List>
  );
}
