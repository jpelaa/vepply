import React, { lazy } from "react";

const HomeLayout = lazy(() => import("../pages/Home"));
const LogIn = lazy(() => import("../pages/Login"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

export default [
  {
    id: 1,
    name: "login",
    path: "/login",
    component: LogIn,
    exact: true,
    authentication: false,
  },
  {
    id: 2,
    name: "home",
    path: "/:page",
    component: HomeLayout,
    exact: false,
    authentication: true,
  },
  {
    id: 3,
    name: "default",
    path: ["/", "/index.html"],
    default: true,
  },
  {
    id: 4,
    name: "notfound",
    path: "*",
    component: PageNotFound,
    authentication: false,
  },
];
