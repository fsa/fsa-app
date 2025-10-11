import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route('/login', 'pages/LoginPage.tsx'),
  route("/", "components/AppLayout.tsx", [
    index("pages/HomePage.tsx"),
    route('/scanner', 'pages/ScannerPage.tsx'),
    route('/movie', 'pages/MoviePage.tsx'),
    route('/checks', 'pages/ChecksPage.tsx'),
    route('/store', 'pages/StorePage.tsx'),
    route('/wallet', 'pages/WalletPage.tsx'),
    route("/wallet/account/:id", "pages/WalletAccountPage.tsx"),
  ]),
] satisfies RouteConfig;
