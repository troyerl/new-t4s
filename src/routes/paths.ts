export interface AppRoute {
  path: string;
  label: string;
  mobileOnly?: boolean;
  hiddenDisplay?: boolean;
}

export const routes = {
  unauth: {
    base: { path: "/", label: "navbar:public.home" },
    inventory: { path: "/inventory", label: "navbar:public.inventory" },
    shop: { path: "/shop", label: "navbar:public.shop", mobileOnly: true },
    reservation: { path: "/reservation", label: "navbar:public.reservation" },
    contactUs: { path: "/contact-us", label: "navbar:public.contact" },
    faqs: { path: "/faqs", label: "navbar:public.faq" },
    login: { path: "/login", label: "navbar:public.login" },
    shoppingSuccess: {
      path: "/shopping-success",
      label: "navbar:public.shoppingSuccess",
      hiddenDisplay: true,
    },
    reserve: {
      path: "/reserve",
      label: "navbar:public.reserve",
      hiddenDisplay: true,
    },
  },
  auth: {
    base: { path: "/admin", label: "navbar:admin.dashboard" },
    inventory: { path: "/admin/inventory", label: "navbar:admin.inventory" },
    calendar: { path: "/admin/calendar", label: "navbar:admin.calendar" },
    settings: { path: "/admin/settings", label: "navbar:admin.settings" },
    shoppers: { path: "/admin/shoppers", label: "navbar:admin.shoppers" },
    transactions: {
      path: "/admin/transactions",
      label: "navbar:admin.transactions",
    },
    transaction: {
      path: "/admin/transaction",
      label: "navbar:admin.transaction",
    },
    reservations: {
      path: "/admin/reservations",
      label: "navbar:admin.reservations",
    },
  },
} satisfies {
  unauth: Record<string, AppRoute>;
  auth: Record<string, AppRoute>;
};

export const unauthNavbarRoutes: AppRoute[] = Object.values(
  routes.unauth,
).filter(
  (route) =>
    route.path !== routes.unauth.login.path &&
    !("hiddenDisplay" in route && route.hiddenDisplay),
);
