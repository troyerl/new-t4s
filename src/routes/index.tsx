import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { routes } from "./paths.ts";

const Home = lazy(() => import("../pages/home/index.tsx"));
const PublicLayout = lazy(() => import("../pages/publicRoutes/index.tsx"));
const InventoryPage = lazy(
  () => import("../pages/publicRoutes/Inventory/index.tsx"),
);
const ReservationPage = lazy(
  () => import("../pages/publicRoutes/Reservation/index.tsx"),
);

const ContactPage = lazy(
  () => import("../pages/publicRoutes/Contact/index.tsx"),
);

const FAQPage = lazy(() => import("../pages/publicRoutes/FAQ/index.tsx"));
const LoginPage = lazy(() => import("../pages/Login/index.tsx"));

export default createBrowserRouter([
  {
    path: routes.unauth.base.path,
    element: <Home />,
  },
  {
    path: routes.unauth.base.path,
    Component: PublicLayout,
    children: [
      { path: routes.unauth.inventory.path, Component: InventoryPage },
      { path: routes.unauth.reservation.path, Component: ReservationPage },
      { path: routes.unauth.contactUs.path, Component: ContactPage },
      { path: routes.unauth.faqs.path, Component: FAQPage },
    ],
  },
  {
    path: routes.unauth.login.path,
    Component: LoginPage,
  },
]);
