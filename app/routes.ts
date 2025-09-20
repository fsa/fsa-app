import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route('/login', 'routes/login.tsx'),
  route("/", "components/app-layout.tsx", [
    index("routes/home.tsx"),
    route('/scanner', 'routes/scanner.tsx'),
    route('/movie', 'routes/movie.tsx'),
  ]),
] satisfies RouteConfig;
