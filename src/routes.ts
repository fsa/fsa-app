import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import * as PAGE from './config/pages';

export default [
  route(PAGE.LOGIN, 'routes/login.tsx'),
  layout("layout/AppLayout.tsx", [
    index("routes/_index.tsx"),
    route(PAGE.MOVIES, 'routes/movie.tsx'),
    route(PAGE.PASSWORD, 'routes/password.tsx'),
    route(PAGE.QR_SCANNER, 'routes/scanner.tsx'),
    route(PAGE.CHECKS, 'routes/checks.tsx'),
    route(PAGE.STORE, 'routes/store.tsx'),
    route(PAGE.WALLET_ACCOUNTS, 'routes/wallet.tsx'),
    route(PAGE.WALLET_ACCOUNT, "routes/wallet.account.$id.tsx"),
  ]),
] satisfies RouteConfig;
