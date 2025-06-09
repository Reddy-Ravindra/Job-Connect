// router/index.js
import PostJobPage from "../features/jobs/PostJobPage";
import RequireAuth from "../auth/RequireAuth";

const routes = [
  {
    path: "/jobs/create",
    element: (
      <RequireAuth allowedRole="poster">
        <PostJobPage />
      </RequireAuth>
    ),
  },
  // ...other routes
];

export default routes;
