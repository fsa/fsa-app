import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route('/login', 'pages/login.tsx'),
  route("/", "components/AppLayout.tsx", [
    index("pages/home.tsx"),
    route('/scanner', 'pages/scanner.tsx'),
    route('/movie', 'pages/movie.tsx'),
    route('/checks', 'pages/checks.tsx'),
    route('/store', 'pages/store.tsx'),
    route('/wallet', 'pages/wallet.tsx'),
    route("/wallet/account/:id", "pages/wallet-account.tsx"),
  ]),
] satisfies RouteConfig;
