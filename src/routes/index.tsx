import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { routes } from "./paths.ts";

const Home = lazy(() => import("../pages/Home/index.tsx"));

export default createBrowserRouter([
  {
    path: routes.unauth.base.path,
    element: <Home />,
  },
  {
    path: routes.unauth.base.path,
    Component: lazy(() => import("../pages/publicRoutes/index.tsx")),
    children: [
      {
        path: routes.unauth.inventory.path,
        Component: lazy(
          () => import("../pages/publicRoutes/Inventory/index.tsx"),
        ),
      },
      {
        path: routes.unauth.reservation.path,
        Component: lazy(
          () => import("../pages/publicRoutes/Reservation/index.tsx"),
        ),
      },
      {
        path: `${routes.unauth.reserve.path}/:id`,
        Component: lazy(
          () => import("../pages/publicRoutes/Reserve/index.tsx"),
        ),
      },
      {
        path: routes.unauth.contactUs.path,
        Component: lazy(
          () => import("../pages/publicRoutes/Contact/index.tsx"),
        ),
      },
      {
        path: routes.unauth.faqs.path,
        Component: lazy(() => import("../pages/publicRoutes/FAQ/index.tsx")),
      },
    ],
  },
  {
    path: routes.unauth.login.path,
    Component: lazy(() => import("../pages/Login/index.tsx")),
  },
]);
