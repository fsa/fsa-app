import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route('/login', 'routes/login.tsx'),
  route("/", "components/AppLayout.tsx", [
    index("routes/home.tsx"),
    route('/scanner', 'routes/scanner.tsx'),
    route('/movie', 'routes/movie.tsx'),
    route('/store', 'routes/store.tsx'),
    route('/wallet', 'routes/wallet.tsx'),
    route("/wallet/account/:id", "routes/wallet-account.tsx"),
  ]),
] satisfies RouteConfig;
