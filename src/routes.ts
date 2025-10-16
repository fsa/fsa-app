import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  route('/login', 'routes/login.tsx'),
  layout("layout/AppLayout.tsx", [
    index("routes/_index.tsx"),
    route('/movie', 'routes/movie.tsx'),
    route('/scanner', 'routes/scanner.tsx'),
    route('/checks', 'routes/checks.tsx'),
    route('/store', 'routes/store.tsx'),
    route('/wallet', 'routes/wallet.tsx'),
    route("/wallet/account/:id", "routes/wallet.account.$id.tsx"),
  ]),
] satisfies RouteConfig;


