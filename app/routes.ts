import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route('/login', 'routes/login.tsx'),
  route("/", "components/app-layout.tsx", [
    index("routes/home.tsx"),
    route('/scanner', 'routes/scanner.tsx'),
    route('/scanner2', 'routes/scanner2.tsx'),
    route('/movie', 'routes/movie.tsx'),
    route('/goods', 'routes/goods.tsx'),
    route('/wallet', 'routes/wallet.tsx'),
    route("/wallet/account/:id", "routes/wallet-account.tsx"),
  ]),
] satisfies RouteConfig;
