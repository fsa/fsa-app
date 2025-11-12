import HomeIcon from "@mui/icons-material/Home";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WalletIcon from '@mui/icons-material/Wallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PasswordIcon from '@mui/icons-material/Password';
import BlockIcon from '@mui/icons-material/Block';
import * as PAGE from './pages';

export type MenuEntry =
  | {
    type: "item";
    title: string;
    path: string;
    icon: React.ReactNode;
    roles?: string[];
  }
  | { type: "divider"; roles?: string[] }
  | { type: "section"; title: string; roles?: string[] };

export const configMainMenu: MenuEntry[] = [
  { type: "item", title: "Главная", path: PAGE.HOME, icon: <HomeIcon /> },
  { type: "item", title: "Сканер", path: PAGE.QR_SCANNER, icon: <QrCode2Icon /> },
  { type: "item", title: "Сериалы", path: PAGE.MOVIES, icon: <LocalMoviesIcon /> },
  { type: "item", title: "Пароли", path: PAGE.PASSWORD, icon: <PasswordIcon /> },
  { type: "item", title: "Чеки", path: PAGE.CHECKS, icon: <ReceiptIcon /> },
  { type: "item", title: "Товары", path: PAGE.STORE, icon: <ShoppingCartIcon /> },
  { type: "item", title: "Кошелёк", path: PAGE.WALLET_ACCOUNTS, icon: <WalletIcon /> },
  { type: "item", title: "Блокировки", path: PAGE.RESOLVER, icon: <BlockIcon /> },
];
