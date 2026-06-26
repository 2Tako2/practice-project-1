import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("layouts/sidebar.tsx", [
    route("about", "routes/about.tsx"),
    route("setting", "routes/setting.tsx"),
  ]),
] satisfies RouteConfig;
