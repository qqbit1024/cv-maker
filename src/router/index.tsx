import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ControlPage from "../pages/ControlPage";
import HomePage from "../pages/HomePage";
import PreviewPage from "../pages/PreviewPage";
import VacancyPage from "../pages/VacancyPage";
import VersionsPage from "../pages/VersionsPage";

const normalizedBasePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const basename = normalizedBasePath || "/";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "versions",
          element: <VersionsPage />,
        },
        {
          path: "vacancy",
          element: <VacancyPage />,
        },
        {
          path: "preview",
          element: <PreviewPage />,
        },
        {
          path: "control",
          element: <ControlPage />,
        },
      ],
    },
  ],
  {
    basename,
  }
);
