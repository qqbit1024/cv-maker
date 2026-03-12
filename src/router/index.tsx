import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

const normalizedBasePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const basename = normalizedBasePath || "/";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
  ],
  {
    basename,
  }
);
